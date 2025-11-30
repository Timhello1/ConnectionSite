import type { Metadata } from "next";
import "./global.css";
import ThemeProvider from "../components/ThemeProvider";
import AppLayout from "../components/layout/AppLayout";

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
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}