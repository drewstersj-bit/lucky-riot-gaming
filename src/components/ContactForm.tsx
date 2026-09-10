"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { areaOfInterestOptions, contactContent } from "@/content/contact";
import { Button } from "./Button";

interface FieldErrors {
  name?: string;
  company?: string;
  email?: string;
  interest?: string;
  message?: string;
  consent?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join("&");
}

export function ContactForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(form: HTMLFormElement): FieldErrors {
    const data = new FormData(form);
    const next: FieldErrors = {};
    const name = (data.get("name") as string)?.trim();
    const company = (data.get("company") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const interest = data.get("interest") as string;
    const message = (data.get("message") as string)?.trim();
    const consent = data.get("consent");

    if (!name) next.name = "Please enter your name.";
    if (!company) next.company = "Please enter your company.";
    if (!email) next.email = "Please enter your work email.";
    else if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    if (!interest) next.interest = "Please choose an area of interest.";
    if (!message) next.message = "Please tell us a little about your enquiry.";
    if (!consent) next.consent = "Please confirm you consent to us contacting you.";

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setSubmitting(true);
    const formData = new FormData(form);
    const payload: Record<string, string> = { "form-name": contactContent.formName };
    formData.forEach((value, key) => {
      payload[key] = value.toString();
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      router.push("/contact/success/");
    } catch {
      setSubmitError(
        "Something went wrong sending your enquiry. Please try again, or email us directly.",
      );
      setSubmitting(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-riot-border bg-riot-charcoal px-4 py-3 text-riot-white placeholder-riot-text-muted/60 focus:border-riot-cyan focus:outline-none focus:ring-2 focus:ring-riot-cyan/40";

  return (
    <form
      name={contactContent.formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Netlify needs this hidden input to associate the submission. */}
      <input type="hidden" name="form-name" value={contactContent.formName} />
      {/* Honeypot field (hidden from humans). */}
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {submitError && (
        <div role="alert" className="rounded-lg border border-state-error/40 bg-state-error/10 p-4 text-sm text-state-error">
          {submitError}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-riot-text">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-state-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-riot-text">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={fieldClass}
          />
          {errors.company && (
            <p id="company-error" className="mt-2 text-sm text-state-error">
              {errors.company}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-riot-text">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={fieldClass}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-state-error">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-semibold text-riot-text">
          Area of interest
        </label>
        <select
          id="interest"
          name="interest"
          defaultValue=""
          aria-invalid={!!errors.interest}
          aria-describedby={errors.interest ? "interest-error" : undefined}
          className={fieldClass}
        >
          <option value="" disabled>
            Select an option…
          </option>
          {areaOfInterestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p id="interest-error" className="mt-2 text-sm text-state-error">
            {errors.interest}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-riot-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={fieldClass}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-state-error">
            {errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-riot-text">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 rounded border-riot-border bg-riot-charcoal text-riot-cyan focus:ring-riot-cyan/40"
          />
          <span>
            I consent to Lucky Riot Games storing my details in order to respond to this enquiry.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-sm text-state-error">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Sending…" : "Send Enquiry"}
      </Button>
    </form>
  );
}
