import './globals.css'
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import InternationalDestinations from './components/InternationalDestinations';
import FeaturesSection from './components/FeaturesSection';


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
      <body>
      <Header />
      <main className="flex-grow">{children}
        <InternationalDestinations />
        <FeaturesSection />
        </main>

        <Footer />
      </body>
    </html>
  );
}
