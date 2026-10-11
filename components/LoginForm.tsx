"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signIn } from "@/app/actions/auth";

type LoginState = {
  error?: string;
};

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] =
    useActionState(signIn, initialState);

  return (
    <form action={formAction} className="auth-form">
      <div className="form-field">
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">
          Contraseña
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Tu contraseña"
          autoComplete="current-password"
          required
        />
      </div>

      {state.error && (
        <div className="auth-message error">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="auth-button"
      >
        {isPending
          ? "Iniciando sesión..."
          : "Iniciar sesión"}
      </button>

      <Link
        href="/forgot-password"
        className="forgot-password"
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </form>
  );
} 