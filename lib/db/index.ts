import { neon, NeonQueryFunction } from '@neondatabase/serverless';

/**
 * Neon Serverless Database Module
 * 
 * The neon() function returns a tagged template function.
 * For parameterized queries with $1, $2 placeholders, use sql.query()
 */

// Initialize the Neon SQL client
const sql = neon(process.env.DATABASE_URL!);

/**
 * Execute a parameterized SQL query
 * 
 * @param text - SQL query string with $1, $2, etc. placeholders
 * @param params - Array of parameter values
 * @returns Object with rows array
 * 
 * @example
 * const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
 * console.log(result.rows);
 */
export async function query<T = Record<string, unknown>>(
    text: string,
    params?: any[]
): Promise<{ rows: T[] }> {
    try {
        // Use the query method for parameterized queries
        // Note: Neon's sql.query can return an array of rows directly or a result object
        const response = await (sql as any).query(text, params);

        const rows = Array.isArray(response) ? response : (response?.rows || []);

        return { rows: rows as T[] };
    } catch (error: any) {
        console.error('Database query error:', error);
        throw error;
    }
}

/**
 * Export the sql tagged template function for simple queries
 * 
 * @example
 * // Simple query without parameters
 * const users = await sql`SELECT * FROM users`;
 * 
 * // Query with embedded values (safely escaped)
 * const userId = 1;
 * const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
 */
export { sql };
