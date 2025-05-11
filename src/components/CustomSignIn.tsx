'use client';

import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CustomSignIn() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          formFieldInput: 'rounded-md border-gray-300',
          formFieldLabel: 'font-medium text-gray-700',
          card: 'rounded-xl shadow-lg',
        }
      }}
      path="/sign-in"
      signUpUrl="/sign-up"
      routing="path"
      redirectUrl="/classrooms"
      afterSignInUrl="/classrooms"
    />
  );
}

// Add a script to handle redirection
if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('createdSessionId')) {
    window.location.href = '/classrooms';
  }
} 