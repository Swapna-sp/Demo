import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Token is missing' }, { status: 400 });
  }

  const secret = process.env.NEXT_RECAPTCHA_SECRET_KEY;

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await response.json();

  if (!data.success) {
    return NextResponse.json({ success: false, message: 'Verification failed' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
