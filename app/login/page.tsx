import Link from "next/link";

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-label">
            SECURE AUTH
          </span>

          <h1>Iniciar sesión</h1>

          <p>
            Ingresa a tu cuenta para continuar.
          </p>
        </div>

        <LoginForm />

        <div className="auth-footer">
          <span>¿No tienes una cuenta?</span>

          <Link href="/register">
            Crear cuenta
          </Link>
        </div>
      </div>
    </main>
  );
} 