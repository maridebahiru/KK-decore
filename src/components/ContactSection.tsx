import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CalendarHeart,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
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

const TikTokGlyph: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const FloatingMobileBookButton: React.FC = () => {
  const [hideOnContact, setHideOnContact] = useState(false);

  useEffect(() => {
    const contactEl = document.getElementById('contact');
    if (!contactEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideOnContact(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(contactEl);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {!hideOnContact && (
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.22 }}
          className="kk-shimmer-btn md:hidden fixed bottom-4 left-4 z-40 inline-flex min-h-[44px] items-center gap-2 border border-[#C5A46D] bg-[#541C2B] px-4 py-2.5 text-xs font-semibold text-[#FAF8F4] shadow-xl backdrop-blur-md whitespace-nowrap"
          style={{ borderRadius: 'var(--radius-btn)' }}
        >
          <CalendarHeart className="h-4 w-4 text-[#C5A46D]" aria-hidden="true" />
          <span>Book Now</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export const ContactSection: React.FC = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'error' | 'success'>('idle');
  const [submittedSnapshot, setSubmittedSnapshot] = useState<FormValues | null>(null);

  const validate = (data: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      nextErrors.fullName = 'Enter your name.';
    }

    const digitsOnly = data.phoneNumber.replace(/[^\d]/g, '');
    if (!data.phoneNumber.trim() || digitsOnly.length < 7) {
      nextErrors.phoneNumber = 'Enter a valid phone.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim() || !emailRegex.test(data.email.trim())) {
      nextErrors.email = 'Enter a valid email.';
    }

    if (!data.eventType.trim()) {
      nextErrors.eventType = 'Select event type.';
    }

    if (!data.preferredDate.trim()) {
      nextErrors.preferredDate = 'Select an upcoming date.';
    } else {
      const selected = new Date(data.preferredDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        nextErrors.preferredDate = 'Date must be upcoming.';
      }
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
      nextErrors.message = 'Add 10+ characters.';
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormValues, value: string) => {
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
    'w-full min-h-[44px] border bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--accent)]';

  return (
    <section
      id="contact"
      className="kk-section bg-[var(--surface)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Contact"
          title="Get In Touch"
          className="max-w-lg"
        />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Studio Channels + WhatsApp / Telegram / TikTok Icon Buttons */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 min-w-0 flex flex-col justify-between border border-[var(--border-strong)] bg-[var(--bg)]/85 backdrop-blur-md p-6 sm:p-8 shadow-[var(--shadow)]"
            style={{ borderRadius: 'var(--radius)' }}
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-[var(--accent)]">
                Studio Direct
              </h3>

              <dl className="mt-7 space-y-5">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)]"
                    style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                  >
                    <Phone className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-[var(--text)]">Phone</dt>
                    <dd className="text-sm text-[var(--text-muted)]">{COMPANY_CONTACT.phone}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)]"
                    style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                  >
                    <Mail className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-[var(--text)]">Email</dt>
                    <dd className="text-sm text-[var(--text-muted)]">{COMPANY_CONTACT.email}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)]"
                    style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                  >
                    <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <dt className="text-xs font-semibold text-[var(--text)]">Studio</dt>
                    <dd className="text-sm text-[var(--text-muted)]">{COMPANY_CONTACT.studio}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* WhatsApp / Telegram / TikTok Icon Action Bar */}
            <div className="mt-8 border-t border-[var(--border)] pt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Connect
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {COMPANY_CONTACT.channels.map((ch) => (
                  <motion.a
                    key={ch.id}
                    href={ch.href}
                    target={ch.external ? '_blank' : undefined}
                    rel={ch.external ? 'noopener noreferrer' : undefined}
                    whileTap={{ scale: 0.96 }}
                    aria-label={ch.label}
                    className="kk-shimmer-btn inline-flex min-h-[44px] items-center justify-center gap-2 border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--accent)] hover:border-[var(--accent)] transition-colors whitespace-nowrap"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    {ch.id === 'whatsapp' && (
                      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {ch.id === 'telegram' && (
                      <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                    )}
                    {ch.id === 'tiktok' && (
                      <TikTokGlyph className="h-4 w-4 shrink-0" />
                    )}
                    <span>{ch.label}</span>
                    {ch.external && <ExternalLink className="h-3 w-3 shrink-0 opacity-65" aria-hidden="true" />}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Short Consultation Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 min-w-0 border border-[var(--border-strong)] bg-[var(--bg)]/85 backdrop-blur-md p-6 sm:p-8 shadow-[var(--shadow)]"
            style={{ borderRadius: 'var(--radius)' }}
          >
            {submitState === 'success' && submittedSnapshot ? (
              <div
                role="status"
                aria-live="polite"
                className="flex h-full flex-col justify-center py-6"
              >
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <CheckCircle2 className="h-7 w-7 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
                    Inquiry Recorded
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  Thank you, <span className="font-semibold text-[var(--text)]">{submittedSnapshot.fullName}</span>.
                  Your <span className="font-semibold text-[var(--text)]">{submittedSnapshot.eventType}</span> request
                  for <span className="font-semibold text-[var(--text)] tabular-nums">{submittedSnapshot.preferredDate}</span> is prepared.
                </p>

                <div className="mt-6">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSubmitState('idle');
                      setSubmittedSnapshot(null);
                    }}
                    className="kk-shimmer-btn inline-flex min-h-[44px] items-center justify-center bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--accent-text)] hover:opacity-90 transition-opacity cursor-pointer"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    New Inquiry
                  </motion.button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="border-b border-[var(--border)] pb-3">
                  <h3 className="font-display text-2xl font-semibold text-[var(--text)]">
                    Book Consultation
                  </h3>
                </div>

                {submitState === 'error' && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 border border-red-700/40 bg-red-700/10 dark:border-red-400/40 dark:bg-red-950/40 p-3.5 text-xs text-red-900 dark:text-red-200"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="font-medium">Please check highlighted fields.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-fullName"
                      className="block text-xs font-semibold text-[var(--text)] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="contact-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      placeholder="Full name"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-fullName' : undefined}
                      className={`${inputBaseClass} ${
                        errors.fullName
                          ? 'border-red-700 dark:border-red-400'
                          : 'border-[var(--border)] focus:border-[var(--accent)]'
                      }`}
                      style={{ borderRadius: 'var(--radius-btn)' }}
                    />
                    {errors.fullName && (
                      <p
                        id="error-fullName"
                        className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phoneNumber"
                      className="block text-xs font-semibold text-[var(--text)] mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="contact-phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      value={values.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      placeholder="Phone number"
                      aria-invalid={Boolean(errors.phoneNumber)}
                      aria-describedby={errors.phoneNumber ? 'error-phoneNumber' : undefined}
                      className={`${inputBaseClass} ${
                        errors.phoneNumber
                          ? 'border-red-700 dark:border-red-400'
                          : 'border-[var(--border)] focus:border-[var(--accent)]'
                      }`}
                      style={{ borderRadius: 'var(--radius-btn)' }}
                    />
                    {errors.phoneNumber && (
                      <p
                        id="error-phoneNumber"
                        className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[var(--text)] mb-1.5"
                    >
                      Email
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
                          ? 'border-red-700 dark:border-red-400'
                          : 'border-[var(--border)] focus:border-[var(--accent)]'
                      }`}
                      style={{ borderRadius: 'var(--radius-btn)' }}
                    />
                    {errors.email && (
                      <p
                        id="error-email"
                        className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-preferredDate"
                      className="block text-xs font-semibold text-[var(--text)] mb-1.5"
                    >
                      Date
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
                          ? 'border-red-700 dark:border-red-400'
                          : 'border-[var(--border)] focus:border-[var(--accent)]'
                      }`}
                      style={{ borderRadius: 'var(--radius-btn)' }}
                    />
                    {errors.preferredDate && (
                      <p
                        id="error-preferredDate"
                        className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-eventType"
                    className="block text-xs font-semibold text-[var(--text)] mb-1.5"
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
                        ? 'border-red-700 dark:border-red-400'
                        : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    <option value="">Select event type</option>
                    {SERVICES.map((service) => (
                      <option key={service.number} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p
                      id="error-eventType"
                      className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.eventType}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[var(--text)] mb-1.5"
                  >
                    Notes
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Venue and guest count..."
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-message' : undefined}
                    className={`${inputBaseClass} resize-y ${
                      errors.message
                        ? 'border-red-700 dark:border-red-400'
                        : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  />
                  {errors.message && (
                    <p
                      id="error-message"
                      className="mt-1 flex items-center gap-1 text-xs text-red-700 dark:text-red-300"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-1">
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="kk-shimmer-btn group inline-flex min-h-[46px] w-full sm:w-auto items-center justify-center gap-2.5 bg-[var(--accent)] px-7 py-3 text-sm font-semibold text-[var(--accent-text)] shadow-[var(--shadow)] hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    <span>Send Inquiry</span>
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
