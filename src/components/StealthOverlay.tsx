import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, AlertCircle, KeyRound } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import Logo from "@/components/Logo";

const BLOCKED_DOMAINS = [
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.in", "yahoo.co.uk",
  "hotmail.com", "outlook.com", "live.com", "msn.com",
  "protonmail.com", "proton.me", "pm.me",
  "aol.com", "icloud.com", "me.com", "mac.com",
  "mail.com", "zoho.com", "yandex.com", "gmx.com", "gmx.net",
  "tutanota.com", "tutamail.com", "tuta.io",
  "fastmail.com", "hushmail.com", "inbox.com",
  "rediffmail.com", "qq.com", "163.com", "126.com",
];

const ACCESS_CODE = "NovaActa2023";

const StealthOverlay = () => {
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !designation.trim() || !accessCode.trim()) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (BLOCKED_DOMAINS.includes(domain)) {
      setError("Please use your organization email. Generic email providers are not accepted.");
      return;
    }

    if (accessCode !== ACCESS_CODE) {
      setError("Invalid access code. Contact NovaActa for authorization.");
      return;
    }

    setDismissed(true);
  };

  const inputClass =
    "w-full bg-transparent border border-accent/20 px-3 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-accent/60 transition-colors";

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          {/* Full-screen click blocker with dark overlay */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="relative z-10 max-w-md w-[90%] border border-accent/30 bg-card/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="p-8 md:p-10">
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <Logo className="w-12 h-12" />
              </div>

              {/* Wordmark */}
              <div className="flex justify-center mb-4">
                <Wordmark size="lg" />
              </div>

              {/* Stealth badge */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Lock className="w-3 h-3 text-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Stealth Mode
                </span>
              </div>

              <p className="font-body text-sm text-muted-foreground text-center leading-relaxed mb-5">
                Access is restricted to authorized personnel only. Enter your
                credentials and access code to continue.
              </p>

              <div className="rule mx-auto mb-5" />

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  maxLength={100}
                />
                <input
                  type="text"
                  placeholder="Designation / Title"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={inputClass}
                  maxLength={100}
                />
                <input
                  type="email"
                  placeholder="Organization Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  maxLength={255}
                />
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent/40" />
                  <input
                    type="password"
                    placeholder="Access Code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className={`${inputClass} pl-9`}
                    maxLength={50}
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-destructive">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="font-mono text-[10px] leading-relaxed">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full border border-accent/40 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Request Access
                </button>
              </form>

              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 text-center">
                Access code required · All content is under NDA
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StealthOverlay;
