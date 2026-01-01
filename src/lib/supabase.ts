import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://tydhnkbhpsvdzvmylwec.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNiOTQ1NzEzLWEwYmQtNGZiNy1iYWJhLWJhNjkxNmQzMTNiMiJ9.eyJwcm9qZWN0SWQiOiJ0eWRobmtiaHBzdmR6dm15bHdlYyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY3Mjk5MDk5LCJleHAiOjIwODI2NTkwOTksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.9H67r_Yz-b-xtFGpbLwRasaJvIEUtu3ITxTLbR8IYe0';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };