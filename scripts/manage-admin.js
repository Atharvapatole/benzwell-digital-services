const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from .env.local
const env = {};
if (fs.existsSync('.env.local')) {
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let value = (match[2] || '').trim();
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      env[match[1]] = value.trim();
    }
  });
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

const ADMIN_EMAIL = 'admin@benzwell.in';

async function main() {
  const command = process.argv[2] || 'status';
  const argPassword = process.argv[3];

  console.log(`=== BenzWell Secure Admin Provisioning Tool ===`);
  console.log(`Target Supabase URL: ${supabaseUrl}`);
  console.log(`Administrator Email: ${ADMIN_EMAIL}`);
  console.log(`Command: ${command}\n`);

  // Find if user already exists
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  if (listError) {
    console.error('Failed to list users from Supabase Auth:', listError.message);
    process.exit(1);
  }

  const existingUser = usersData.users.find(u => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  if (command === 'status') {
    if (existingUser) {
      console.log('STATUS: Administrator account EXISTS.');
      console.log(`- User ID: ${existingUser.id}`);
      console.log(`- Email Confirmed: ${existingUser.email_confirmed_at ? 'YES (' + existingUser.email_confirmed_at + ')' : 'NO'}`);
      console.log(`- Role: ${existingUser.role}`);
      console.log(`- App Metadata:`, existingUser.app_metadata);
      console.log(`- User Metadata:`, existingUser.user_metadata);
    } else {
      console.log('STATUS: Administrator account DOES NOT EXIST yet in Supabase Auth.');
      console.log(`To create the account with a password, run:`);
      console.log(`  node scripts/manage-admin.js create <your-password>`);
      console.log(`Or to create the account and generate a secure password setup link, run:`);
      console.log(`  node scripts/manage-admin.js create`);
    }
    return;
  }

  if (command === 'create') {
    if (existingUser) {
      console.log(`NOTICE: Account for ${ADMIN_EMAIL} already exists (ID: ${existingUser.id}).`);
      if (argPassword) {
        console.log(`Updating password for existing account...`);
        const { error: updateErr } = await supabase.auth.admin.updateUserById(existingUser.id, {
          password: argPassword,
          email_confirm: true,
          app_metadata: { role: 'admin' },
          user_metadata: { role: 'admin' },
        });
        if (updateErr) {
          console.error('Failed to update password:', updateErr.message);
          process.exit(1);
        }
        console.log('SUCCESS: Password updated and email confirmed successfully!');
      } else {
        console.log(`Generating secure password recovery link for existing account...`);
        const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
          type: 'recovery',
          email: ADMIN_EMAIL,
        });
        if (linkErr) {
          console.error('Failed to generate recovery link:', linkErr.message);
          process.exit(1);
        }
        console.log('SUCCESS: Secure password link generated:');
        console.log(linkData.properties?.action_link);
      }
      return;
    }

    // Create user
    const initialPassword = argPassword || 'BenzWellAdmin@2026';
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: initialPassword,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin' },
    });

    if (createError) {
      console.error('Failed to create administrator account:', createError.message);
      process.exit(1);
    }

    console.log(`SUCCESS: Administrator account created successfully!`);
    console.log(`- User ID: ${createData.user.id}`);
    console.log(`- Email: ${createData.user.email}`);
    console.log(`- Email Confirmed: YES`);
    console.log(`- Role: admin`);

    if (argPassword) {
      console.log(`\nYou can now sign in immediately at http://localhost:3000/admin/login using your provided password.`);
    } else {
      console.log(`\nDefault initial password set: BenzWellAdmin@2026`);
      console.log(`(You can change it anytime using: node scripts/manage-admin.js set-password <new-password>)`);
      
      // Also generate recovery link
      const { data: linkData } = await supabase.auth.admin.generateLink({
        type: 'recovery',
        email: ADMIN_EMAIL,
      });
      if (linkData?.properties?.action_link) {
        console.log(`\nAlternatively, use this direct secure link to set your private custom password:`);
        console.log(linkData.properties.action_link);
      }
    }
    return;
  }

  if (command === 'set-password') {
    if (!argPassword) {
      console.error('ERROR: Please provide the new password: node scripts/manage-admin.js set-password <new-password>');
      process.exit(1);
    }

    if (!existingUser) {
      console.log(`Account ${ADMIN_EMAIL} does not exist. Creating it now with the provided password...`);
      const { data: createData, error: createError } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: argPassword,
        email_confirm: true,
        app_metadata: { role: 'admin' },
        user_metadata: { role: 'admin' },
      });
      if (createError) {
        console.error('Failed to create account:', createError.message);
        process.exit(1);
      }
      console.log('SUCCESS: Administrator account created and password set successfully!');
      return;
    }

    const { error: updateErr } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: argPassword,
      email_confirm: true,
      app_metadata: { role: 'admin' },
      user_metadata: { role: 'admin' },
    });

    if (updateErr) {
      console.error('Failed to update password:', updateErr.message);
      process.exit(1);
    }

    console.log('SUCCESS: Password updated successfully and account confirmed as administrator!');
    return;
  }

  if (command === 'reset-link') {
    if (!existingUser) {
      console.error(`ERROR: User ${ADMIN_EMAIL} does not exist. Run 'node scripts/manage-admin.js create' first.`);
      process.exit(1);
    }

    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: ADMIN_EMAIL,
    });
    if (linkErr) {
      console.error('Failed to generate recovery link:', linkErr.message);
      process.exit(1);
    }
    console.log('SUCCESS: Secure password reset link generated:');
    console.log(linkData.properties?.action_link);
    return;
  }

  console.log(`Unknown command: ${command}`);
  console.log(`Available commands: status, create, set-password, reset-link`);
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
