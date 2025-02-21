"use client";
import { useState } from "react";
import Label from "../atoms/Label";
import FormControl from "../molecules/FormControl";
import Button from "../atoms/Button";
import { loginService } from "@/services/firebaseService";
import { useAppDispatch } from "@/lib/hooks";
import { signIn } from "@/lib/reducers/authReducer";
import Input from "../atoms/Input";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const canSubmit = [...Object.values(data)].every(Boolean);

  const handleSubmit = async () => {
    try {
      const res = await loginService(data);
      console.log("COOL");
      dispatch(
        signIn({
          uid: res?.user.uid,
          email: res?.user.email,
          name: res?.user.displayName,
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="py-20 flex items-center justify-center px-4">
      <div className="flex flex-col max-w-lg w-full gap-10">
        <Label labelTop="Iniciar" labelUnder="sesión" />

        <div className="flex flex-col gap-4">
          <FormControl
            label="Correo electrónico"
            labelProps={{
              htmlFor: "email",
            }}
          >
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required={true}
            />
          </FormControl>

          <FormControl
            label="Contraseña"
            labelProps={{
              htmlFor: "password",
            }}
          >
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required={true}
            />
          </FormControl>
        </div>

        <Button
          id="login"
          label="Iniciar sesión"
          disabled={!canSubmit}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginForm;
