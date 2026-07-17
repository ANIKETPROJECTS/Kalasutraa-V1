import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Contact form submissions
export const contactSubmissionsTable = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactSubmissionSchema = createInsertSchema(
  contactSubmissionsTable,
).omit({ id: true, createdAt: true });
export type InsertContactSubmission = z.infer<
  typeof insertContactSubmissionSchema
>;
export type ContactSubmission = typeof contactSubmissionsTable.$inferSelect;

// Product enquiry submissions
export const enquirySubmissionsTable = pgTable("enquiry_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  productSlug: text("product_slug"),
  productTitle: text("product_title"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEnquirySubmissionSchema = createInsertSchema(
  enquirySubmissionsTable,
).omit({ id: true, createdAt: true });
export type InsertEnquirySubmission = z.infer<
  typeof insertEnquirySubmissionSchema
>;
export type EnquirySubmission = typeof enquirySubmissionsTable.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptionsTable = pgTable(
  "newsletter_subscriptions",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
    active: boolean("active").default(true).notNull(),
  },
);

export const insertNewsletterSubscriptionSchema = createInsertSchema(
  newsletterSubscriptionsTable,
).omit({ id: true, subscribedAt: true, active: true });
export type InsertNewsletterSubscription = z.infer<
  typeof insertNewsletterSubscriptionSchema
>;
export type NewsletterSubscription =
  typeof newsletterSubscriptionsTable.$inferSelect;
