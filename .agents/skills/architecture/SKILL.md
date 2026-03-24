# Backend Architecture Skill

This skill defines architecture guidance for backend apps (e.g., `apps/backend`).

## Pattern: NestJS Architecture
Use standard NestJS layered structure:
- Modules: group related capabilities and providers.
- Controllers: expose transport/API endpoints and request/response handling.
- Services: contain business logic and orchestration.
- Providers: shared injectable dependencies (adapters, helpers, repositories).

How to use it:
- Keep controllers thin and delegate logic to services.
- Use dependency injection between controllers/services/providers.
- Organize by feature module as the codebase grows.
- Keep transport details (HTTP DTO mapping) at controller boundaries.