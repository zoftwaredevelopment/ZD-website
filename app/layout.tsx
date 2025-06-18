import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// Comprehensive SEO metadata for Next.js
export const metadata: Metadata = {
  // Canonical URL to prevent duplicate content issues
  metadataBase: new URL('https://zoftwaredevelopment.agency'), // Replace with your actual domain
  alternates: {
    canonical: '/', // Canonical URL for the homepage
  },

  // Primary SEO tags
  title: "Zoftware Development - Custom Software Solutions & Web Development",
  description: "Transform your business with custom software solutions from Zoftware Development. Expert web development, mobile apps, and enterprise software. Anything is possible with Zoftware.",
  keywords: "custom software development, web development, mobile app development, enterprise software, business automation, React development, Next.js development", // Focused, relevant keywords

  // Technical metadata
  generator: "Next.js",
  applicationName: "Zoftware Development",
  referrer: "origin-when-cross-origin", // Privacy-friendly referrer policy

  // SEO directives for search engines
  robots: {
    index: true,        // Allow search engines to index this page
    follow: true,       // Allow search engines to follow links
    noarchive: false,   // Allow search engines to archive
    nocache: false,     // Allow search engines to cache
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false, // Allow Google to index images
      'max-video-preview': -1,    // Allow full video previews
      'max-image-preview': 'large', // Allow large image previews
      'max-snippet': -1,  // Allow unlimited snippet length
    },
  },

  // Icons for browser and iOS (apple touch)
  icons: {
    icon: '/images/just-logo.png',       // standard favicon
    shortcut: '/images/just-logo.png',  // shortcut icon
    apple: '/images/just-logo.png',     // apple touch icon
  },

  // Enhanced OpenGraph metadata for social media sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',                     // Language and region
    url: 'https://zoftwaredevelopment.agency',         // Canonical URL for social sharing
    title: "Zoftware Development - Custom Software Solutions & Web Development",
    description: "Transform your business with custom software solutions from Zoftware Development. Expert web development, mobile apps, and enterprise software. Anything is possible with Zoftware.",
    siteName: "Zoftware Development",    // Site name for social platforms
    images: [
      {
        url: 'https://zoftwaredevelopment.agency/images/just-logo.png', // Absolute URL for social sharing
        width: 1200,                     // recommended width for og:image
        height: 630,                     // recommended height for og:image
        alt: 'Zoftware Development Logo - Custom Software Solutions', // descriptive alt text
        type: 'image/png',               // image MIME type
      }
    ],
  },

  // X (formerly Twitter) Card metadata for better X sharing
  twitter: {
    card: 'summary_large_image',         // Large image card for better visibility
    title: "Zoftware Development - Custom Software Solutions",
    description: "Transform your business with custom software solutions. Expert web development, mobile apps, and enterprise software.",
    images: ['/images/just-logo.png'],   // X card image
    creator: '@ZoftwareD',             // X handle
  },

  // Additional metadata for better SEO
  category: 'technology',                // Content category
  classification: 'Business',           // Content classification
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className}`}>

        {children}

        {/* Place the Toaster at the root so any page or component can toast */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />

      </body>
    </html>
  );
}
