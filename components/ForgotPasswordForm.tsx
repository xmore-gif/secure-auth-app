"use client";

import { useActionState } from "react";

import { requestPasswordReset } from "@/app/actions/auth";

type ForgotPasswordState = {
  error?: string;
  success?: string;
};

const initialState: ForgotPasswordState = {};

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] =
    useActionState(
      requestPasswordReset,
      initialState
    );

  return (
    <form
      action={formAction}
      className="auth-form"
    >
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
          ? "Enviando..."
          : "Enviar instrucciones"}
      </button>
    </form>
  );
} 