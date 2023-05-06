import React, { FC, useCallback, useEffect, useState } from "react";
import LoginRegisterForm from "../forms/LoginRegisterForm";
import { LoginRegisterParams, LoginRegisterValidation } from "@/utils/types";
import Swal from "sweetalert2";
import { validateUser } from "@/utils/validations/LoginRegisterValidation";
import { login, register } from "@/utils/axios/user";

const initFormState: LoginRegisterParams = {
  email: "",
  password: "",
  userName: "",
  confirmPassword: "",
};

type Props = {
  closeModal: () => void;
  setToken: (token: string) => void;
};

const LoginRegisterFormModal: FC<Props> = ({ closeModal, setToken }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initFormState);
  const [variant, setVariant] = useState<"login" | "register">("login");
  const [errors, setErrors] = useState<LoginRegisterValidation>();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      setLoading(true);
      e.preventDefault();
      setErrors(validateUser(data, variant));
    },
    [variant, Object.values(initFormState)]
  );

  const execRequest = () => {
    if (variant === "login") {
      login(data.email, data.password)
        .then((res) => {
          const data = res.data;
          Swal.fire({
            icon: "success",
            title: "Usuario logueado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("token", data.token);
          setToken(data.token);
          closeModal();

          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire(
            "Error inesperado",
            "El email o la contraseña es incorrecto",
            "error"
          );
        });
    } else {
      register(data.email, data.password, data.userName!)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Usuario registrado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          setVariant("login");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Error al registrar el usuario",
            text: "El email ya esta registrado",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  useEffect(() => {
    if (errors && loading) {
      if (Object.keys(errors).length !== 0) {
        console.log(errors);
      } else {
        execRequest();
      }
      setLoading(false);
    }
  }, [JSON.stringify(errors), loading]);

  return (
    <div className="bg-primary-dark py-10 rounded-md min-w-[500px]">
      <span className="text-4xl mb-8 font-semibold block px-6">
        {variant === "login" ? "Logeate" : "Registrate"}
      </span>
      <hr className="border-primary" />

      <div className="px-6 pt-10">
        <LoginRegisterForm
          data={data}
          onChange={setData}
          onSubmit={onSubmit}
          variant={variant}
          loading={loading}
          errors={errors}
        />

        <p className="mt-5 text-md">
          {variant === "login"
            ? "No tienes una Cuenta?"
            : "Ya tienes una Cuenta?"}
          <button onClick={toggleVariant} className="text-important ms-1">
            {variant === "login" ? "Create una!" : "Logeate!"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginRegisterFormModal;
