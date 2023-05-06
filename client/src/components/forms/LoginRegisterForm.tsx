import React, { FC } from "react";
import Input from "./Input";
import { LoginRegisterParams, LoginRegisterValidation } from "@/utils/types";
import SubmitButton from "./SubmitButton";

type Props = {
  onChange: (data: LoginRegisterParams) => void;
  data: LoginRegisterParams;
  onSubmit: (e: React.FormEvent) => void;
  variant: "login" | "register";
  loading: boolean;
  errors?: LoginRegisterValidation;
};

const LoginRegisterForm: FC<Props> = ({
  data,
  onChange,
  onSubmit,
  variant,
  loading,
  errors,
}) => {
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      {variant === "register" && (
        <Input
          onChange={(val) => onChange({ ...data, userName: val })}
          type="text"
          placeholder="username"
          name="username"
          label="Nombre de Usuario"
          value={data.userName}
          focusAnimationsLabel={true}
          errMsg={errors?.userName}
        />
      )}

      <Input
        onChange={(val) => onChange({ ...data, email: val })}
        type="email"
        placeholder="email"
        name="email"
        label="Email"
        value={data.email}
        focusAnimationsLabel={true}
        errMsg={errors?.email}
      />
      <Input
        onChange={(val) => onChange({ ...data, password: val })}
        type="password"
        value={data.password}
        placeholder="Contraseña"
        name="password"
        label="Contraseña"
        focusAnimationsLabel={true}
        errMsg={errors?.password}
      />

      {variant === "register" && (
        <Input
          onChange={(val) => onChange({ ...data, confirmPassword: val })}
          type="password"
          value={data.confirmPassword}
          placeholder="confirmPassword"
          name="confirmPassword"
          label="Confirmar Contraseña"
          focusAnimationsLabel={true}
          errMsg={errors?.confirmPassword}
        />
      )}

      <SubmitButton
        loading={loading}
        text={variant === "login" ? "Logearse" : "Registrarse"}
        fullWidth={true}
      />
    </form>
  );
};

export default LoginRegisterForm;
