import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Ayden Pettiette — Architectural Portfolio',
  description: 'Architectural design portfolio — spatial exploration, residential, and civic projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
