import Link from "next/link";

import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-label">
            SECURE AUTH
          </span>

          <h1>Recuperar contraseña</h1>

          <p>
            Ingresa tu email y te enviaremos instrucciones
            para recuperar tu contraseña.
          </p>
        </div>

        <ForgotPasswordForm />

        <div className="auth-footer">
          <span>¿Recordaste tu contraseña?</span>

          <Link href="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
} 