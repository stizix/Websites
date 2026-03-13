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
} from "lucide-react";

/* ─── Template Variables ─── */
const BUSINESS_NAME = "Fit multiservices";
const CITY = "Brest";
const PHONE_NUMBER = "06 17 28 83 01";
const PHONE_CLEAN = "+33617288301";
const WHATSAPP_LINK = "https://wa.me/33617288301";
const NICHE_LABEL = "Architecte D'intérieur";
const ADDRESS = "1 Rue du Stiffelou, 29200 Brest, France";


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
        window.open(
          `${WHATSAPP_LINK}?text=${encodeURIComponent(
            `Bonjour, j'ai un projet : ${formData.description}. Lieu: ${formData.location}. Contact: ${formData.contact}`
          )}`,
          "_blank"
        );
      }
    },
    [formStep, formData]
  );

  const statsReveal = useScrollReveal();
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
            {["Services", "Pourquoi Nous", "Contact"].map((item) => (
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

          {/* Mobile menu toggle */}
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {["Services", "Pourquoi Nous", "Contact"].map((item) => (
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

      {/* ═══════════ FLOATING WHATSAPP CTA (mobile) ═══════════ */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 md:hidden pulse-ring"
      >
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh noise">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
          <div className="orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />
          <div className="orb-3 absolute top-1/2 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

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

      {/* ═══════════ SERVICES ═══════════ */}
      <section
        id="services"
        className="py-24 sm:py-32 bg-[#fafafa]"
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
              },
            ].map((service, i) => (
              <div
                key={i}
                className={`group relative bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 hover:border-indigo-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-100/50 ${
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
                {/* Hover gradient */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-indigo-100 flex items-center justify-center mb-6 transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" />
                  </div>

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
        className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden noise"
        ref={whyUsReveal.ref}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb-1 absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="orb-2 absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
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

            {/* Right card — testimonial */}
            <div className="w-full lg:w-1/2">
              <div className="glass rounded-3xl p-8 sm:p-10 relative">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl" />

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl font-medium text-white/90 leading-relaxed mb-8">
                  &ldquo;Un travail remarquable du début à la fin. L&apos;équipe
                  de {BUSINESS_NAME} est très professionnelle et à
                  l&apos;écoute. Je recommande sans hésitation !&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                    MC
                  </div>
                  <div>
                    <p className="font-semibold text-white">Marie C.</p>
                    <p className="text-white/40 text-sm">
                      Client à {CITY}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-2xl font-extrabold text-white mb-1">
                    4.9/5
                  </div>
                  <div className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                    Note Google
                  </div>
                </div>
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="text-2xl font-extrabold text-white mb-1">
                    98%
                  </div>
                  <div className="text-[11px] text-white/40 uppercase tracking-widest font-semibold">
                    Recommandation
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
                {/* Decorative gradient */}
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

                  {/* Step 1 */}
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

                  {/* Step 2 */}
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

                  {/* Step 3 */}
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

                  {/* Actions */}
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
                      {formStep < 3 ? "Suivant" : "Envoyer via WhatsApp"}
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
                <a
                  href={WHATSAPP_LINK}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors inline-block"
                >
                  WhatsApp →
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-4">
                Navigation
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Services", href: "#services" },
                  { label: "Pourquoi Nous", href: "#pourquoi-nous" },
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
