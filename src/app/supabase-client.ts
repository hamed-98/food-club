import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pgvkczkqghqazvshcdeg.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndmtjemtxZ2hxYXp2c2hjZGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTI3MjEsImV4cCI6MjA0OTc4ODcyMX0.CvS-ze5M-c7ky2FOttkQoN_jjYKAJIkXaPqJR0Qtc2U';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBndmtjemtxZ2hxYXp2c2hjZGVnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDIxMjcyMSwiZXhwIjoyMDQ5Nzg4NzIxfQ.jb4ajRtnwStvHWeqnJWv5gbiwkgxDNFS7rPW_PLNPC0'


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
