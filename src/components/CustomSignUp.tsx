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
        }
      }}
      path="/sign-up"
      afterSignUpUrl="/role-selection"
      redirectUrl="/role-selection"
    />
  );
}