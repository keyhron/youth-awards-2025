'use client';
import { useState } from 'react';
import Label from '../atoms/Label';
import FormControl from '../molecules/FormControl';
import Button from '../atoms/Button';
import { loginService } from '@/services/firebaseService';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signIn } from '@/lib/reducers/authReducer';

const LoginForm = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const canSubmit = [...Object.values(data)].every(Boolean);

  const handleSubmit = async () => {
    try {
      const res = await loginService(data);
      console.log('COOL');
      dispatch(
        signIn({
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.displayName,
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
            inputProps={{
              id: 'email',
              type: 'email',
              value: data.email,
              onChange: (e) => setData({ ...data, email: e.target.value }),
              required: true,
            }}
            labelProps={{
              htmlFor: 'email',
            }}
          />
          <FormControl
            label="Contraseña"
            inputProps={{
              id: 'password',
              type: 'password',
              value: data.password,
              onChange: (e) => setData({ ...data, password: e.target.value }),
              required: true,
            }}
            labelProps={{
              htmlFor: 'password',
            }}
          />
        </div>

        <Button
          label="Iniciar sesión"
          disabled={!canSubmit}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default LoginForm;

