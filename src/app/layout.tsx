import ReduxProvider from '@/redux/ReduxProvider';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { AuthContext } from '@/context/AuthContext';
import ToasterContext from '@/context/ToasterContext';
import Favicon from '/public/favicon.ico';
import Footer from '@/components/ui/Footer';
import '@/styles/globals.css';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  style: ['normal'],
});

export const metadata: Metadata = {
  title: 'Next Shop App',
  description: 'Shop-online shopping service for all of your needs',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={roboto.className}>
        <AuthContext>
          <ThemeRegistry>
            <ToasterContext />
            <ReduxProvider>
              {children}
              <Footer />
            </ReduxProvider>
          </ThemeRegistry>
        </AuthContext>
      </body>
    </html>
  );
}
