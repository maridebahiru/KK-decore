import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
  Share2,
} from 'lucide-react';
import { COMPANY_CONTACT, SERVICES } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  eventType: string;
  preferredDate: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM: FormValues = {
  fullName: '',
  phoneNumber: '',
  email: '',
  eventType: '',
  preferredDate: '',
  message: '',
};

export const ContactSection: React.FC = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'error' | 'success'>('idle');
  const [submittedSnapshot, setSubmittedSnapshot] = useState<FormValues | null>(null);

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const digitsOnly = data.phoneNumber.replace(/[^\d]/g, '');
    if (!data.phoneNumber.trim() || digitsOnly.length < 7) {
      nextErrors.phoneNumber = 'Please provide a valid contact phone number (at least 7 digits).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address (e.g., name@domain.com).';
    }

    if (!data.eventType.trim()) {
      nextErrors.eventType = 'Please select an event type.';
    }

    if (!data.preferredDate.trim()) {
      nextErrors.preferredDate = 'Please select a preferred event date.';
    } else {
      const selected = new Date(data.preferredDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        nextErrors.preferredDate = 'Preferred event date cannot be in the past.';
      }
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      nextErrors.message = 'Please share a brief overview of your event (at least 10 characters).';
    }

    return nextErrors;
  };

  const handleChange = (
    field: keyof FormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
    if (submitState === 'error') {
      setSubmitState('idle');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState('error');
      return;
    }

    setErrors({});
    setSubmittedSnapshot(values);
    setSubmitState('success');
    setValues(INITIAL_FORM);
  };

  const inputBaseClass =
    'w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#202020] placeholder:text-[#202020]/45 dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-white/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#C5A46D]';

  return (
    <section
      id="contact"
      className="bg-[#FAF8F4] dark:bg-[#151515] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeadingReveal
          eyebrow="Contact Us"
          title="Begin Planning Your Celebration With Us"
          subtitle="Share your event date, guest scale, and styling priorities. Our planning team will review your brief to prepare an initial consultation."
          className="max-w-2xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Company Contact Directory (No Fabricated Details) */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] p-7 sm:p-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                Company Contact Information
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#202020]/65 dark:text-white/65">
                Official studio channels for KK Decor and Event. Contact fields marked pending are
                configurable in the company profile directory.
              </p>

              <dl className="mt-8 space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#1a1a1a]">
                    <Phone className="h-4 w-4 text-[#541C2B] dark:text-[#C5A46D]" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#202020] dark:text-white">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-[#202020]/80 dark:text-white/80">
                      {COMPANY_CONTACT.phone.value}
                    </dd>
                    {!COMPANY_CONTACT.phone.isConfigured && (
                      <dd className="mt-1 text-xs text-[#202020]/55 dark:text-white/55">
                        {COMPANY_CONTACT.phone.placeholderNotice}
                      </dd>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#1a1a1a]">
                    <Mail className="h-4 w-4 text-[#541C2B] dark:text-[#C5A46D]" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#202020] dark:text-white">
                      Email Address
                    </dt>
                    <dd className="mt-1 text-sm text-[#202020]/80 dark:text-white/80">
                      {COMPANY_CONTACT.email.value}
                    </dd>
                    {!COMPANY_CONTACT.email.isConfigured && (
                      <dd className="mt-1 text-xs text-[#202020]/55 dark:text-white/55">
                        {COMPANY_CONTACT.email.placeholderNotice}
                      </dd>
                    )}
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#1a1a1a]">
                    <MapPin className="h-4 w-4 text-[#541C2B] dark:text-[#C5A46D]" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-[#202020] dark:text-white">
                      Office Location
                    </dt>
                    <dd className="mt-1 text-sm text-[#202020]/80 dark:text-white/80">
                      {COMPANY_CONTACT.officeLocation.value}
                    </dd>
                    {!COMPANY_CONTACT.officeLocation.isConfigured && (
                      <dd className="mt-1 text-xs text-[#202020]/55 dark:text-white/55">
                        {COMPANY_CONTACT.officeLocation.placeholderNotice}
                      </dd>
                    )}
                  </div>
                </div>

                {/* Social Media & TikTok */}
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#1a1a1a]">
                    <Share2 className="h-4 w-4 text-[#541C2B] dark:text-[#C5A46D]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <dt className="text-xs font-semibold text-[#202020] dark:text-white">
                      TikTok &amp; Social Media Links
                    </dt>
                    <dd className="mt-2 space-y-2">
                      {COMPANY_CONTACT.additionalSocials.map((social) => (
                        <div
                          key={social.platform}
                          className="flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-medium text-[#202020]/80 dark:text-white/80">
                            {social.platform}
                          </span>
                          {social.url ? (
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-[#541C2B] hover:underline dark:text-[#C5A46D]"
                            >
                              <span>{social.status}</span>
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          ) : (
                            <span className="text-[#202020]/55 dark:text-white/55">
                              {social.status}
                            </span>
                          )}
                        </div>
                      ))}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-[#541C2B]/10 dark:border-white/10 pt-5">
              <a
                href={COMPANY_CONTACT.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-md border border-[#541C2B]/20 bg-[#FAF8F4] px-4 py-2.5 text-xs font-semibold text-[#541C2B] hover:border-[#C5A46D] dark:border-[#C5A46D]/35 dark:bg-[#1a1a1a] dark:text-[#C5A46D] transition-colors"
              >
                <span>Follow {COMPANY_CONTACT.tiktok.handle} on TikTok</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.aside>

          {/* Validated Event Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] p-7 sm:p-8"
          >
            {submitState === 'success' && submittedSnapshot ? (
              <div
                role="status"
                aria-live="polite"
                className="flex h-full flex-col justify-center py-6"
              >
                <div className="flex items-center gap-3 text-[#541C2B] dark:text-[#C5A46D]">
                  <CheckCircle2 className="h-7 w-7 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#202020] dark:text-white">
                    Event Inquiry Recorded
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#202020]/80 dark:text-white/80">
                  Thank you, <span className="font-semibold">{submittedSnapshot.fullName}</span>.
                  Your consultation request for{' '}
                  <span className="font-semibold">{submittedSnapshot.eventType}</span> on{' '}
                  <span className="font-semibold tabular-nums">
                    {submittedSnapshot.preferredDate}
                  </span>{' '}
                  has been validated and prepared.
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#1a1a1a] p-5 text-xs sm:grid-cols-2">
                  <div>
                    <dt className="text-[#202020]/60 dark:text-white/60">Email</dt>
                    <dd className="mt-0.5 font-medium text-[#202020] dark:text-white">
                      {submittedSnapshot.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#202020]/60 dark:text-white/60">Phone</dt>
                    <dd className="mt-0.5 font-medium text-[#202020] dark:text-white tabular-nums">
                      {submittedSnapshot.phoneNumber}
                    </dd>
                  </div>
                </dl>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitState('idle');
                      setSubmittedSnapshot(null);
                    }}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[#541C2B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#3f1420] dark:bg-[#C5A46D] dark:text-[#151515] dark:hover:bg-[#d4b681] transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-[#541C2B]/10 dark:border-white/10 pb-4">
                  <h3 className="font-display text-2xl font-semibold text-[#202020] dark:text-white">
                    Request an Event Consultation
                  </h3>
                  <p className="mt-1 text-xs text-[#202020]/65 dark:text-white/65">
                    All fields marked are required for tailored scheduling and concept preparation.
                  </p>
                </div>

                {submitState === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-md border border-[#9e2a2b]/40 bg-[#9e2a2b]/8 dark:bg-[#9e2a2b]/20 p-4 text-xs text-[#7f1d1d] dark:text-[#fecaca]"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">Please review the highlighted fields below.</p>
                      <p className="mt-0.5">
                        Ensure your name, phone number, valid email address, event type, upcoming
                        date, and message are filled out accurately.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="contact-fullName"
                      className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      className={`${inputBaseClass} ${
                        errors.fullName
                          ? 'border-[#b91c1c] dark:border-[#f87171]'
                          : 'border-[#541C2B]/20 dark:border-white/15'
                      }`}
                    />
                    {errors.fullName && (
                      <p
                        id="error-fullName"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="contact-phoneNumber"
                      className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      value={values.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="Enter your contact number"
                      aria-invalid={Boolean(errors.phoneNumber)}
                      aria-describedby={errors.phoneNumber ? 'error-phoneNumber' : undefined}
                      className={`${inputBaseClass} ${
                        errors.phoneNumber
                          ? 'border-[#b91c1c] dark:border-[#f87171]'
                          : 'border-[#541C2B]/20 dark:border-white/15'
                      }`}
                    />
                    {errors.phoneNumber && (
                      <p
                        id="error-phoneNumber"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`${inputBaseClass} ${
                        errors.email
                          ? 'border-[#b91c1c] dark:border-[#f87171]'
                          : 'border-[#541C2B]/20 dark:border-white/15'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Preferred Event Date */}
                  <div>
                    <label
                      htmlFor="contact-preferredDate"
                      className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                    >
                      Preferred Event Date
                    </label>
                    <input
                      id="contact-preferredDate"
                      name="preferredDate"
                      type="date"
                      value={values.preferredDate}
                      onChange={(e) => handleChange('preferredDate', e.target.value)}
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={errors.preferredDate ? 'error-preferredDate' : undefined}
                      className={`${inputBaseClass} tabular-nums ${
                        errors.preferredDate
                          ? 'border-[#b91c1c] dark:border-[#f87171]'
                          : 'border-[#541C2B]/20 dark:border-white/15'
                      }`}
                    />
                    {errors.preferredDate && (
                      <p
                        id="error-preferredDate"
                        className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <label
                    htmlFor="contact-eventType"
                    className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                  >
                    Event Type
                  </label>
                  <select
                    id="contact-eventType"
                    name="eventType"
                    value={values.eventType}
                    onChange={(e) => handleChange('eventType', e.target.value)}
                    aria-invalid={Boolean(errors.eventType)}
                    aria-describedby={errors.eventType ? 'error-eventType' : undefined}
                    className={`${inputBaseClass} ${
                      errors.eventType
                        ? 'border-[#b91c1c] dark:border-[#f87171]'
                        : 'border-[#541C2B]/20 dark:border-white/15'
                    }`}
                  >
                    <option value="">Select an event or service type</option>
                    {SERVICES.map((service) => (
                      <option key={service.number} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Custom Celebration / Other">Custom Celebration / Other</option>
                  </select>
                  {errors.eventType && (
                    <p
                      id="error-eventType"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.eventType}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#202020] dark:text-white mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Share your venue ideas, estimated guest count, preferred colors, or special requirements..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={`${inputBaseClass} resize-y ${
                      errors.message
                        ? 'border-[#b91c1c] dark:border-[#f87171]'
                        : 'border-[#541C2B]/20 dark:border-white/15'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      className="mt-1.5 flex items-center gap-1.5 text-xs text-[#b91c1c] dark:text-[#fca5a5]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="group inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2.5 rounded-md bg-[#541C2B] px-7 py-3 text-sm font-semibold text-white hover:bg-[#3f1420] dark:bg-[#C5A46D] dark:text-[#151515] dark:hover:bg-[#d4b681] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
                  >
                    <span>Send Event Inquiry</span>
                    <Send
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
