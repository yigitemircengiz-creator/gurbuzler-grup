import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'

export const brands = pgTable('brands', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  brandId: text('brand_id').notNull(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  brandId: text('brand_id').notNull(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  location: text('location'),
  description: text('description'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const blogPosts = pgTable('blog_posts', {
  id: text('id').primaryKey(),
  brandId: text('brand_id'),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  content: text('content'),
  imageUrl: text('image_url'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const faqs = pgTable('faqs', {
  id: text('id').primaryKey(),
  brandId: text('brand_id'),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
})

export const contactRequests = pgTable('contact_requests', {
  id: text('id').primaryKey(),
  brandId: text('brand_id'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export const schema = { brands, products, projects, blogPosts, faqs, contactRequests }
