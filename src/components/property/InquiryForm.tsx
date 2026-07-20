"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { whatsappUrl } from "@/lib/utils";

export function InquiryForm({
  propertyTitle,
}: {
  propertyId: string;
  propertyTitle: string;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I'm interested in "${propertyTitle}". Please share more details.`,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  function update(k: keyof typeof form, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Demo build: no backend. Simulate a successful submission.
    await new Promise((r) => setTimeout(r, 600));
    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-success/10 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h3 className="mt-3 font-heading text-lg font-semibold text-primary">
          Enquiry received
        </h3>
        <p className="mt-1 text-sm text-primary-600">
          Thank you, {form.name || "there"}. A SasteGhar advisor will be in touch
          shortly.
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
      <Input
        name="phone"
        label="Phone (optional)"
        placeholder="+91 98765 43210"
        value={form.phone}
        onChange={(e) => update("phone", e.target.value)}
      />
      <Textarea
        name="message"
        label="Message"
        rows={4}
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Send Enquiry"}
        <Send className="h-4 w-4" />
      </Button>
      <Button
        href={whatsappUrl(
          SITE.whatsapp,
          `Hi ${SITE.shortName}, I'm interested in "${propertyTitle}". Please share more details.`
        )}
        target="_blank"
        variant="outline"
        className="w-full"
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
      </Button>
    </form>
  );
}
