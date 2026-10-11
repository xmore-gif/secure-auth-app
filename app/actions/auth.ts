"use server";

import { redirect } from "next/navigation";

import { isSameOriginRequest } from "@/lib/security";
import { createClient } from "@/lib/supabase/server";

type AuthResult = {
  error?: string;
  success?: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  return password.length >= 8;
}

/* =========================================
   SIGN UP
   ========================================= */

export async function signUp(
  _previousState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const sameOrigin = await isSameOriginRequest();

  if (!sameOrigin) {
    return {
      error: "Solicitud no autorizada.",
    };
  }

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!email || !password) {
    return {
      error: "Email y contraseña son obligatorios.",
    };
  }

  if (!validateEmail(email)) {
    return {
      error: "Ingresa un email válido.",
    };
  }

  if (!validatePassword(password)) {
    return {
      error:
        "La contraseña debe tener al menos 8 caracteres.",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    return {
      error:
        "No fue posible crear la cuenta. Verifica los datos e inténtalo nuevamente.",
    };
  }

  return {
    success:
      "Cuenta creada correctamente. Revisa tu correo electrónico para verificar tu cuenta.",
  };
}

/* =========================================
   SIGN IN
   ========================================= */

export async function signIn(
  _previousState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const sameOrigin = await isSameOriginRequest();

  if (!sameOrigin) {
    return {
      error: "Solicitud no autorizada.",
    };
  }

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") ?? ""
  );

  if (!email || !password) {
    return {
      error: "Email y contraseña son obligatorios.",
    };
  }

  if (!validateEmail(email)) {
    return {
      error: "Ingresa un email válido.",
    };
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    return {
      error: "Email o contraseña incorrectos.",
    };
  }

  redirect("/dashboard");
}

/* =========================================
   SIGN OUT
   ========================================= */

export async function signOut() {
  const sameOrigin = await isSameOriginRequest();

  if (!sameOrigin) {
    redirect("/login");
  }

  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

/* =========================================
   PASSWORD RECOVERY
   ========================================= */

export async function requestPasswordReset(
  _previousState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const sameOrigin = await isSameOriginRequest();

  if (!sameOrigin) {
    return {
      error: "Solicitud no autorizada.",
    };
  }

  const email = String(
    formData.get("email") ?? ""
  )
    .trim()
    .toLowerCase();

  if (!email) {
    return {
      error: "Ingresa tu email.",
    };
  }

  if (!validateEmail(email)) {
    return {
      error: "Ingresa un email válido.",
    };
  }

  const supabase = await createClient();

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo:
          `${origin}/auth/callback?next=/reset-password`,
      }
    );

  if (error) {
    return {
      error:
        "No fue posible procesar la solicitud. Inténtalo nuevamente.",
    };
  }

  return {
    success:
      "Si existe una cuenta asociada a este email, recibirás instrucciones para recuperar tu contraseña.",
  };
}

/* =========================================
   UPDATE PASSWORD
   ========================================= */

export async function updatePassword(
  _previousState: AuthResult,
  formData: FormData
): Promise<AuthResult> {
  const sameOrigin = await isSameOriginRequest();

  if (!sameOrigin) {
    return {
      error: "Solicitud no autorizada.",
    };
  }

  const password = String(
    formData.get("password") ?? ""
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );

  if (!password || !confirmPassword) {
    return {
      error:
        "La contraseña y su confirmación son obligatorias.",
    };
  }

  if (!validatePassword(password)) {
    return {
      error:
        "La contraseña debe tener al menos 8 caracteres.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Las contraseñas no coinciden.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error:
        "Tu sesión de recuperación no es válida o ha expirado. Solicita un nuevo enlace.",
    };
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
    });

  if (error) {
    return {
      error:
        "No fue posible actualizar la contraseña. Solicita un nuevo enlace e inténtalo nuevamente.",
    };
  }

  return {
    success:
      "Tu contraseña fue actualizada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.",
  };
} 