import { db } from "./db";
import {
  categories,
  products,
  artisans,
  testimonials,
  type InsertCategory,
  type InsertProduct,
  type InsertArtisan,
  type InsertTestimonial,
} from "@shared/schema";

async function seed(): Promise<boolean> {
  console.log("🌱 Seeding database...");

  try {
    // Kiểm tra xem đã có dữ liệu trong bảng categories chưa
    const existingCategories = await db
      .select({ count: count() })
      .from(categories);
    if (existingCategories[0].count > 0) {
      console.log("⏭️ Database already has data, skipping seed");
      return true;
    }

    // Seed categories
    const categoryIds = await seedCategories();

    // Seed artisans
    const artisanIds = await seedArtisans();

    // Seed products
    await seedProducts(categoryIds, artisanIds);

    // Seed testimonials
    await seedTestimonials();

    console.log("✅ Seeding complete!");
    return true;
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    return false;
  }
}

async function seedCategories(): Promise<number[]> {
  console.log("Seeding categories...");

  const categoriesData: InsertCategory[] = [
    {
      name: "Gốm sứ",
      slug: "gom-su",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
      productCount: 0,
    },
    {
      name: "Mây tre đan",
      slug: "may-tre-dan",
      image: "https://images.unsplash.com/photo-1605015208469-d7e4522bee5d",
      productCount: 0,
    },
    {
      name: "Lụa tơ tằm",
      slug: "lua-to-tam",
      image: "https://images.unsplash.com/photo-1604847078379-ea7a2e3fface",
      productCount: 0,
    },
    {
      name: "Đồ gỗ mỹ nghệ",
      slug: "do-go-my-nghe",
      image: "https://images.unsplash.com/photo-1533276441486-4e77d234e21f",
      productCount: 0,
    },
    {
      name: "Thêu ren",
      slug: "theu-ren",
      image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176",
      productCount: 0,
    },
  ];

  const insertedCategories = await db
    .insert(categories)
    .values(categoriesData)
    .returning({ id: categories.id });
  return insertedCategories.map((cat) => cat.id);
}

async function seedArtisans(): Promise<number[]> {
  console.log("Seeding artisans...");

  const artisansData: InsertArtisan[] = [
    {
      name: "Nguyễn Văn Tuấn",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      village: "Làng gốm Bát Tràng",
      description:
        "Nghệ nhân với hơn 30 năm kinh nghiệm trong nghề gốm, chuyên về kỹ thuật vẽ men ngọc cổ truyền.",
    },
    {
      name: "Trần Thị Mai",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
      village: "Làng lụa Vạn Phúc",
      description:
        "Nghệ nhân ưu tú chuyên về nghề dệt lụa và thêu thủ công, đã có nhiều tác phẩm được trưng bày tại các bảo tàng.",
    },
    {
      name: "Lê Văn Hùng",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115",
      village: "Làng mây tre đan Phú Vinh",
      description:
        "Nghệ nhân gắn bó với nghề đan lát truyền thống hơn 40 năm, sáng tạo nhiều mẫu sản phẩm độc đáo và hiện đại.",
    },
  ];

  const insertedArtisans = await db
    .insert(artisans)
    .values(artisansData)
    .returning({ id: artisans.id });
  return insertedArtisans.map((artisan) => artisan.id);
}

async function seedProducts(categoryIds: number[], artisanIds: number[]) {
  console.log("Seeding products...");

  const productsData: InsertProduct[] = [
    {
      name: "Bình gốm trang trí hoa văn xanh ngọc",
      slug: "binh-gom-trang-tri-hoa-van-xanh-ngoc",
      description:
        "Bình gốm trang trí với họa tiết hoa văn truyền thống màu xanh ngọc, được làm thủ công bởi nghệ nhân làng gốm Bát Tràng.",
      price: 580000,
      salePrice: 680000,
      image:
        "https://bizweb.dktcdn.net/100/275/164/products/binh-gom-dep-landecor.jpg?v=1576905412587",
      images: [
        "https://bizweb.dktcdn.net/100/275/164/products/binh-gom-dep-landecor.jpg?v=1576905412587",
        "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
      ],
      categoryId: categoryIds[0],
      artisanId: artisanIds[0],
      rating: 4.5,
      reviewCount: 42,
      inStock: true,
      isNew: true,
      isFeatured: true,
      isBestseller: false,
      village: "Làng gốm Bát Tràng",
    },
    {
      name: "Giỏ mây đan thủ công đựng hoa quả",
      slug: "gio-may-dan-thu-cong-dung-hoa-qua",
      description:
        "Giỏ mây đan thủ công từ những sợi mây tự nhiên, phù hợp để đựng hoa quả hoặc làm vật trang trí trong nhà.",
      price: 245000,
      salePrice: null,
      image: "https://images.unsplash.com/photo-1573883430697-4c3479aae6b9",
      images: [
        "https://images.unsplash.com/photo-1573883430697-4c3479aae6b9",
        "https://tradaophuongdong.com/wp-content/uploads/2022/05/283878617_7414250081980293_9214539554017787410_n.jpg",
      ],
      categoryId: categoryIds[1],
      artisanId: artisanIds[2],
      rating: 5,
      reviewCount: 18,
      inStock: true,
      isNew: false,
      isFeatured: true,
      isBestseller: false,
      village: "Làng nghề mây tre Phú Vinh",
    },
    {
      name: "Khăn lụa thêu tay hoa sen",
      slug: "khan-lua-theu-tay-hoa-sen",
      description:
        "Khăn lụa tơ tằm nguyên chất với họa tiết hoa sen được thêu tay tỉ mỉ, thể hiện nét đẹp văn hóa Việt Nam.",
      price: 350000,
      salePrice: 420000,
      image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
      images: [
        "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
        "https://bizweb.dktcdn.net/100/320/888/files/vai-lua-to-tam-6.jpg?v=1677826219176",
      ],
      categoryId: categoryIds[2],
      artisanId: artisanIds[1],
      rating: 4,
      reviewCount: 36,
      inStock: true,
      isNew: false,
      isFeatured: true,
      isBestseller: true,
      village: "Làng lụa Vạn Phúc",
    },
    {
      name: "Tượng gỗ trang trí hình cá chép",
      slug: "tuong-go-trang-tri-hinh-ca-chep",
      description:
        "Tượng gỗ hình cá chép được chạm khắc tinh xảo từ gỗ mít, biểu tượng cho sự may mắn và thịnh vượng.",
      price: 1250000,
      salePrice: null,
      image: "https://images.unsplash.com/photo-1603006939079-5de87a28f6d6",
      images: [
        "https://images.unsplash.com/photo-1603006939079-5de87a28f6d6",
        "https://gomynghe.vn/sites/default/files/styles/style_750x558/public/field/image/do-go-my-nghe-trang-tri-phong-khach.jpg?itok=s7zaAHRE",
      ],
      categoryId: categoryIds[3],
      artisanId: null,
      rating: 3.5,
      reviewCount: 23,
      inStock: true,
      isNew: false,
      isFeatured: true,
      isBestseller: false,
      village: "Làng nghề gỗ Đồng Kỵ",
    },
  ];

  await db.insert(products).values(productsData);

  // Update product count in categories
  for (const categoryId of categoryIds) {
    const productsCount = await db
      .select({ count: count() })
      .from(products)
      .where(eq(products.categoryId, categoryId));
    await db
      .update(categories)
      .set({ productCount: productsCount[0].count })
      .where(eq(categories.id, categoryId));
  }
}

async function seedTestimonials() {
  console.log("Seeding testimonials...");

  const testimonialsData: InsertTestimonial[] = [
    {
      name: "Nguyễn Thị Hương",
      location: "Hà Nội",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      rating: 5,
      comment:
        "Tôi rất ấn tượng với chất lượng sản phẩm từ Làng Nghề Việt. Chiếc bình gốm mà tôi mua không chỉ đẹp mà còn mang đậm nét văn hóa truyền thống. Dịch vụ giao hàng nhanh chóng và chu đáo. Chắc chắn tôi sẽ tiếp tục ủng hộ!",
    },
    {
      name: "Trần Minh Đức",
      location: "TP. Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      rating: 4,
      comment:
        "Đây là lần đầu tiên tôi mua hàng thủ công qua mạng và tôi thực sự hài lòng. Bộ khăn trải bàn thêu tay mà tôi đặt rất tinh xảo và đúng như mô tả. Nhân viên tư vấn rất tận tình và có kiến thức sâu về sản phẩm.",
    },
    {
      name: "Phạm Thanh Hà",
      location: "Đà Nẵng",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      rating: 5,
      comment:
        "Sản phẩm mây tre đan rất chắc chắn và đẹp mắt. Tôi đã mua nhiều lần và luôn hài lòng với chất lượng. Rất vui vì có thể hỗ trợ các làng nghề truyền thống của Việt Nam.",
    },
  ];

  await db.insert(testimonials).values(testimonialsData);
}

// Thêm hàm count() và eq()
import { count, eq } from "drizzle-orm";

// Export seed function
export { seed };

// Automatically run seed when this file is executed directly
seed()
  .then(() => {
    console.log("Seeding complete, exiting...");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
