


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Project Management SaaS",
  description: "Manage projects, teams, and tasks easily",
  icons: {
    icon: [
      { url: "/icons.jpeg", type: "image/jpeg", sizes: "16x16" },
      { url: "/updatedicon.jpeg", type: "image/jpeg", sizes: "32x32" },
      { url: "/icons.jpeg", type: "image/jpeg", sizes: "48x48" },
    ],
    shortcut: "/icons.jpeg",
    apple: [
      { url: "/icons.jpeg", sizes: "180x180" },
      { url: "/icons.jpeg", sizes: "152x152" },
      { url: "/icons.jpeg", sizes: "120x120" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
