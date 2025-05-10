import { RoleSelection } from "@/components/RoleSelection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RoleSelectionPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return <RoleSelection />;
}