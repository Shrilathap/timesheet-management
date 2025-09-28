import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/Header";
import { BreadcrumbProvider } from "@/context/breadcrumb";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timesheet Management App",
  description: "A web application for managing employee timesheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <BreadcrumbProvider>
          <Header />
        <main className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50 max-h-[calc(100vh-64px)] justify-items-center">
          {children}
        <div className="bg-white rounded-lg shadow mt-4 md:w-3/4 w-full">
          <footer className="text-center font-normal py-8 text-gray-500 text-sm">
            © 2024 tentwenty. All rights reserved.
          </footer>
        </div>
        </main>
        </BreadcrumbProvider>
  );
}
