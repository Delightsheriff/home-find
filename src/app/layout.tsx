import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/AuthProvider";
import HeaderWrapper from "@/components/ui/HeaderWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s | NestQuest",
    default: "Welcome to NestQuest",
  },
  description: "NestQuest is a home finder for the modern age.",
};

const montserrat = Montserrat({
  subsets: ["latin"],
});

/**
 * Root layout component for the application.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased flex
          flex-col
          min-h-dvh scroll-smooth`}
      >
        <AuthProvider>
          <HeaderWrapper />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
