import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertCategorySchema, 
  insertProductSchema, 
  insertArtisanSchema, 
  insertTestimonialSchema,
  insertCartItemSchema,
  insertSubscriberSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // All routes are prefixed with /api
  
  // Categories
  app.get("/api/categories", async (_req: Request, res: Response) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });
  
  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại" });
    }
    
    res.json(category);
  });
  
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });
  
  // Products
  app.get("/api/products", async (_req: Request, res: Response) => {
    const products = await storage.getProducts();
    res.json(products);
  });
  
  app.get("/api/products/featured", async (_req: Request, res: Response) => {
    const products = await storage.getFeaturedProducts();
    res.json(products);
  });
  
  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await storage.getProductBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    
    res.json(product);
  });
  
  app.get("/api/categories/:categoryId/products", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      res.status(400).json({ message: "ID danh mục không hợp lệ" });
    }
  });
  
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });
  
  // Artisans
  app.get("/api/artisans", async (_req: Request, res: Response) => {
    const artisans = await storage.getArtisans();
    res.json(artisans);
  });
  
  app.get("/api/artisans/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const artisan = await storage.getArtisanById(id);
      
      if (!artisan) {
        return res.status(404).json({ message: "Nghệ nhân không tồn tại" });
      }
      
      res.json(artisan);
    } catch (error) {
      res.status(400).json({ message: "ID nghệ nhân không hợp lệ" });
    }
  });
  
  app.post("/api/artisans", async (req: Request, res: Response) => {
    try {
      const artisanData = insertArtisanSchema.parse(req.body);
      const artisan = await storage.createArtisan(artisanData);
      res.status(201).json(artisan);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });
  
  // Testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    const testimonials = await storage.getTestimonials();
    res.json(testimonials);
  });
  
  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonialData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(testimonialData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });
  
  // Cart
  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const cartItems = await storage.getCartItemWithProduct(sessionId);
    res.json(cartItems);
  });
  
  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartItemData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });
  
  app.put("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ message: "Số lượng không hợp lệ" });
      }
      
      const cartItem = await storage.updateCartItem(id, quantity);
      
      if (!cartItem && quantity > 0) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
      }
      
      res.json({ success: true, item: cartItem });
    } catch (error) {
      res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }
  });
  
  app.delete("/api/cart/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: "ID sản phẩm không hợp lệ" });
    }
  });
  
  app.delete("/api/cart/session/:sessionId", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    await storage.clearCart(sessionId);
    res.json({ success: true });
  });
  
  // Newsletter subscription
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);
      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json({ success: true, message: "Đăng ký nhận bản tin thành công" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ", errors: error.errors });
      }
      res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
