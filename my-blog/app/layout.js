"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionProvider>
          <Header />
          <main className="container mx-auto mt-8 px-4 flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 My Blog. All rights reserved.</p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
