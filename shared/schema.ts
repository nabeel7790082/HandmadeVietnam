import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  productCount: integer("product_count").default(0),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  image: true,
  productCount: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: doublePrecision("price").notNull(),
  salePrice: doublePrecision("sale_price"),
  image: text("image").notNull(),
  images: text("images").array(),
  categoryId: integer("category_id").notNull(),
  artisanId: integer("artisan_id"),
  rating: doublePrecision("rating").default(0),
  reviewCount: integer("review_count").default(0),
  inStock: boolean("in_stock").default(true),
  isNew: boolean("is_new").default(false),
  isFeatured: boolean("is_featured").default(false),
  isBestseller: boolean("is_bestseller").default(false),
  village: text("village"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  salePrice: true,
  image: true,
  images: true,
  categoryId: true,
  artisanId: true,
  rating: true,
  reviewCount: true,
  inStock: true,
  isNew: true,
  isFeatured: true,
  isBestseller: true,
  village: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Artisans
export const artisans = pgTable("artisans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image"),
  village: text("village").notNull(),
  description: text("description"),
});

export const insertArtisanSchema = createInsertSchema(artisans).pick({
  name: true,
  image: true,
  village: true,
  description: true,
});

export type InsertArtisan = z.infer<typeof insertArtisanSchema>;
export type Artisan = typeof artisans.$inferSelect;

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  image: text("image"),
  rating: integer("rating").default(5),
  comment: text("comment").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  location: true,
  image: true,
  rating: true,
  comment: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Cart Items
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  sessionId: text("session_id").notNull(),
  quantity: integer("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  productId: true,
  sessionId: true,
  quantity: true,
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Subscribers
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSubscriberSchema = createInsertSchema(subscribers).pick({
  name: true,
  email: true,
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

// Users - keeping the existing schema, but extending it
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
