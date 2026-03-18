create extension if not exists pgcrypto;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  role_name text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.week_days (
  id int4 generated always as identity primary key,
  name text
);

create table if not exists public.appointment_types (
  id uuid primary key default gen_random_uuid(),
  type_name text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clinics (
  id uuid primary key default gen_random_uuid(),
  name text,
  address text,
  phone_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  latitude float8,
  longitude float8,
  avatar_id uuid
);

create table if not exists public.veterinarians (
  id uuid primary key default gen_random_uuid(),
  name text,
  specialty text,
  phone_number text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  avatar_id uuid
);

create table if not exists public.owners (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  phone_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  role_id uuid references public.roles (id) on delete set null,
  avatar_id uuid
);

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  name text,
  species text,
  breed text,
  age int4,
  owner_id uuid references public.owners (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  avatar text,
  avatar_id uuid
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid references public.pets (id) on delete cascade,
  clinic_id uuid references public.clinics (id) on delete set null,
  appointment_date timestamptz,
  reason text,
  appointment_type_id uuid references public.appointment_types (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text,
  doctor_id uuid references public.veterinarians (id) on delete set null
);

create table if not exists public.appointment_updates (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments (id) on delete cascade,
  update_time timestamptz,
  status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.veterinarian_clinic (
  veterinarian_id uuid not null references public.veterinarians (id) on delete cascade,
  clinic_id uuid not null references public.clinics (id) on delete cascade,
  role_id uuid references public.roles (id) on delete set null,
  primary key (veterinarian_id, clinic_id)
);

create table if not exists public.clinic_schedule (
  clinic_id uuid not null references public.clinics (id) on delete cascade,
  week_day_id int4 not null references public.week_days (id) on delete cascade,
  schedule_hour_start time,
  schedule_hour_end time,
  primary key (clinic_id, week_day_id)
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at_roles
before update on public.roles
for each row
execute function public.set_updated_at();

create trigger set_updated_at_appointment_types
before update on public.appointment_types
for each row
execute function public.set_updated_at();

create trigger set_updated_at_clinics
before update on public.clinics
for each row
execute function public.set_updated_at();

create trigger set_updated_at_veterinarians
before update on public.veterinarians
for each row
execute function public.set_updated_at();

create trigger set_updated_at_owners
before update on public.owners
for each row
execute function public.set_updated_at();

create trigger set_updated_at_pets
before update on public.pets
for each row
execute function public.set_updated_at();

create trigger set_updated_at_appointments
before update on public.appointments
for each row
execute function public.set_updated_at();

create trigger set_updated_at_appointment_updates
before update on public.appointment_updates
for each row
execute function public.set_updated_at();

create or replace function public.current_owner_id()
returns uuid
language sql
stable
as $$
  select nullif(auth.jwt() -> 'app_metadata' ->> 'owner_id', '')::uuid;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

create or replace function public.can_access_pet(target_pet_id uuid)
returns boolean
language sql
stable
as $$
  select public.is_admin()
  or exists (
    select 1
    from public.pets p
    where p.id = target_pet_id
      and p.owner_id = public.current_owner_id()
  );
$$;

alter table public.roles enable row level security;
alter table public.week_days enable row level security;
alter table public.appointment_types enable row level security;
alter table public.clinics enable row level security;
alter table public.veterinarians enable row level security;
alter table public.owners enable row level security;
alter table public.pets enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_updates enable row level security;
alter table public.veterinarian_clinic enable row level security;
alter table public.clinic_schedule enable row level security;

grant select, insert, update, delete on table
  public.roles,
  public.week_days,
  public.appointment_types,
  public.clinics,
  public.veterinarians,
  public.owners,
  public.pets,
  public.appointments,
  public.appointment_updates,
  public.veterinarian_clinic,
  public.clinic_schedule
to authenticated;

create policy roles_select_authenticated on public.roles
for select to authenticated using (true);
create policy roles_insert_admin on public.roles
for insert to authenticated with check (public.is_admin());
create policy roles_update_admin on public.roles
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy roles_delete_admin on public.roles
for delete to authenticated using (public.is_admin());

create policy week_days_select_authenticated on public.week_days
for select to authenticated using (true);
create policy week_days_insert_admin on public.week_days
for insert to authenticated with check (public.is_admin());
create policy week_days_update_admin on public.week_days
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy week_days_delete_admin on public.week_days
for delete to authenticated using (public.is_admin());

create policy appointment_types_select_authenticated on public.appointment_types
for select to authenticated using (true);
create policy appointment_types_insert_admin on public.appointment_types
for insert to authenticated with check (public.is_admin());
create policy appointment_types_update_admin on public.appointment_types
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy appointment_types_delete_admin on public.appointment_types
for delete to authenticated using (public.is_admin());

create policy clinics_select_authenticated on public.clinics
for select to authenticated using (true);
create policy clinics_insert_admin on public.clinics
for insert to authenticated with check (public.is_admin());
create policy clinics_update_admin on public.clinics
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy clinics_delete_admin on public.clinics
for delete to authenticated using (public.is_admin());

create policy veterinarians_select_authenticated on public.veterinarians
for select to authenticated using (true);
create policy veterinarians_insert_admin on public.veterinarians
for insert to authenticated with check (public.is_admin());
create policy veterinarians_update_admin on public.veterinarians
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy veterinarians_delete_admin on public.veterinarians
for delete to authenticated using (public.is_admin());

create policy owners_select_own_or_admin on public.owners
for select to authenticated
using (public.is_admin() or id = public.current_owner_id());
create policy owners_insert_admin on public.owners
for insert to authenticated
with check (public.is_admin());
create policy owners_update_own_or_admin on public.owners
for update to authenticated
using (public.is_admin() or id = public.current_owner_id())
with check (public.is_admin() or id = public.current_owner_id());
create policy owners_delete_admin on public.owners
for delete to authenticated
using (public.is_admin());

create policy pets_select_own_or_admin on public.pets
for select to authenticated
using (public.is_admin() or owner_id = public.current_owner_id());
create policy pets_insert_own_or_admin on public.pets
for insert to authenticated
with check (public.is_admin() or owner_id = public.current_owner_id());
create policy pets_update_own_or_admin on public.pets
for update to authenticated
using (public.is_admin() or owner_id = public.current_owner_id())
with check (public.is_admin() or owner_id = public.current_owner_id());
create policy pets_delete_admin on public.pets
for delete to authenticated
using (public.is_admin());

create policy appointments_select_own_or_admin on public.appointments
for select to authenticated
using (public.is_admin() or public.can_access_pet(pet_id));
create policy appointments_insert_own_or_admin on public.appointments
for insert to authenticated
with check (public.is_admin() or public.can_access_pet(pet_id));
create policy appointments_update_own_or_admin on public.appointments
for update to authenticated
using (public.is_admin() or public.can_access_pet(pet_id))
with check (public.is_admin() or public.can_access_pet(pet_id));
create policy appointments_delete_admin on public.appointments
for delete to authenticated
using (public.is_admin());

create policy appointment_updates_select_own_or_admin on public.appointment_updates
for select to authenticated
using (
  public.is_admin() or exists (
    select 1
    from public.appointments a
    where a.id = appointment_id
      and public.can_access_pet(a.pet_id)
  )
);
create policy appointment_updates_insert_own_or_admin on public.appointment_updates
for insert to authenticated
with check (
  public.is_admin() or exists (
    select 1
    from public.appointments a
    where a.id = appointment_id
      and public.can_access_pet(a.pet_id)
  )
);
create policy appointment_updates_update_own_or_admin on public.appointment_updates
for update to authenticated
using (
  public.is_admin() or exists (
    select 1
    from public.appointments a
    where a.id = appointment_id
      and public.can_access_pet(a.pet_id)
  )
)
with check (
  public.is_admin() or exists (
    select 1
    from public.appointments a
    where a.id = appointment_id
      and public.can_access_pet(a.pet_id)
  )
);
create policy appointment_updates_delete_admin on public.appointment_updates
for delete to authenticated
using (public.is_admin());

create policy veterinarian_clinic_select_authenticated on public.veterinarian_clinic
for select to authenticated using (true);
create policy veterinarian_clinic_insert_admin on public.veterinarian_clinic
for insert to authenticated with check (public.is_admin());
create policy veterinarian_clinic_update_admin on public.veterinarian_clinic
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy veterinarian_clinic_delete_admin on public.veterinarian_clinic
for delete to authenticated using (public.is_admin());

create policy clinic_schedule_select_authenticated on public.clinic_schedule
for select to authenticated using (true);
create policy clinic_schedule_insert_admin on public.clinic_schedule
for insert to authenticated with check (public.is_admin());
create policy clinic_schedule_update_admin on public.clinic_schedule
for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy clinic_schedule_delete_admin on public.clinic_schedule
for delete to authenticated using (public.is_admin());

create index if not exists owners_role_id_idx on public.owners (role_id);
create index if not exists pets_owner_id_idx on public.pets (owner_id);
create index if not exists pets_species_idx on public.pets (species);
create index if not exists appointments_pet_id_idx on public.appointments (pet_id);
create index if not exists appointments_clinic_id_idx on public.appointments (clinic_id);
create index if not exists appointments_type_id_idx on public.appointments (appointment_type_id);
create index if not exists appointments_doctor_id_idx on public.appointments (doctor_id);
create index if not exists appointments_date_idx on public.appointments (appointment_date desc);
create index if not exists appointments_status_idx on public.appointments (status);
create index if not exists appointment_updates_appointment_id_idx on public.appointment_updates (appointment_id);
create index if not exists appointment_updates_time_idx on public.appointment_updates (update_time desc);
create index if not exists veterinarian_clinic_role_id_idx on public.veterinarian_clinic (role_id);
create index if not exists clinic_schedule_week_day_id_idx on public.clinic_schedule (week_day_id);