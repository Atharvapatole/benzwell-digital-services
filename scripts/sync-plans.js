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

async function syncPlans() {
  console.log('--- Syncing Plans in Supabase Database to Official Names ---');

  // 1. Basic Plan
  const { error: e1 } = await supabase
    .from('plans')
    .update({ name: 'Basic Plan', updated_at: new Date().toISOString() })
    .eq('slug', 'basic');
  if (e1) console.error('Error updating basic:', e1);
  else console.log('Updated basic -> Basic Plan');

  // 2. Standard Plan
  const { error: e2 } = await supabase
    .from('plans')
    .update({ name: 'Standard Plan', updated_at: new Date().toISOString() })
    .eq('slug', 'medium');
  if (e2) console.error('Error updating medium:', e2);
  else console.log('Updated medium -> Standard Plan');

  // 3. Premium Plan
  // Update higher row if exists
  const { data: higherRow } = await supabase.from('plans').select('*').eq('slug', 'higher').maybeSingle();
  const { data: fullStackRow } = await supabase.from('plans').select('*').eq('slug', 'full-stack').maybeSingle();

  if (higherRow) {
    await supabase
      .from('plans')
      .update({ name: 'Premium Plan', updated_at: new Date().toISOString() })
      .eq('slug', 'higher');
    console.log('Updated higher -> Premium Plan');
  } else if (fullStackRow) {
    const newHigher = {
      ...fullStackRow,
      slug: 'higher',
      name: 'Premium Plan',
      sort_order: 3,
      updated_at: new Date().toISOString()
    };
    await supabase.from('plans').insert([newHigher]);
    await supabase.from('plans').delete().eq('slug', 'full-stack');
    console.log('Migrated full-stack to higher -> Premium Plan');
  }

  // Also clean up any lingering full-stack row if higher exists
  if (higherRow && fullStackRow) {
    await supabase.from('plans').delete().eq('slug', 'full-stack');
  }

  // Verify
  const { data: finalPlans } = await supabase.from('plans').select('slug, name, price').order('sort_order', { ascending: true });
  console.log('--- Verified Plans in Database ---');
  console.log(finalPlans);
}

syncPlans();
