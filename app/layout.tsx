import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Outlook — Calendar",
  description: "Meridian Biopharma Microsoft 365 Calendar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-outlook-chrome text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
