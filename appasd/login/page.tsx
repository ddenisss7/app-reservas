"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push("/"); // Si todo sale bien, vuelve a la Home
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--bg)", // Usa tus variables de CSS
      padding: "2rem" 
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", 
        padding: "2.5rem", 
        background: "var(--surface)", 
        borderRadius: "1rem", 
        border: "1px solid var(--border)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
      }}>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "2rem", 
          color: "white", 
          marginBottom: "1.5rem",
          textAlign: "center" 
        }}>Entrar a <span style={{color: "var(--accent-lit)"}}>Gourmet</span></h2>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              padding: "0.8rem", 
              borderRadius: "0.5rem", 
              background: "#1a1512", 
              border: "1px solid var(--border)", 
              color: "white" 
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              padding: "0.8rem", 
              borderRadius: "0.5rem", 
              background: "#1a1512", 
              border: "1px solid var(--border)", 
              color: "white" 
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ 
              padding: "0.9rem", 
              borderRadius: "0.5rem", 
              background: "var(--accent)", 
              color: "white", 
              fontWeight: "bold", 
              cursor: "pointer",
              border: "none",
              boxShadow: "0 4px 15px var(--accent-glow)"
            }}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "1.5rem", textAlign: "center" }}>
          ¿No tienes cuenta? <Link href="/registro" style={{ color: "var(--gold)" }}>Regístrate</Link>
        </p>
      </div>
    </div>
  );
}