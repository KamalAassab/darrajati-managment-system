
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env.local manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

async function main() {
    const { sql } = await import('../lib/db/index');

    console.log('Removing has_deposit and deposit_amount columns from clients...');
    try {
        await sql`
            ALTER TABLE clients 
            DROP COLUMN IF EXISTS has_deposit,
            DROP COLUMN IF EXISTS deposit_amount;
        `;
        console.log('Successfully removed deposit columns.');
    } catch (error) {
        console.error('Error removing columns:', error);
    }
    process.exit(0);
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
