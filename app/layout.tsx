import './globals.css'
import { Toaster } from 'react-hot-toast';



export const metadata = {
  title: 'Phone Login',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />
      </head>
      <body >{children}</body>
    </html>
  );
}
