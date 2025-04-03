import {
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  artisans, type Artisan, type InsertArtisan,
  testimonials, type Testimonial, type InsertTestimonial,
  cartItems, type CartItem, type InsertCartItem,
  subscribers, type Subscriber, type InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

// Storage interface with all CRUD methods needed for the app
export interface IStorage {
  // User methods (keeping existing ones)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Artisan methods
  getArtisans(): Promise<Artisan[]>;
  getArtisanById(id: number): Promise<Artisan | undefined>;
  createArtisan(artisan: InsertArtisan): Promise<Artisan>;
  
  // Testimonial methods
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Subscriber methods
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private artisans: Map<number, Artisan>;
  private testimonials: Map<number, Testimonial>;
  private cartItems: Map<number, CartItem>;
  private subscribers: Map<number, Subscriber>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentArtisanId: number;
  private currentTestimonialId: number;
  private currentCartItemId: number;
  private currentSubscriberId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.artisans = new Map();
    this.testimonials = new Map();
    this.cartItems = new Map();
    this.subscribers = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentArtisanId = 1;
    this.currentTestimonialId = 1;
    this.currentCartItemId = 1;
    this.currentSubscriberId = 1;
    
    // Seed data
    this.seedData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    
    // Update product count in category
    const category = this.categories.get(product.categoryId);
    if (category) {
      category.productCount = (category.productCount || 0) + 1;
      this.categories.set(category.id, category);
    }
    
    return product;
  }
  
  // Artisan methods
  async getArtisans(): Promise<Artisan[]> {
    return Array.from(this.artisans.values());
  }
  
  async getArtisanById(id: number): Promise<Artisan | undefined> {
    return this.artisans.get(id);
  }
  
  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    const id = this.currentArtisanId++;
    const artisan: Artisan = { ...insertArtisan, id };
    this.artisans.set(id, artisan);
    return artisan;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }
  
  async getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const cartItems = await this.getCartItems(sessionId);
    return cartItems.map(item => {
      const product = this.products.get(item.productId);
      return {
        ...item,
        product: product!
      };
    });
  }
  
  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if the item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.sessionId === insertCartItem.sessionId && item.productId === insertCartItem.productId,
    );
    
    if (existingItem) {
      existingItem.quantity += insertCartItem.quantity || 1;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    
    const id = this.currentCartItemId++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }
    
    cartItem.quantity = quantity;
    this.cartItems.set(id, cartItem);
    return cartItem;
  }
  
  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }
  
  async clearCart(sessionId: string): Promise<void> {
    const cartItems = await this.getCartItems(sessionId);
    cartItems.forEach(item => {
      this.cartItems.delete(item.id);
    });
  }
  
  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentSubscriberId++;
    const subscriber: Subscriber = { 
      ...insertSubscriber, 
      id,
      createdAt: new Date()
    };
    this.subscribers.set(id, subscriber);
    return subscriber;
  }
  
  // Seed data method
  private seedData() {
    // Seed categories
    const categories: InsertCategory[] = [
      { name: "Gốm sứ", slug: "gom-su", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa", productCount: 0 },
      { name: "Mây tre đan", slug: "may-tre-dan", image: "https://images.unsplash.com/photo-1605015208469-d7e4522bee5d", productCount: 0 },
      { name: "Lụa tơ tằm", slug: "lua-to-tam", image: "https://images.unsplash.com/photo-1604847078379-ea7a2e3fface", productCount: 0 },
      { name: "Đồ gỗ mỹ nghệ", slug: "do-go-my-nghe", image: "https://images.unsplash.com/photo-1533276441486-4e77d234e21f", productCount: 0 },
      { name: "Thêu ren", slug: "theu-ren", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176", productCount: 0 },
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Seed artisans
    const artisans: InsertArtisan[] = [
      { 
        name: "Nguyễn Văn Tuấn", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", 
        village: "Làng gốm Bát Tràng", 
        description: "Nghệ nhân với hơn 30 năm kinh nghiệm trong nghề gốm, chuyên về kỹ thuật vẽ men ngọc cổ truyền." 
      },
      { 
        name: "Trần Thị Mai", 
        image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56", 
        village: "Làng lụa Vạn Phúc", 
        description: "Nghệ nhân ưu tú chuyên về nghề dệt lụa và thêu thủ công, đã có nhiều tác phẩm được trưng bày tại các bảo tàng." 
      },
      { 
        name: "Lê Văn Hùng", 
        image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115", 
        village: "Làng mây tre đan Phú Vinh", 
        description: "Nghệ nhân gắn bó với nghề đan lát truyền thống hơn 40 năm, sáng tạo nhiều mẫu sản phẩm độc đáo và hiện đại." 
      },
    ];
    
    artisans.forEach(artisan => {
      this.createArtisan(artisan);
    });
    
    // Seed products
    const products: InsertProduct[] = [
      {
        name: "Bình gốm trang trí hoa văn xanh ngọc",
        slug: "binh-gom-trang-tri-hoa-van-xanh-ngoc",
        description: "Bình gốm trang trí với họa tiết hoa văn truyền thống màu xanh ngọc, được làm thủ công bởi nghệ nhân làng gốm Bát Tràng.",
        price: 580000,
        salePrice: 680000,
        image: "https://images.unsplash.com/photo-1612196808214-b7e239e5d5e5",
        images: ["https://images.unsplash.com/photo-1612196808214-b7e239e5d5e5", "https://images.unsplash.com/photo-1610701596007-11502861dcfa"],
        categoryId: 1,
        artisanId: 1,
        rating: 4.5,
        reviewCount: 42,
        inStock: true,
        isNew: true,
        isFeatured: true,
        isBestseller: false,
        village: "Làng gốm Bát Tràng"
      },
      {
        name: "Giỏ mây đan thủ công đựng hoa quả",
        slug: "gio-may-dan-thu-cong-dung-hoa-qua",
        description: "Giỏ mây đan thủ công từ những sợi mây tự nhiên, phù hợp để đựng hoa quả hoặc làm vật trang trí trong nhà.",
        price: 245000,
        salePrice: null,
        image: "https://images.unsplash.com/photo-1573883430697-4c3479aae6b9",
        images: ["https://images.unsplash.com/photo-1573883430697-4c3479aae6b9", "https://images.unsplash.com/photo-1605015208469-d7e4522bee5d"],
        categoryId: 2,
        artisanId: 3,
        rating: 5,
        reviewCount: 18,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        village: "Làng nghề mây tre Phú Vinh"
      },
      {
        name: "Khăn lụa thêu tay hoa sen",
        slug: "khan-lua-theu-tay-hoa-sen",
        description: "Khăn lụa tơ tằm nguyên chất với họa tiết hoa sen được thêu tay tỉ mỉ, thể hiện nét đẹp văn hóa Việt Nam.",
        price: 350000,
        salePrice: 420000,
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342",
        images: ["https://images.unsplash.com/photo-1577083552431-6e5fd01aa342", "https://images.unsplash.com/photo-1604847078379-ea7a2e3fface"],
        categoryId: 3,
        artisanId: 2,
        rating: 4,
        reviewCount: 36,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isBestseller: true,
        village: "Làng lụa Vạn Phúc"
      },
      {
        name: "Tượng gỗ trang trí hình cá chép",
        slug: "tuong-go-trang-tri-hinh-ca-chep",
        description: "Tượng gỗ hình cá chép được chạm khắc tinh xảo từ gỗ mít, biểu tượng cho sự may mắn và thịnh vượng.",
        price: 1250000,
        salePrice: null,
        image: "https://images.unsplash.com/photo-1603006939079-5de87a28f6d6",
        images: ["https://images.unsplash.com/photo-1603006939079-5de87a28f6d6", "https://images.unsplash.com/photo-1533276441486-4e77d234e21f"],
        categoryId: 4,
        artisanId: null,
        rating: 3.5,
        reviewCount: 23,
        inStock: true,
        isNew: false,
        isFeatured: true,
        isBestseller: false,
        village: "Làng nghề gỗ Đồng Kỵ"
      },
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
    
    // Seed testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Nguyễn Thị Hương",
        location: "Hà Nội",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        rating: 5,
        comment: "Tôi rất ấn tượng với chất lượng sản phẩm từ Làng Nghề Việt. Chiếc bình gốm mà tôi mua không chỉ đẹp mà còn mang đậm nét văn hóa truyền thống. Dịch vụ giao hàng nhanh chóng và chu đáo. Chắc chắn tôi sẽ tiếp tục ủng hộ!"
      },
      {
        name: "Trần Minh Đức",
        location: "TP. Hồ Chí Minh",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        rating: 4,
        comment: "Đây là lần đầu tiên tôi mua hàng thủ công qua mạng và tôi thực sự hài lòng. Bộ khăn trải bàn thêu tay mà tôi đặt rất tinh xảo và đúng như mô tả. Nhân viên tư vấn rất tận tình và có kiến thức sâu về sản phẩm."
      },
      {
        name: "Phạm Thanh Hà",
        location: "Đà Nẵng",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        rating: 5,
        comment: "Sản phẩm mây tre đan rất chắc chắn và đẹp mắt. Tôi đã mua nhiều lần và luôn hài lòng với chất lượng. Rất vui vì có thể hỗ trợ các làng nghề truyền thống của Việt Nam."
      }
    ];
    
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }
}

export class DatabaseStorage implements IStorage {
  private fallbackStorage: MemStorage;
  
  constructor() {
    // Tạo một instance của MemStorage để sử dụng khi db không khả dụng
    this.fallbackStorage = new MemStorage();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    if (!db) return this.fallbackStorage.getUser(id);
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) return this.fallbackStorage.getUserByUsername(username);
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) return this.fallbackStorage.createUser(insertUser);
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Category methods
  async getCategories(): Promise<Category[]> {
    if (!db) return this.fallbackStorage.getCategories();
    return await db.select().from(categories);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    if (!db) return this.fallbackStorage.getCategoryBySlug(slug);
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    if (!db) return this.fallbackStorage.createCategory(insertCategory);
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    if (!db) return this.fallbackStorage.getProducts();
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    if (!db) return this.fallbackStorage.getProductById(id);
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    if (!db) return this.fallbackStorage.getProductBySlug(slug);
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    if (!db) return this.fallbackStorage.getProductsByCategory(categoryId);
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    if (!db) return this.fallbackStorage.getFeaturedProducts();
    return await db.select().from(products).where(eq(products.isFeatured, true));
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    if (!db) return this.fallbackStorage.createProduct(insertProduct);
    
    // Start a transaction since we need to update the category's product count
    const [product] = await db.transaction(async (tx: any) => {
      const [newProduct] = await tx.insert(products).values(insertProduct).returning();
      
      // Update the category's product count
      await tx
        .update(categories)
        .set({ productCount: sql`${categories.productCount} + 1` })
        .where(eq(categories.id, insertProduct.categoryId));
      
      return [newProduct];
    });
    
    return product;
  }
  
  // Artisan methods
  async getArtisans(): Promise<Artisan[]> {
    if (!db) return this.fallbackStorage.getArtisans();
    return await db.select().from(artisans);
  }
  
  async getArtisanById(id: number): Promise<Artisan | undefined> {
    if (!db) return this.fallbackStorage.getArtisanById(id);
    const [artisan] = await db.select().from(artisans).where(eq(artisans.id, id));
    return artisan || undefined;
  }
  
  async createArtisan(insertArtisan: InsertArtisan): Promise<Artisan> {
    if (!db) return this.fallbackStorage.createArtisan(insertArtisan);
    const [artisan] = await db.insert(artisans).values(insertArtisan).returning();
    return artisan;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    if (!db) return this.fallbackStorage.getTestimonials();
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    if (!db) return this.fallbackStorage.createTestimonial(insertTestimonial);
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  
  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    if (!db) return this.fallbackStorage.getCartItems(sessionId);
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
  
  async getCartItemWithProduct(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    if (!db) return this.fallbackStorage.getCartItemWithProduct(sessionId);
    
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    const result: (CartItem & { product: Product })[] = [];
    
    for (const item of items) {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId));
      if (product) {
        result.push({
          ...item,
          product
        });
      }
    }
    
    return result;
  }
  
  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    if (!db) return this.fallbackStorage.addToCart(insertCartItem);
    
    // Check if the item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, insertCartItem.sessionId),
          eq(cartItems.productId, insertCartItem.productId)
        )
      );
    
    if (existingItem) {
      // Update quantity of existing item
      const newQuantity = (existingItem.quantity || 0) + (insertCartItem.quantity || 1);
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    }
    
    // Insert new cart item
    const [cartItem] = await db.insert(cartItems).values(insertCartItem).returning();
    return cartItem;
  }
  
  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    if (!db) return this.fallbackStorage.updateCartItem(id, quantity);
    
    if (quantity <= 0) {
      await db.delete(cartItems).where(eq(cartItems.id, id));
      return undefined;
    }
    
    const [cartItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem;
  }
  
  async removeFromCart(id: number): Promise<void> {
    if (!db) return this.fallbackStorage.removeFromCart(id);
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }
  
  async clearCart(sessionId: string): Promise<void> {
    if (!db) return this.fallbackStorage.clearCart(sessionId);
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
  
  // Subscriber methods
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    if (!db) return this.fallbackStorage.createSubscriber(insertSubscriber);
    const [subscriber] = await db.insert(subscribers).values(insertSubscriber).returning();
    return subscriber;
  }
}

// Sử dụng DatabaseStorage thay vì MemStorage
// Sử dụng MemStorage khi không có DATABASE_URL, nếu không thì sử dụng DatabaseStorage
import { hasDatabaseConnection } from "./db";

export const storage = hasDatabaseConnection 
  ? new DatabaseStorage() 
  : new MemStorage();
