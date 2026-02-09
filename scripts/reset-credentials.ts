// Run this script with: npx tsx scripts/reset-credentials.ts
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_MBQg1nkz0NHY@ep-cold-tree-ahuytrjb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function resetCredentials() {
    const sql = neon(DATABASE_URL);

    // New credentials
    const newUsername = 'admin';
    const newPassword = 'admin1234';

    console.log('=== RESETTING ADMIN CREDENTIALS ===\n');
    console.log('New username:', newUsername);
    console.log('New password:', newPassword);

    try {
        // Hash the password with bcrypt
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        console.log('\nGenerated hash:', passwordHash);

        // Verify hash works before saving
        const verifyBefore = await bcrypt.compare(newPassword, passwordHash);
        console.log('Hash verification before save:', verifyBefore ? 'PASSED' : 'FAILED');

        if (!verifyBefore) {
            console.error('ERROR: Hash verification failed! Aborting.');
            return;
        }

        // Check current users
        const users = await sql`SELECT id, username FROM admin_users`;
        console.log('\nCurrent users:', users);

        if (users.length === 0) {
            // No users exist, create one
            await sql`
                INSERT INTO admin_users (username, password_hash)
                VALUES (${newUsername}, ${passwordHash})
            `;
            console.log('Created new admin user');
        } else {
            // Update the first user
            const userId = users[0].id;
            await sql`
                UPDATE admin_users 
                SET username = ${newUsername}, password_hash = ${passwordHash}
                WHERE id = ${userId}
            `;
            console.log('Updated user ID:', userId);
        }

        // Verify the update worked
        const updatedUsers = await sql`SELECT id, username, password_hash FROM admin_users WHERE username = ${newUsername}`;
        if (updatedUsers.length > 0) {
            const storedHash = updatedUsers[0].password_hash as string;
            const verifyAfter = await bcrypt.compare(newPassword, storedHash);
            console.log('\nVerification after save:', verifyAfter ? 'PASSED' : 'FAILED');

            if (verifyAfter) {
                console.log('\n✓ Credentials reset successfully!');
                console.log('You can now login with:');
                console.log('  Username: admin');
                console.log('  Password: admin1234');
            } else {
                console.error('\n✗ ERROR: Verification failed after save!');
            }
        }
    } catch (error) {
        console.error('Error resetting credentials:', error);
    }
}

resetCredentials();
