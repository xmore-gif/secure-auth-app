"use client";

import { useActionState } from "react";

import { updatePassword } from "@/app/actions/auth";

type ResetPasswordState = {
  error?: string;
  success?: string;
};

const initialState: ResetPasswordState = {};

export default function ResetPasswordForm() {
  const [state, formAction, isPending] =
    useActionState(
      updatePassword,
      initialState
    );

  return (
    <form
      action={formAction}
      className="auth-form"
    >
      <div className="form-field">
        <label htmlFor="password">
          Nueva contraseña
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

      <div className="form-field">
        <label htmlFor="confirmPassword">
          Confirmar contraseña
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Repite tu contraseña"
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
          ? "Actualizando..."
          : "Actualizar contraseña"}
      </button>
    </form>
  );
} 