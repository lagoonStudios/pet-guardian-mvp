import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { config } from "@/src/lib/config";

import { type Database } from './database.types';

const supabaseUrl = config.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = config.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
