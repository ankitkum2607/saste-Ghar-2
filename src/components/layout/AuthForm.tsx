"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const [note, setNote] = useState(false);

  return (
    <div className="w-full max-w-md">
      <h1 className="font-heading text-3xl font-semibold text-primary">
        {isLogin ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mt-2 text-primary-600">
        {isLogin
          ? "Log in to see your saved flats and site visits."
          : "Save flats, book visits, and get the Quiet List."}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setNote(true);
        }}
        className="mt-8 space-y-4"
        noValidate
      >
        {!isLogin && (
          <Input name="name" label="Full Name" placeholder="Your name" required />
        )}
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
        />
        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••"
          required
        />
        <Button type="submit" className="w-full">
          {isLogin ? "Log In" : "Create Account"}
        </Button>
      </form>

      {note && (
        <p className="mt-4 rounded-xl bg-cream p-3 text-center text-sm text-primary-600">
          This is a demo build — accounts aren&rsquo;t connected yet.
        </p>
      )}

      <p className="mt-6 text-center text-sm text-primary-600">
        {isLogin ? (
          <>
            New here?{" "}
            <Link href="/register" className="font-semibold text-secondary">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-secondary">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
