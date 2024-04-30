import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CssBaseline from '@mui/material/CssBaseline';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Questionnaire',
  description: 'Questionnaire constructor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </>
  );
}
