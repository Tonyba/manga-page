import React, { useEffect, useState } from "react";
import { EditUserForm } from "../forms/EditUserForm";
import { useAppContext } from "@/utils/context/AppContext";
import { UserEditParams } from "@/utils/types";
import { UserEditValidation } from "@/utils/types";
import { validateUserEdit } from "@/utils/validations/UserEditValidation";
import { updateUser } from "@/utils/axios/user";

const Settings = () => {
  const { user, setUser } = useAppContext();
  const [data, setData] = useState<UserEditParams>({
    email: user?.email!,
    userName: user?.userName!,
    avatar: user?.avatar && user?.avatar != "https" ? user.avatar : "",
  });
  const [errors, setErrors] = useState<UserEditValidation>();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(validateUserEdit(data));
  };

  const editUser = async () => {
    console.log(data);
    try {
      const newUser = await updateUser(user?.id!, data);
      setUser({ ...newUser.data });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setData({ ...data, avatar: user?.avatar });
  }, [user?.avatar]);

  useEffect(() => {
    if (errors && submitting) {
      if (Object.keys(errors).length !== 0) {
        setSubmitting(false);
      } else {
        editUser();
      }
    }
  }, [JSON.stringify(errors), submitting]);

  return (
    <>
      <h1 className="font-semibold text-3xl">Configuracion</h1>
      <div className="py-5">
        <EditUserForm
          data={{
            email: data?.email!,
            userName: data?.userName!,
            avatar: data.avatar,
          }}
          onChange={setData}
          onSubmit={onSubmit}
          submitting={submitting}
          errors={errors}
        />
      </div>
    </>
  );
};

export default Settings;
