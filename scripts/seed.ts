// Import seed function
import { seed } from "../server/seed";

// Run seeding function and exit
seed().then(() => {
  console.log("✅ Seeding completed successfully");
  process.exit(0);
}).catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});