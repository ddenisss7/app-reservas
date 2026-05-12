"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

        const { error } = await supabase.auth.signUp({
    email,
    password
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      alert("¡Registro con éxito! Revisa tu correo si tienes activa la confirmación.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--bg)", 
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
          marginBottom: "0.5rem",
          textAlign: "center" 
        }}>Crear <span style={{color: "var(--accent-lit)"}}>Cuenta</span></h2>
        
        <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          Únete a la experiencia GourmetReserve
        </p>

        {errorMsg && (
          <div style={{ color: "#ff4b4b", backgroundColor: "rgba(255,75,75,0.1)", padding: "0.8rem", borderRadius: "0.5rem", marginBottom: "1rem", fontSize: "0.85rem", border: "1px solid rgba(255,75,75,0.2)" }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ color: "var(--muted)", fontSize: "0.8rem", marginLeft: "0.2rem" }}>Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
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
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ color: "var(--muted)", fontSize: "0.8rem", marginLeft: "0.2rem" }}>Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
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
          </div>

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
              boxShadow: "0 4px 15px var(--accent-glow)",
              marginTop: "0.5rem"
            }}
          >
            {loading ? "Creando cuenta..." : "Registrarse Ahora"}
          </button>
        </form>
        
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "1.5rem", textAlign: "center" }}>
          ¿Ya tienes cuenta? <Link href="/login" style={{ color: "var(--gold)" }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}