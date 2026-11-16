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
  console.log('--- Syncing Plans in Supabase Database ---');

  // 1. Update basic
  const { error: e1 } = await supabase
    .from('plans')
    .update({ name: 'Basic Plan', updated_at: new Date().toISOString() })
    .eq('slug', 'basic');
  if (e1) console.error('Error updating basic:', e1);
  else console.log('Updated basic -> Basic Plan');

  // 2. Update medium
  const { error: e2 } = await supabase
    .from('plans')
    .update({ name: 'Medium Website Plan', updated_at: new Date().toISOString() })
    .eq('slug', 'medium');
  if (e2) console.error('Error updating medium:', e2);
  else console.log('Updated medium -> Medium Website Plan');

  // 3. Handle higher / full-stack
  // Check if 'higher' exists
  const { data: higherRow } = await supabase.from('plans').select('*').eq('slug', 'higher').maybeSingle();
  const { data: fullStackRow } = await supabase.from('plans').select('*').eq('slug', 'full-stack').maybeSingle();

  if (fullStackRow && !higherRow) {
    // Insert 'higher' copying fullStackRow
    const newHigher = {
      ...fullStackRow,
      slug: 'higher',
      name: 'Higher Website Plan',
      sort_order: 3,
      updated_at: new Date().toISOString()
    };
    const { error: insErr } = await supabase.from('plans').insert([newHigher]);
    if (insErr) console.error('Error creating higher plan:', insErr);
    else {
      console.log('Created higher -> Higher Website Plan');
      // Delete old full-stack row
      await supabase.from('plans').delete().eq('slug', 'full-stack');
    }
  } else if (higherRow) {
    await supabase
      .from('plans')
      .update({ name: 'Higher Website Plan', updated_at: new Date().toISOString() })
      .eq('slug', 'higher');
    console.log('Updated higher -> Higher Website Plan');
    if (fullStackRow) {
      await supabase.from('plans').delete().eq('slug', 'full-stack');
    }
  }

  // Verify
  const { data: finalPlans } = await supabase.from('plans').select('slug, name, price').order('sort_order', { ascending: true });
  console.log('--- Verified Plans in Database ---');
  console.log(finalPlans);
}

syncPlans();
