import { Router } from "express";
import { db, enquirySubmissionsTable } from "@workspace/db";
import { SubmitEnquiryBody } from "@workspace/api-zod";

const router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendEmail(type: string, data: Record<string, unknown>) {
  // Placeholder: swap for Resend/SendGrid later
  console.log(`[sendEmail] type=${type}`, data);
}

router.post("/enquiry", async (req, res) => {
  const result = SubmitEnquiryBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0]?.message ?? "Validation error" });
  }

  const { name, email, phone, message, productSlug, productTitle } = result.data;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  await db.insert(enquirySubmissionsTable).values({
    name,
    email,
    phone: phone ?? null,
    message,
    productSlug: productSlug ?? null,
    productTitle: productTitle ?? null,
  });

  sendEmail("enquiry", { name, email, phone, message, productSlug, productTitle });

  return res.status(201).json({
    success: true,
    message:
      "Thank you for your enquiry. Our curator will be in touch within 24 hours.",
  });
});

export default router;
