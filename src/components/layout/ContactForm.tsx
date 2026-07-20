"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo build: no backend.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-success/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <p className="mt-3 font-heading text-lg font-semibold text-primary">
          Message received
        </p>
        <p className="mt-1 text-sm text-primary-600">
          Thank you, {form.name || "there"}. We&rsquo;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Input
        name="name"
        label="Full Name"
        placeholder="Your name"
        required
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        required
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
      <Textarea
        name="message"
        label="Message"
        rows={5}
        placeholder="What are you looking for?"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />
      <Button type="submit" className="w-full sm:w-auto">
        Send Message <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
