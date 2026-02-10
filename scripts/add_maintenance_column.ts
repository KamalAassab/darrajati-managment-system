
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

    console.log('Adding maintenance_count column to scooters...');
    try {
        await sql`
            ALTER TABLE scooters 
            ADD COLUMN IF NOT EXISTS maintenance_count INTEGER DEFAULT 0;
        `;
        console.log('Successfully added maintenance_count column.');
    } catch (error) {
        console.error('Error adding column:', error);
    }
    process.exit(0);
}

main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
