import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function AdminPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }
  
  // Redirect to the dashboard
  redirect("/classrooms/admin/dashboard");
} 