// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const token = body.token;

//     if (!token) {
//       return NextResponse.json(
//         { success: false, message: 'Missing token' },
//         { status: 400 }
//       );
//     }

//     const secretKey = process.env.CAPTCHA_SECRET_KEY;
//     if (!secretKey) {
//       return NextResponse.json(
//         { success: false, message: 'Missing secret key' },
//         { status: 500 }
//       );
//     }

//     const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `secret=${secretKey}&response=${token}`,
//     });

//     const data = await response.json();
//     console.log('reCAPTCHA verification result:', data);

//     if (!data.success || data.score < 0.5) {
//       return NextResponse.json(
//         { success: false, message: 'reCAPTCHA verification failed' },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error verifying reCAPTCHA:', error);
//     return NextResponse.json(
//       { success: false, message: 'Server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const token = body.token;

  if (!token) {
    return NextResponse.json({ success: false, message: 'Token is missing' }, { status: 400 });
  }

  const secret = '6LcmYTIrAAAAAAJLi7fxpXcesvJEmtBjL0PKt6eB';

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
