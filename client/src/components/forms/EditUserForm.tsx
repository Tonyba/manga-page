import React, { FC } from "react";
import DragAndDrop from "./DragAndDrop";
import Input from "./Input";
import { UserEditParams, UserEditValidation } from "@/utils/types";
import SubmitButton from "./SubmitButton";

type Props = {
  data: UserEditParams;
  onChange: (data: UserEditParams) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  errors?: UserEditValidation;
};

export const EditUserForm: FC<Props> = ({
  data,
  onChange,
  onSubmit,
  submitting,
  errors,
}) => {
  const prev =
    data.avatar && typeof data.avatar === "string" ? [data.avatar] : [];

  return (
    <form onSubmit={onSubmit}>
      <DragAndDrop
        name="avatar"
        label="Avatar del Usuario"
        onChange={(img) => onChange({ ...data, avatar: img[0] })}
        previews={prev}
      />
      <div className="grid md:grid-cols-2 gap-5">
        <Input
          onChange={(val) => onChange({ ...data, userName: val })}
          label="Nombre de Usuario"
          name="userName"
          errMsg={errors?.userName}
          value={data.userName}
        />
        <Input
          onChange={(val) => onChange({ ...data, email: val })}
          label="Email"
          type="email"
          name="email"
          value={data.email}
          errMsg={errors?.email}
        />
      </div>

      <SubmitButton text="Editar" loading={submitting} />
    </form>
  );
};
