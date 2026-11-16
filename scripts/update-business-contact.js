const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = {};
fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = (match[2] || '').trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log('--- Updating Business Contact Information in Supabase ---');
  const newBusinessInfo = {
    brand_name: 'BenzWell',
    tagline: 'Professional Websites. Powerful Digital Experiences.',
    support_email: 'info@benzwell.in',
    whatsapp_number: '+91 9923407176',
    calling_number: '+91 9923407176',
    address: 'Digital Solutions & Web Development, India',
    production_url: 'https://digital.benzwell.in'
  };

  const { error } = await supabase
    .from('website_settings')
    .update({
      value: newBusinessInfo,
      updated_at: new Date().toISOString()
    })
    .eq('key', 'business_info');

  if (error) {
    console.error('Error updating business_info:', error);
  } else {
    console.log('Successfully updated business_info in Supabase database!');
  }

  // Verify
  const { data } = await supabase.from('website_settings').select('*');
  console.log('Current website_settings in database:');
  console.log(JSON.stringify(data, null, 2));
}

run();
