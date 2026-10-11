import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";

export const instant = false;

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="dashboard-page">
      <div className="dashboard-card">
        <span className="dashboard-label">
          ÁREA PRIVADA
        </span>

        <h1>Bienvenida a tu Dashboard</h1>

        <p>
          Has iniciado sesión correctamente.
        </p>

        <div className="user-info">
          <span>Usuario autenticado</span>

          <strong>{user.email}</strong>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="auth-button"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </main>
  );
} 