import { db, pool } from '../server/db';
import { seed } from '../server/seed';
import { sql } from 'drizzle-orm';

async function resetDatabase() {
  console.log('🧹 Resetting database...');
  
  try {
    // Xóa dữ liệu từ tất cả các bảng theo thứ tự đúng để tránh vi phạm ràng buộc khóa ngoại
    console.log('Deleting all data...');
    
    // Thực hiện câu lệnh DELETE theo thứ tự đúng để tránh vi phạm ràng buộc khóa ngoại
    await db.execute(sql`DELETE FROM "cart_items"`);
    await db.execute(sql`DELETE FROM "subscribers"`);
    await db.execute(sql`DELETE FROM "products"`);
    await db.execute(sql`DELETE FROM "testimonials"`);
    await db.execute(sql`DELETE FROM "categories"`);
    await db.execute(sql`DELETE FROM "artisans"`);
    await db.execute(sql`DELETE FROM "users"`);
    
    // Đặt lại các chuỗi tuần tự
    await db.execute(sql`ALTER SEQUENCE categories_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE products_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE artisans_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE testimonials_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE cart_items_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE subscribers_id_seq RESTART WITH 1`);
    await db.execute(sql`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
    
    console.log('✅ All data deleted successfully!');
    
    // Chạy lại tệp seed để tạo dữ liệu mới
    console.log('Reseeding database...');
    const success = await seed();
    
    if (success) {
      console.log('✅ Database reset and reseeded successfully!');
    } else {
      console.error('❌ Failed to reseed database.');
    }
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  } finally {
    // Đóng kết nối cơ sở dữ liệu
    if (pool) {
      await pool.end();
    }
    process.exit(0);
  }
}

resetDatabase();