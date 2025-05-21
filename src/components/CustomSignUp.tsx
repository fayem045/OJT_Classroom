'use client';

import { SignUp } from "@clerk/nextjs";

export function CustomSignUp() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          formFieldInput: 'rounded-md border-gray-300',
          formFieldLabel: 'font-medium text-gray-700',
          card: 'rounded-xl shadow-lg',
<<<<<<< HEAD
          rootBox: 'w-full',
          header: 'hidden', 
          headerTitle: 'hidden', 
          headerSubtitle: 'hidden', 
          navbar: 'hidden',
          page: 'w-full flex justify-center items-center'
        },
        layout: {
          logoPlacement: 'inside', 
          socialButtonsVariant: 'iconButton'
=======
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
        }
      }}
      path="/sign-up"
      signInUrl="/sign-in"
      routing="path"
      redirectUrl="/role-selection"
      afterSignUpUrl="/role-selection"
    />
  );
}
<<<<<<< HEAD
=======

// Add a script to handle redirection
if (typeof window !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('createdSessionId')) {
    window.location.href = '/role-selection';
  }
}
>>>>>>> 5af29285aac4e7d151f054d48591d05624f3fa77
