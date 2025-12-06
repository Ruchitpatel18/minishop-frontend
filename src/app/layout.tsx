// src/app/layout.tsx (Recommended structure)

import './globals.css';
import { CartProvider } from './providers/CartContext';

// Define Metadata (Title and Description)
export const metadata = {
  title: 'MiniShop E-commerce',
  description: 'Frontend-only shopping cart built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}