import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';
import { Nav } from '@/components/Nav';

// No web font is loaded. Both faces the site uses — Consolas for titles and
// labels, Helvetica for prose — are installed fonts, so the stacks in
// globals.css resolve locally and there is nothing to fetch.

export const metadata: Metadata = {
  title: 'Ayden Pettiette — Architectural Portfolio',
  description: 'Architectural design portfolio — spatial exploration, residential, and civic projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior tells the router the page opts into smooth
    // scrolling, so it does not fight the CSS during route transitions.
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CustomCursor />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
