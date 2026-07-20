import type { Metadata } from "next";
import { AuthForm } from "@/components/layout/AuthForm";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="container-px flex min-h-[70vh] items-center justify-center py-28">
      <AuthForm mode="register" />
    </div>
  );
}
