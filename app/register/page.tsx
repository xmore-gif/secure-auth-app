import Link from "next/link";

import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-label">
            SECURE AUTH
          </span>

          <h1>Crear cuenta</h1>

          <p>
            Regístrate para acceder a tu cuenta.
          </p>
        </div>

        <RegisterForm />

        <div className="auth-footer">
          <span>¿Ya tienes una cuenta?</span>

          <Link href="/login">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
} 