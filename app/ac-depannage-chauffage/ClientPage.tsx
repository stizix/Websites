"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Phone,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Star,
  ArrowRight,
  MessageSquare,
  Clock,
  Shield,
  Award,
  Sparkles,
  Menu,
  X,
  Camera,
} from "lucide-react";

/* ─── Template Variables ─── */
const BUSINESS_NAME = "Ac dépannage chauffage";
const CITY = "Reims";
const PHONE_NUMBER = "06 32 90 13 70";
const PHONE_CLEAN = "+33632901370";
const WHATSAPP_LINK = "https://wa.me/33632901370";
const NICHE_LABEL = "Plombier";
const ADDRESS = "31 Rue du Chanoine Lallement, 51100 Reims, France";

/* ─── Niche-based image mapping ─── */
const NICHE_IMAGES: Record<string, { hero: string; gallery: string[] }> = {
  default: {
    hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    ],
  },
  plombier: {
    hero: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
    ],
  },
  electricien: {
    hero: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80&auto=format&fit=crop",
    ],
  },
  peintre: {
    hero: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80&auto=format&fit=crop",
    ],
  },
  architecte: {
    hero: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
    ],
  },
  couvreur: {
    hero: "https://images.unsplash.com/photo-1632759145351-1d592919f522?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80&auto=format&fit=crop",
    ],
  },
  menuisier: {
    hero: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80&auto=format&fit=crop",
    ],
  },
  jardinier: {
    hero: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557429287-b2e26467fc2b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80&auto=format&fit=crop",
    ],
  },
  maçon: {
    hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    ],
  },
  carreleur: {
    hero: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
    ],
  },
  chauffagiste: {
    hero: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1920&q=80&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80&auto=format&fit=crop",
    ],
  },
};

/* ─── Detect if phone is mobile (for WhatsApp availability) ─── */
function isMobileNumber() {
  const cleaned = PHONE_CLEAN.replace(/[\s.\-()]/g, "");
  const frMobile = /^\+33[67]\d{8}$/.test(cleaned);
  const ukMobile = /^\+447\d{9}$/.test(cleaned);
  return frMobile || ukMobile;
}

const HAS_WHATSAPP = isMobileNumber();

function getNicheImages() {
  const niche = NICHE_LABEL.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const key of Object.keys(NICHE_IMAGES)) {
    if (key === "default") continue;
    const normalizedKey = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (niche.includes(normalizedKey) || normalizedKey.includes(niche)) {
      return NICHE_IMAGES[key];
    }
  }
  return NICHE_IMAGES.default;
}

/* ─── Animated Counter ─── */
function Counter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const ms = 16;
        const steps = duration / ms;
        const step = end / steps;
        const timer = setInterval(() => {
          start += step;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, ms);
        observer.disconnect();
        return () => clearInterval(timer);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Scroll-triggered animation hook ─── */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ─── Page ─── */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    contact: "",
  });
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const images = getNicheImages();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formStep < 3) {
        setFormStep((s) => s + 1);
      } else {
        const message = `Bonjour, j'ai un projet : ${formData.description}. Lieu: ${formData.location}. Contact: ${formData.contact}`;
        if (HAS_WHATSAPP) {
          window.open(
            `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        } else {
          window.open(
            `sms:${PHONE_CLEAN}?body=${encodeURIComponent(message)}`,
            "_self"
          );
        }
      }
    },
    [formStep, formData]
  );

  const statsReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const servicesReveal = useScrollReveal();
  const whyUsReveal = useScrollReveal();
  const ctaReveal = useScrollReveal();

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-200">
      {/* ═══════════ NAVBAR ═══════════ */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled
                  ? "bg-slate-900 text-white"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <span
              className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-slate-900" : "text-white"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {BUSINESS_NAME}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["Réalisations", "Services", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${
                  scrolled ? "text-slate-600" : "text-white/80"
                }`}
              >
                {item}
              </a>
            ))}
            <a
              href={`tel:${PHONE_CLEAN}`}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-white/90"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE_NUMBER}
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {["Réalisations", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-base font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href={`tel:${PHONE_CLEAN}`}
                className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════ FLOATING CTA (mobile) ═══════════ */}
      {HAS_WHATSAPP ? (
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 md:hidden pulse-ring"
        >
          <MessageSquare className="w-6 h-6" />
        </a>
      ) : (
        <a
          href={`tel:${PHONE_CLEAN}`}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 md:hidden pulse-ring"
        >
          <Phone className="w-6 h-6" />
        </a>
      )}

      {/* ═══════════ HERO WITH BACKGROUND IMAGE ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.hero}
            alt={`${NICHE_LABEL} à ${CITY}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/80" />
        </div>

        {/* Subtle noise overlay */}
        <div className="absolute inset-0 noise pointer-events-none z-[2]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
          {/* Badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/80 text-xs font-semibold uppercase tracking-widest mb-8">
            <MapPin className="w-3.5 h-3.5 text-indigo-400" />
            {NICHE_LABEL} à {CITY}
          </div>

          {/* Title */}
          <h1 className="animate-fade-in-up delay-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Votre Expert{" "}
            <span className="shimmer-text">{NICHE_LABEL}</span>
            <br />
            <span className="text-white/60">à {CITY}</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-400 text-base sm:text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            {BUSINESS_NAME} — Un service professionnel et de qualité.
            Devis gratuit, intervention rapide et résultats garantis.
          </p>

          {/* CTA buttons */}
          <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:scale-[1.02]"
            >
              Devis Gratuit
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`tel:${PHONE_CLEAN}`}
              className="group inline-flex items-center justify-center gap-2.5 glass text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:bg-white/15"
            >
              <Phone className="w-4 h-4" />
              Nous Appeler
            </a>
          </div>

          {/* Trust badges */}
          <div className="animate-fade-in-up delay-800 mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30 text-xs font-medium uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Assuré & Garanti
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Réponse sous 24h
            </div>
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              5★ sur Google
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/30 animate-fade-in delay-800">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
            Défiler
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="relative -mt-1 z-20" ref={statsReveal.ref}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-10 -mt-12 transition-all duration-700 ${
              statsReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { value: 10, suffix: "+", label: "Ans d'Expérience" },
                { value: 200, suffix: "+", label: "Projets Réalisés" },
                { value: 100, suffix: "%", label: "Clients Satisfaits" },
                { value: 24, suffix: "h", label: "Temps de Réponse" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-1 tabular-nums">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-[0.15em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY / RÉALISATIONS ═══════════ */}
      <section
        id="réalisations"
        className="py-24 sm:py-32 bg-[#fafafa]"
        ref={galleryReveal.ref}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
              galleryReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Camera className="w-3 h-3" />
              Portfolio
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nos Réalisations
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Découvrez nos projets récents et laissez-vous inspirer par notre savoir-faire en {NICHE_LABEL}.
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {images.gallery.map((src, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  i === 0 ? "md:row-span-2" : ""
                } ${
                  galleryReveal.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "700ms",
                  transitionDelay: galleryReveal.isVisible
                    ? `${150 + i * 100}ms`
                    : "0ms",
                }}
                onClick={() => setLightboxImg(src.replace("w=800", "w=1600"))}
              >
                <div className={`relative ${i === 0 ? "aspect-[3/4] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
                  <img
                    src={src}
                    alt={`Réalisation ${NICHE_LABEL} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-semibold">{NICHE_LABEL}</p>
                    <p className="text-white/60 text-xs">{CITY}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in cursor-pointer"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={lightboxImg}
            alt="Réalisation en grand"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
          />
        </div>
      )}

      {/* ═══════════ SERVICES ═══════════ */}
      <section
        id="services"
        className="py-24 sm:py-32 bg-white"
        ref={servicesReveal.ref}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
              servicesReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3 h-3" />
              Nos Services
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Ce Que Nous Proposons
            </h2>
            <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
              Des prestations professionnelles adaptées à vos besoins, réalisées
              avec exigence et passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Award,
                title: "Service Premium",
                desc: "Nous utilisons les meilleurs matériaux et techniques pour un résultat irréprochable qui dure dans le temps.",
                features: [
                  "Matériaux de qualité",
                  "Techniques certifiées",
                  "Finitions soignées",
                ],
                img: images.gallery[0],
              },
              {
                icon: Shield,
                title: "Garantie & Assurance",
                desc: "Votre tranquillité est notre priorité. Tous nos travaux sont couverts par nos assurances professionnelles.",
                features: [
                  "Travail assuré",
                  "Devis transparent",
                  "Sans surprise",
                ],
                img: images.gallery[1],
              },
              {
                icon: Clock,
                title: "Réactivité",
                desc: "Nous nous engageons à répondre rapidement à vos demandes et à respecter les délais convenus.",
                features: [
                  "Réponse rapide",
                  "Respect des délais",
                  "Suivi personnalisé",
                ],
                img: images.gallery[2],
              },
            ].map((service, i) => (
              <div
                key={i}
                className={`group relative bg-[#fafafa] rounded-3xl overflow-hidden border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100/50 ${
                  servicesReveal.isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: servicesReveal.isVisible
                    ? `${200 + i * 150}ms`
                    : "0ms",
                }}
              >
                {/* Service image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <service.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                <div className="p-8 pt-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  <ul className="space-y-2.5">
                    {service.features.map((feat, j) => (
                      <li
                        key={j}
                        className="flex items-center text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 mr-2.5 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ WHY US ═══════════ */}
      <section
        id="pourquoi-nous"
        className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden"
        ref={whyUsReveal.ref}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={images.gallery[3]}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col lg:flex-row items-center gap-16 transition-all duration-700 ${
              whyUsReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold uppercase tracking-widest mb-4">
                  Pourquoi {BUSINESS_NAME}
                </div>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Faire le choix de{" "}
                  <span className="text-indigo-400">l&apos;excellence</span>
                </h2>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed">
                  Nous nous engageons à fournir un service de la plus haute
                  qualité. Chaque projet est unique et mérite une attention
                  particulière.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: "Expertise Locale",
                    desc: `Basés à ${CITY}, nous connaissons parfaitement les spécificités de la région.`,
                  },
                  {
                    title: "Devis Gratuit & Transparent",
                    desc: "Pas de surprises. Nous détaillons chaque poste pour une totale transparence.",
                  },
                  {
                    title: "Satisfaction Garantie",
                    desc: "Votre satisfaction est notre meilleure publicité. Nous ne partons pas avant votre approbation.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-white/40 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — testimonial + image */}
            <div className="w-full lg:w-1/2">
              {/* Image showcase */}
              <div className="relative rounded-3xl overflow-hidden mb-6">
                <img
                  src={images.gallery[4]}
                  alt={`${NICHE_LABEL} par ${BUSINESS_NAME}`}
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
              </div>

              {/* Testimonial card */}
              <div className="glass rounded-3xl p-8 relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-base font-medium text-white/90 leading-relaxed mb-6">
                  &ldquo;Un travail remarquable du début à la fin. L&apos;équipe
                  de {BUSINESS_NAME} est très professionnelle et à
                  l&apos;écoute. Je recommande sans hésitation !&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Marie C.</p>
                    <p className="text-white/40 text-xs">
                      Client à {CITY}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT / CTA ═══════════ */}
      <section
        id="contact"
        className="py-24 sm:py-32 bg-[#fafafa] relative"
        ref={ctaReveal.ref}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start transition-all duration-700 ${
              ctaReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left info */}
            <div className="w-full lg:w-5/12 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-4">
                  <MessageSquare className="w-3 h-3" />
                  Contact
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Démarrez Votre Projet
                </h2>
                <p className="text-slate-500 text-base leading-relaxed">
                  Obtenez un devis gratuit en quelques clics. Décrivez votre
                  projet et nous vous recontacterons sous 24h.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-100 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center transition-colors">
                    <Phone className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${PHONE_CLEAN}`}
                      className="font-bold text-slate-900 text-lg hover:text-indigo-600 transition-colors"
                    >
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-100 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center transition-colors">
                    <MapPin className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                      Localisation
                    </p>
                    <p className="font-bold text-slate-900 text-lg">
                      {CITY}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-100 group-hover:bg-indigo-100 rounded-2xl flex items-center justify-center transition-colors">
                    <Clock className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                      Disponibilité
                    </p>
                    <p className="font-bold text-slate-900 text-lg">Lun – Sam</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-50 to-transparent rounded-bl-full pointer-events-none" />

                <form
                  onSubmit={handleFormSubmit}
                  className="relative z-10 flex flex-col"
                >
                  {/* Progress */}
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
                      Étape {formStep}/3
                    </span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            step <= formStep
                              ? "w-8 bg-indigo-500"
                              : "w-4 bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {formStep === 1 && (
                    <div className="space-y-3 animate-fade-in-up">
                      <h4 className="text-xl font-bold text-slate-900">
                        Décrivez votre projet
                      </h4>
                      <p className="text-sm text-slate-400">
                        Dites-nous en quelques mots ce dont vous avez besoin.
                      </p>
                      <textarea
                        required
                        rows={4}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all resize-none"
                        placeholder="Ex: J'ai besoin d'un professionnel pour..."
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="space-y-3 animate-fade-in-up">
                      <h4 className="text-xl font-bold text-slate-900">
                        Votre localisation
                      </h4>
                      <p className="text-sm text-slate-400">
                        Où se situe le chantier / le lieu d&apos;intervention ?
                      </p>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                        placeholder={`Ex: ${CITY}`}
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  {formStep === 3 && (
                    <div className="space-y-3 animate-fade-in-up">
                      <h4 className="text-xl font-bold text-slate-900">
                        Vos coordonnées
                      </h4>
                      <p className="text-sm text-slate-400">
                        Comment pouvons-nous vous recontacter ?
                      </p>
                      <input
                        required
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                        placeholder="Téléphone ou Email"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                    {formStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setFormStep((s) => s - 1)}
                        className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                      >
                        ← Retour
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="group bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-indigo-200"
                    >
                      {formStep < 3 ? "Suivant" : HAS_WHATSAPP ? "Envoyer via WhatsApp" : "Envoyer par SMS"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <span
                className="text-xl font-bold mb-4 block"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {BUSINESS_NAME}
              </span>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Votre professionnel de confiance en {NICHE_LABEL} à{" "}
                {CITY}. Qualité, fiabilité et expertise.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
                Contact
              </h4>
              <div className="space-y-3 text-sm text-white/40">
                <p>{ADDRESS}</p>
                <p>{PHONE_NUMBER}</p>
                {HAS_WHATSAPP ? (
                  <a
                    href={WHATSAPP_LINK}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block"
                  >
                    WhatsApp →
                  </a>
                ) : (
                  <a
                    href={`tel:${PHONE_CLEAN}`}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block"
                  >
                    Appeler →
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
                Navigation
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Réalisations", href: "#réalisations" },
                  { label: "Services", href: "#services" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} {BUSINESS_NAME}. Tous droits
              réservés.
            </p>
            <div className="flex gap-6 text-xs text-white/30">
              <a href="#" className="hover:text-white/60 transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
