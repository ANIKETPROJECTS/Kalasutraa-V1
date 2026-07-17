import { Router } from "express";
import { db, newsletterSubscriptionsTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/newsletter", async (req, res) => {
  const result = SubscribeNewsletterBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0]?.message ?? "Validation error" });
  }

  const { email } = result.data;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const existing = await db
    .select()
    .from(newsletterSubscriptionsTable)
    .where(eq(newsletterSubscriptionsTable.email, email))
    .limit(1);

  if (existing.length > 0) {
    return res
      .status(409)
      .json({ error: "This email is already subscribed to our newsletter." });
  }

  await db.insert(newsletterSubscriptionsTable).values({ email });

  return res.status(201).json({
    success: true,
    message:
      "Welcome to Kalasutraa. Your 10% discount code will arrive shortly.",
  });
});

export default router;
