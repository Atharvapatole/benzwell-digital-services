const fs = require('fs');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

// 1. Read .env.local
const env = {};
if (fs.existsSync('.env.local')) {
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = (match[2] || '').trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[match[1]] = val.trim();
    }
  });
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env.local');
  process.exit(1);
}

const adminClient = createClient(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const targetEmail = 'admin@benzwell.in';
let desiredPassword = process.argv[2];

if (!desiredPassword) {
  // Generate a random secure password if none specified
  desiredPassword = 'BenzWellAdmin@' + crypto.randomInt(1000, 9999);
  console.log(`No password provided as argument. Generated secure temporary password: ${desiredPassword}`);
}

async function main() {
  console.log(`--- Updating Admin Password for ${targetEmail} in Supabase ---`);
  
  // 1. Check if user exists
  const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers();
  if (listError) {
    console.error('Error listing users:', listError.message);
    process.exit(1);
  }

  const existingUser = usersData.users.find(u => u.email.toLowerCase() === targetEmail);

  let userId;
  if (existingUser) {
    userId = existingUser.id;
    console.log(`Found existing user with ID: ${userId}`);
    
    // Update password, confirm email, and set admin roles
    const { data: updateData, error: updateError } = await adminClient.auth.admin.updateUserById(userId, {
      password: desiredPassword,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin', email_verified: true },
    });

    if (updateError) {
      console.error('Error updating user password:', updateError.message);
      process.exit(1);
    }
    console.log('Password successfully updated via Supabase Admin API!');
  } else {
    console.log(`User ${targetEmail} does not exist. Creating new administrator user...`);
    const { data: createData, error: createError } = await adminClient.auth.admin.createUser({
      email: targetEmail,
      password: desiredPassword,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin', email_verified: true },
    });

    if (createError) {
      console.error('Error creating user:', createError.message);
      process.exit(1);
    }
    userId = createData.user.id;
    console.log(`User created successfully with ID: ${userId}`);
  }

  // 2. Perform live authentication test using anon key (exactly as frontend does)
  console.log('Testing authentication with public Supabase client...');
  const publicClient = createClient(supabaseUrl, anonKey);
  const { data: authData, error: authError } = await publicClient.auth.signInWithPassword({
    email: targetEmail,
    password: desiredPassword,
  });

  if (authError) {
    console.error('Authentication test failed:', authError.message);
    process.exit(1);
  }

  console.log('--- AUTHENTICATION TEST PASSED! ---');
  console.log(`Admin user: ${authData.user.email}`);
  console.log(`Session established: ${authData.session ? 'YES' : 'NO'}`);
  console.log('You can now log in to /admin/login immediately with this password.');
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
