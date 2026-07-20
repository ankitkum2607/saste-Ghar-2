import type { Metadata } from "next";
import { AuthForm } from "@/components/layout/AuthForm";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="container-px flex min-h-[70vh] items-center justify-center py-28">
      <AuthForm mode="login" />
    </div>
  );
}
