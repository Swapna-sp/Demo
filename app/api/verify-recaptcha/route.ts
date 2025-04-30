// app/api/verify-captcha/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  const secret = process.env.CAPTCHA_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ success: false, message: 'Captcha secret not set' }, { status: 500 });
  }

  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await res.json();
  console.log('reCAPTCHA verification result:', data);

  return NextResponse.json(data);
}
