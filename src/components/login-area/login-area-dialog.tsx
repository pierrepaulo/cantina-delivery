"use client";

import { useAuth } from "@/stores/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { LoginAreaStepEmail } from "./login-area-step-email";

type Steps = "EMAIL" | "SINGUP" | "SINGIN";

export const LoginAreaDialog = () => {
  const auth = useAuth();
  const [step, setStep] = useState<Steps>("EMAIL");
  const [emailField, setEmailField] = useState("");

  const handleSetpEmail = (hasEmail: boolean, email: string) => {
    setEmailField(email);
    if (hasEmail) {
      setStep("SINGIN");
    } else {
      setStep("SINGUP");
    }
  };

  return (
    <Dialog open={auth.open} onOpenChange={(open) => auth.setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step !== "EMAIL" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep("EMAIL")}
              >
                <ArrowLeft className="size-4" />
              </Button>
            )}

            {step === "EMAIL" && "Login / Cadastro"}
            {step === "SINGUP" && "Cadastro"}
            {step === "SINGIN" && "Login"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {step === "EMAIL" && (
            <LoginAreaStepEmail onValidate={handleSetpEmail} />
          )}
          {step === "SINGIN" && <div>Login </div>}
          {step === "SINGUP" && <div>Cadastro </div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};
