import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Kiểm tra xem biến môi trường DATABASE_URL có tồn tại hay không
const isDatabaseConfigured = !!process.env.DATABASE_URL;

// Chỉ tạo pool và DB connection nếu DATABASE_URL tồn tại
export let pool: Pool | null = null;
export let db: any = null;

if (isDatabaseConfigured) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle({ client: pool, schema });
}

// Export biến để các module khác biết trạng thái kết nối
export const hasDatabaseConnection = isDatabaseConfigured;
