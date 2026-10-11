import Link from "next/link";

import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-label">
            SECURE AUTH
          </span>

          <h1>Nueva contraseña</h1>

          <p>
            Crea una nueva contraseña segura para tu
            cuenta.
          </p>
        </div>

        <ResetPasswordForm />

        <div className="auth-footer">
          <span>¿Quieres volver?</span>

          <Link href="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
} 