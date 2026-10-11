"use client";

import { useActionState } from "react";

import { signUp } from "@/app/actions/auth";

type RegisterState = {
  error?: string;
  success?: string;
};

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, isPending] =
    useActionState(signUp, initialState);

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
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      {state.error && (
        <div className="auth-message error">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="auth-message success">
          {state.success}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="auth-button"
      >
        {isPending
          ? "Creando cuenta..."
          : "Crear cuenta"}
      </button>
    </form>
  );
} 