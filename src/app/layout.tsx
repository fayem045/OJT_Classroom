import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";
import { headers } from "next/headers";
import { ClientProvider } from "~/components/ClientProvider";
import { auth } from "@clerk/nextjs/server";
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

const isUploadThingConfigured = 
  typeof process.env.NEXT_PUBLIC_UPLOADTHING_URL === 'string' && 
  process.env.NEXT_PUBLIC_UPLOADTHING_URL !== '';

/**
 * Determines if the current path should show authentication UI
 * @param path - Current URL path
 * @param isUnauthenticated - Whether the user is not authenticated
 * @returns boolean indicating if auth UI should be shown
 */
function isAuthPath(path: string, isUnauthenticated: boolean): boolean {
  console.log("isAuthPath input:", { path, isUnauthenticated });
  
  // Show auth UI for authentication-related paths
  if (["/sign-in", "/sign-up", "/sign-out", "/role-selection"].includes(path)) {
    return true;
  }
  
  // Show auth UI at root path for unauthenticated users
  if (path === "/" && isUnauthenticated === true) {
    console.log("Should show auth at root for unauthenticated user");
    return true;
  }
  
  return false;
}

/**
 * Root layout component that wraps the entire application
 * Handles authentication, routing, and global UI elements
 */
export default async function RootLayout({
  children,
  home,
  professor,
  student,
  auth: authSlot,
}: Readonly<{
  children: React.ReactNode;
  home: React.ReactNode;
  professor: React.ReactNode;
  student: React.ReactNode;
  auth: React.ReactNode;
}>) {
  // Get current user's authentication status
  const { userId } = await auth();
  const headersList = headers();
  const fullUrl = headersList.get("x-url") || "/";
  const path = new URL(fullUrl).pathname;

  // Determine if user is unauthenticated and if auth UI should be shown
  const isUnauthenticated = userId === null;
  const showAuth = path === "/" && isUnauthenticated ? true : isAuthPath(path, isUnauthenticated);
  
  console.log("Auth state:", { path, userId, isUnauthenticated, showAuth });

  return (
    // Configure Clerk authentication provider with custom styling
    <ClerkProvider 
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl="/"  
      signUpUrl="/" 
      afterSignInUrl="/" 
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
          {/* Configure UploadThing if available */}
          {isUploadThingConfigured && (
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          )}
          {/* Client provider handles role-based routing and layout */}
          <ClientProvider
            showAuth={showAuth}
            home={home}
            professor={professor}
            student={student}
            auth={authSlot}
            children={children}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}