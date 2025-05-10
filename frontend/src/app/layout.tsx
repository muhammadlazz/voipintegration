import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/../contexts/AuthContext";
import { SocketProvider } from "@/../contexts/SocketContext";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoIP Integration",
  description: "VoIP Integration with Kamailio using UDP protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SocketProvider>
            {children}
            <Toaster />
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}