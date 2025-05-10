import { SignIn } from "@clerk/nextjs";

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
      afterSignInUrl="/role-selection"
      signUpUrl="/sign-up"
      routing="path"
    />
  );
} 