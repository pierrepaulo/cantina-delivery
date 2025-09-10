"use client";

import { useAuth } from "@/stores/auth";
import { use, useState } from "react";
import { email, set, z } from "zod";
import { CustomInput } from "../layout/custon-input";
import { Button } from "../ui/button";
import { api } from "@/lib/axios";

const schema = z
  .object({
    name: z.string().min(2, "Campo obrigatorio"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no minimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Campo obrigatorio"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type Props = {
  email: string;
};

export const LoginAreaStepSignup = ({ email }: Props) => {
  const auth = useAuth();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState(email);
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");

  const handleButton = async () => {
    setErrors(null);
    const validData = schema.safeParse({
      name: nameField,
      email: emailField,
      password: passwordField,
      confirmPassword: confirmPasswordField,
    });
    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
    }

    try {
      setLoading(true);
      const signupReq = await api.post("/auth/singup", {
        name: validData.data.name,
        email: validData.data.email,
        password: validData.data.password,
      });
      if (!signupReq.data.token) {
        alert(signupReq.data.error);
      } else {
        auth.setToken(signupReq.data.token);
        auth.setOpen(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <p className="mb-2">Digite seu nome</p>
        <CustomInput
          name="name"
          errors={errors}
          disabled={loading}
          type="text"
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          autoFocus
        />
      </div>

      <div>
        <p className="mb-2">Digite seu e-mail</p>
        <CustomInput
          name="email"
          errors={errors}
          disabled={loading}
          type="text"
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2">Digite sua senha</p>
        <CustomInput
          name="password"
          errors={errors}
          disabled={loading}
          type="password"
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2">Confirme sua senha</p>
        <CustomInput
          name="confirmPassword"
          errors={errors}
          disabled={loading}
          type="password"
          value={confirmPasswordField}
          onChange={(e) => setConfirmPasswordField(e.target.value)}
        />
      </div>

      <Button disabled={loading} onClick={handleButton}>
        Continuar
      </Button>
    </>
  );
};
