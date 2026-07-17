import { Router } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router = Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sendEmail(type: string, data: Record<string, unknown>) {
  // Placeholder: swap for Resend/SendGrid later
  console.log(`[sendEmail] type=${type}`, data);
}

router.post("/contact", async (req, res) => {
  const result = SubmitContactBody.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.issues[0]?.message ?? "Validation error" });
  }

  const { name, email, phone, message } = result.data;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  await db.insert(contactSubmissionsTable).values({
    name,
    email,
    phone: phone ?? null,
    message,
  });

  sendEmail("contact", { name, email, phone, message });

  return res.status(201).json({
    success: true,
    message: "Thank you for reaching out. We will be in touch shortly.",
  });
});

export default router;
