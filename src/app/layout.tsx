import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./global.css";
import ThemeProvider from "../components/ThemeProvider";
import { AuthProvider } from "../contexts/AuthContext";
import AppLayout from "../components/layout/AppLayout";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "D&D Campaign - Adventure Awaits",
  description: "Your central hub for our D&D campaign adventures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}