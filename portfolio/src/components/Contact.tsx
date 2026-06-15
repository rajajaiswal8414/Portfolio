import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) {
      tempErrors.name = 'Name is required.';
    } else if (form.name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters.';
    }
    
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }

    if (!form.subject.trim()) {
      tempErrors.subject = 'Subject is required.';
    } else if (form.subject.trim().length < 3) {
      tempErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!form.message.trim()) {
      tempErrors.message = 'Message cannot be empty.';
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccessModal(true);
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setIsSubmitting(false);
        // If Spring Boot returns bean validation errors, map them
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setApiError(data.message || 'Failed to send message. Please try again.');
        }
      }
    } catch (err) {
      setIsSubmitting(false);
      setApiError('Unable to connect to the contact backend server. Please verify the backend service is running.');
      console.error('Contact Form Error:', err);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-violet-600 to-cyan-400 mx-auto mt-4 rounded-full origin-center"
          />
          <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
            Have a project in mind, an opportunity, or just want to discuss software engineering? Let's connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                Contact Information
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Feel free to email me directly or drop a message via the form. I typically respond within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/40 flex items-center justify-center text-violet-500 shrink-0">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Direct Email
                  </span>
                  <a
                    href="mailto:rajajaiswal8414@gmail.com"
                    className="text-slate-800 dark:text-slate-200 font-bold hover:text-violet-500 transition-colors"
                  >
                    rajajaiswal8414@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/40 flex items-center justify-center text-cyan-500 shrink-0">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Current Location
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">
                    Pune, Maharashtra, India
                  </span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Follow My Work
              </span>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/rajajaiswal8414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:text-violet-500 dark:hover:text-violet-400 hover:shadow-md transition-all"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/raja-jaiswal-263aa2250/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:text-violet-500 dark:hover:text-violet-400 hover:shadow-md transition-all"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphic Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 shadow-xl flex flex-col space-y-5"
            >
              {/* API Error Message Banner */}
              {apiError && (
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-450 text-sm font-semibold flex items-center space-x-2.5">
                  <FiAlertCircle className="w-5 h-5 shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <FiAlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                  )}
                </div>
                {errors.name && <span className="text-red-500 text-xs font-semibold">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <FiAlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                  )}
                </div>
                {errors.email && <span className="text-red-500 text-xs font-semibold">{errors.email}</span>}
              </div>

              {/* Subject */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Subject
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      errors.subject ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="What is this inquiry about?"
                  />
                  {errors.subject && (
                    <FiAlertCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 text-red-500 w-4 h-4" />
                  )}
                </div>
                {errors.subject && <span className="text-red-500 text-xs font-semibold">{errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Your Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-violet-500/50 transition-all ${
                      errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Describe your project, ideas, or questions..."
                  />
                </div>
                {errors.message && (
                  <span className="text-red-500 text-xs font-semibold">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 disabled:from-slate-400 disabled:to-slate-500 text-white flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative p-8 rounded-3xl glass-premium border border-slate-200/50 dark:border-slate-800/80 shadow-2xl max-w-sm w-full text-center flex flex-col items-center"
            >
              {/* Checkmark icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 flex items-center justify-center text-emerald-500 mb-6 shadow-md shadow-emerald-500/10">
                <FiCheckCircle className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-extrabold text-slate-800 dark:text-white">
                Message Sent!
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                Thank you for reaching out, Raja Jaiswal will get in touch with you shortly.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 w-full py-2.5 rounded-xl text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
