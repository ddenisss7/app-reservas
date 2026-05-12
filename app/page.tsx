"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createClient } from "./utils/supabase";

/* ── Stats ─────────────────────────────────────────────────── */
const stats = [
  { number: "300M+", label: "Usuarios activos" },
  { number: "4.9★",  label: "Valoración media" },
  { number: "12K",   label: "Restaurantes" },
  { number: "98%",   label: "Clientes satisfechos" },
];

/* ── Slider cards ───────────────────────────────────────────── */
const slides = [
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80", title: "Cocina de Autor",  sub: "Experiencias únicas en Madrid" },
  { img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80", title: "Ambiente Premium", sub: "Espacios diseñados para el recuerdo" },
  { img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80", title: "Gastronomía Local", sub: "Lo mejor de cada región" },
  { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=700&q=80", title: "Carta Exclusiva",  sub: "Menús de temporada renovados" },
  { img: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=700&q=80", title: "Mesa Perfecta",     sub: "Tu reserva en segundos" },
];

/* ── IntersectionObserver hook ──────────────────────────────── */
function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return v;
}

/* ── Slider ─────────────────────────────────────────────────── */
function ImageSlider() {
  const [idx, setIdx] = useState(0);
  const visibleCards = typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3;
  const max = Math.max(0, slides.length - visibleCards);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i >= max ? 0 : i + 1)), 4500);
    return () => clearInterval(t);
  }, [max]);

  const cardW = 100 / visibleCards;
  const gapRem = 1.25;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="slider-track"
          style={{ transform: `translateX(calc(-${idx * cardW}% - ${idx * gapRem}rem))` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="slider-card rounded-2xl overflow-hidden relative group cursor-pointer">
              <img
                src={s.img}
                alt={s.title}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                style={{ height: "26rem" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="font-bold text-lg leading-tight mb-1" style={{ fontFamily: "var(--font-display)" }}>{s.title}</p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {idx > 0 && (
        <button
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
          style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px var(--accent-glow)" }}
        >‹</button>
      )}
      {idx < max && (
        <button
          onClick={() => setIdx(i => Math.min(max, i + 1))}
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold transition-all hover:scale-110"
          style={{ background: "var(--accent)", color: "#fff", boxShadow: "0 4px 20px var(--accent-glow)" }}
        >›</button>
      )}

      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === idx ? "1.8rem" : "0.45rem",
              height: "0.45rem",
              background: i === idx ? "var(--accent-lit)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Stats + Slider section ─────────────────────────────────── */
function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVisible(ref as React.RefObject<HTMLElement | null>);

  return (
    <section
      ref={ref}
      className="w-full"
      style={{
        background: "var(--bg2)",
        paddingTop: "7rem",
        paddingBottom: "7rem",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <p className="text-xs uppercase tracking-[0.3em] font-medium mb-5 text-gold">
          ✦ Cifras que lo dicen todo ✦
        </p>

        <h2
          className="font-bold leading-tight mb-14"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          La plataforma en la que{" "}
          <span style={{ color: "var(--accent-lit)" }}>confía</span> España
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20" style={{padding: "1rem"}}>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="text-center rounded-2xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "2.5rem",
                animation: visible ? `countUp 0.7s ${i * 0.13}s ease both` : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              <p
                className="font-black leading-none mb-3"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  color: "var(--accent-lit)",
                }}
              >
                {s.number}
              </p>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
          <ImageSlider />
        </div>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Home() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    checkUser();
  }, [supabase.auth]);

  return (
    <div className="flex flex-col w-full">

      {/* ══ 1. HERO BANNER ══════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(520px, 82vh, 600px)" }}
      >
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1800&q=85"
          alt="Salón de restaurante"
          className="absolute inset-0 w-full h-full object-cover anim-fade"
          style={{ objectPosition: "center 35%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(5,3,2,0.3) 0%, rgba(5,3,2,0.55) 50%, rgba(5,3,2,0.92) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(5,3,2,0.6) 0%, transparent 55%)" }}
        />

        <div className="relative z-10 h-full flex flex-col justify-center px-10 lg:px-28" style={{ maxWidth: "56rem", padding: "2.3rem" }}>
          <p className="anim-1 text-xs uppercase tracking-[0.35em] font-medium mb-6" style={{ color: "var(--gold)" }}>
            ✦ {user ? `Hola de nuevo, ${user.email.split('@')[0]}` : 'Bienvenido a GourmetReserve'} ✦
          </p>
          <h1
            className="anim-2 font-black text-white leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              letterSpacing: "-0.03em"
            }}
          >
            La mesa perfecta,<br />
            <span
              className="text-shimmer-heavy"
              style={{ fontStyle: "italic", display: "inline-block" }}
            >
              cuando tú quieras
            </span>
          </h1>
          <p
            className="anim-3 leading-relaxed max-w-lg"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", marginTop: "1.75rem" }}
          >
            Descubre, compara y reserva en los mejores restaurantes de la ciudad — en segundos.
          </p>
          <div className="anim-4 flex gap-4 flex-wrap" style={{ marginTop: "2.5rem" }}>
            <Link
              href="/restaurantes"
              className="font-semibold rounded text-white text-sm tracking-wide transition-all hover:-translate-y-px hover:brightness-110"
              style={{ background: "var(--accent)", boxShadow: "0 6px 24px var(--accent-glow)", padding: "0.9rem 2.5rem" }}
            >
              Explorar Restaurantes →
            </Link>
            <Link
              href={user ? "/reservas" : "/login"}
              className="font-medium rounded text-white text-sm tracking-wide transition-all hover:-translate-y-px"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", padding: "0.9rem 2.5rem" }}
            >
              {user ? "Mis Reservas" : "Iniciar Sesión"}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[80px]"
            style={{ fill: "var(--bg)" }}
          >
            <path d="M0,0 L40,20 L80,5 L120,25 L160,10 L200,30 L240,15 L280,35 L320,20 L360,40 L400,25 L440,45 L480,30 L520,50 L560,35 L600,55 L640,40 L680,60 L720,45 L760,65 L800,50 L840,70 L880,55 L920,75 L960,60 L1000,80 L1040,65 L1080,85 L1120,70 L1160,90 L1200,75 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ══ 2. NUESTRA MISIÓN ═══════════════════════════════════ */}
      <section
        className="w-full px-8 lg:px-24"
        style={{ background: "var(--bg)", padding: "4rem 6rem" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-center text-center mx-auto max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] font-medium mb-6 text-gold">
              ✦ Nuestra misión ✦
            </p>
            <h2
              className="font-black leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.8rem)", letterSpacing: "-0.02em" }}
            >
              Encuentra el restaurante{" "}
              <span style={{ color: "var(--accent-lit)", borderBottom: "3px solid rgba(225,29,72,0.35)", paddingBottom: "3px" }}>
                ideal
              </span>{" "}
              para cada momento
            </h2>
            <p
              className="leading-relaxed"
              style={{
                color: "var(--muted)",
                fontSize: "1.05rem",
                marginTop: "1.75rem",
                maxWidth: "30rem",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Te presentamos los mejores locales de tu ciudad — tú eliges, nosotros gestionamos la reserva. Sin complicaciones, sin colas, sin llamadas.
            </p>
            <Link
              href="/restaurantes"
              className="inline-block font-semibold rounded text-white text-sm tracking-wide transition-all hover:-translate-y-px hover:brightness-110 mt-8"
              style={{ background: "var(--accent)", boxShadow: "0 6px 24px var(--accent-glow)", padding: "0.85rem 2.2rem" }}
            >
              Explorar ahora →
            </Link>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-3 rounded-3xl opacity-30 blur-2xl"
              style={{ background: "var(--accent)" }}
            />
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
              alt="Restaurante de ambiente"
              className="relative rounded-2xl w-full object-cover"
              style={{ height: "420px", border: "1px solid rgba(255,255,255,0.08)" }}
            />
            <div
              className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "rgba(10,7,5,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-2xl">⭐</span>
              <div>
                <p className="text-white text-sm font-semibold">Más de 12.000 locales</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>Valorados por usuarios reales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. CÓMO FUNCIONA ════════════════════════════════════ */}
      <section
        className="w-full flex justify-center px-6 lg:px-20"
        style={{ background: "var(--bg3)", padding: "9rem 0" }}
      >
        <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto" }}>
          
          <div className="text-center mb-24">
            <p className="text-xs uppercase tracking-[0.3em] font-medium mb-6 text-gold">✦ Cómo funciona ✦</p>
            <h3
              className="font-bold leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.5rem)" }}
            >
              De la búsqueda a la mesa<br />en tres pasos
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            <div className="flex flex-col" style={{ gap: "2rem" }}>
              {[
                ["01", "Explora nuestra selección", "Filtra por cocina, precio, ubicación o valoración y encuentra el restaurante que encaja."],
                ["02", "Elige fecha y hora", "Comprueba disponibilidad en tiempo real y selecciona el horario que mejor te va."],
                ["03", "Confirma tu reserva", "Recibirás una confirmación instantánea. Sin llamadas, sin esperas, sin complicaciones."],
              ].map(([n, t, d]) => (
                <div key={n} className="flex gap-7 items-start" style={{ minHeight: "160px" }}>
                  <span
                    className="font-black text-6xl leading-none flex-shrink-0"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--accent-lit)",
                      opacity: 0.25,
                      marginTop: "-5px"
                    }}
                  >{n}</span>
                  <div className="pt-2">
                    <p className="font-semibold text-white mb-3 text-lg">{t}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col" style={{ gap: "2rem" }}>
              {[
                { t: "Perfil de Cliente", d: "Gestione sus preferencias y acceda al historial de sus visitas culinarias de manera confidencial." },
                { t: "Selección de Locales", d: "Cuidada selección con disponibilidad actualizada en tiempo real." },
                { t: "Disposición de Mesas", d: "Garantizamos el espacio ideal, desde cenas íntimas hasta eventos grupales." },
              ].map((f, idx) => (
                <div
                  key={f.t}
                  className="flex gap-6 items-center rounded-2xl transition-all hover:scale-[1.02]"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "2rem",
                    minHeight: "160px"
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(159,18,57,0.2) 0%, rgba(159,18,57,0.05) 100%)",
                      border: "1px solid rgba(159,18,57,0.2)",
                      color: "var(--accent-lit)",
                      fontFamily: "var(--font-display)"
                    }}
                  >
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-2 text-base" style={{ fontFamily: "var(--font-display)" }}>{f.t}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ 4. STATS + SLIDER ═══════════════════════════════════ */}
      <StatsSection />

      {/* ══ 5. CTA FINAL ════════════════════════════════════════ */}
      <section
        className="w-full text-center px-6"
        style={{
          background: "linear-gradient(135deg, #0a0705 0%, #4c0519 50%, #0a0705 100%)",
          borderTop: "1px solid rgba(159,18,57,0.3)",
          padding: "7rem 1.5rem",
        }}
      >
        <p className="text-xs uppercase tracking-[0.3em] font-medium mb-5" style={{ color: "var(--gold)" }}>
          Sin comisiones. Sin sorpresas.
        </p>
        <h2
          className="font-black leading-tight text-shimmer mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,3.5rem)"
          }}
        >
          ¿Listo para reservar<br />tu próxima velada?
        </h2>
        <Link
          href="/restaurantes"
          className="inline-block font-semibold rounded text-white text-sm tracking-wide transition-all hover:-translate-y-px hover:brightness-110"
          style={{ background: "var(--accent)", boxShadow: "0 6px 30px var(--accent-glow)", padding: "1rem 3rem" }}
        >
          Ver Restaurantes →
        </Link>
      </section>

    </div>
  );
}
