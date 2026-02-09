// Debug script to check database state
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_MBQg1nkz0NHY@ep-cold-tree-ahuytrjb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function debugAuth() {
    const sql = neon(DATABASE_URL);

    console.log('=== DATABASE STATE CHECK ===\n');

    // 1. Check table structure
    console.log('1. Checking admin_users table structure...');
    try {
        const schema = await sql`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'admin_users'
            ORDER BY ordinal_position
        `;
        console.log('Table columns:', schema);
    } catch (e) {
        console.error('Schema check error:', e);
    }

    // 2. Check all users
    console.log('\n2. Current users in database:');
    try {
        const users = await sql`SELECT id, username, password_hash FROM admin_users`;
        for (const user of users) {
            console.log(`  ID: ${user.id}`);
            console.log(`  Username: ${user.username}`);
            console.log(`  Password Hash: ${user.password_hash}`);
            console.log(`  Hash length: ${(user.password_hash as string).length}`);
            console.log('');
        }
    } catch (e) {
        console.error('Users check error:', e);
    }

    // 3. Test password verification
    console.log('\n3. Testing password verification:');
    const testPassword = 'admin1234';
    try {
        const users = await sql`SELECT password_hash FROM admin_users LIMIT 1`;
        if (users.length > 0) {
            const hash = users[0].password_hash as string;
            console.log(`  Testing password "${testPassword}" against stored hash...`);
            const isValid = await bcrypt.compare(testPassword, hash);
            console.log(`  Result: ${isValid ? 'VALID ✓' : 'INVALID ✗'}`);

            // Also test if hash is properly formatted
            console.log(`  Hash starts with $2: ${hash.startsWith('$2') ? 'YES ✓' : 'NO ✗'}`);
        }
    } catch (e) {
        console.error('Password test error:', e);
    }

    // 4. Create a fresh test hash and compare
    console.log('\n4. Generating fresh hash for comparison:');
    try {
        const freshHash = await bcrypt.hash('admin1234', 10);
        console.log(`  Fresh hash: ${freshHash}`);
        console.log(`  Verifying fresh hash: ${await bcrypt.compare('admin1234', freshHash) ? 'VALID ✓' : 'INVALID ✗'}`);
    } catch (e) {
        console.error('Fresh hash error:', e);
    }

    console.log('\n=== END DEBUG ===');
}

debugAuth();
