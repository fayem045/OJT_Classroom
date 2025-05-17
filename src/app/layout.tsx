import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { TRPCReactProvider } from "~/trpc/react";
import "~/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrainTrackDesk",
  description: "Web-based OJT tracker system",
  icons: {
    icon: [
      {
        url: "/images/UA-Logo.png",
        href: "/images/UA-Logo.png",
      },
    ],
  },
};

// Check if UploadThing is configured
const isUploadThingConfigured = 
  typeof process.env.NEXT_PUBLIC_UPLOADTHING_URL === 'string' && 
  process.env.NEXT_PUBLIC_UPLOADTHING_URL !== '';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/role-selection"
      afterSignUpUrl="/role-selection"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          footer: 'hidden',
          formFieldInput: 'rounded-md border-gray-300',
          formFieldLabel: 'font-medium text-gray-700'
        }
      }}
    >
      <html lang="en">
        <body
          suppressHydrationWarning
          className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        >
          {isUploadThingConfigured && (
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          )}
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
