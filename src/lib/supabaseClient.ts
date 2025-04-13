import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofonfjkujpimfqoqkpnm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mb25mamt1anBpbWZxb3FrcG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzUzMjEsImV4cCI6MjA2MDE1MTMyMX0.f40M8GcmPhBaqJFlVyhrK1gdI5rRv3xa9SCfCAaHOF4';

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
