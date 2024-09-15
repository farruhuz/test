import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthMethods } from '../../contexts/AuthContext/AuthContext';
import { ProductsPageLinks } from '../../contexts/RouterContext/router.links';
import { AuthApi } from '../../api/domains/auth.api';
import { ErrorResponse } from '../../api/types/common.types';
import { Logo } from '../../components/Logo/Logo';
import { Alert } from '../../components/Alert/Alert';
import { TextInput } from '../../components/Inputs/TextInput/TextInput';
import { Button } from '../../components/Button/Button';

// =================================================================

type LoginFormValues = {
  username: string;
  password: string;
};


// =================================================================
export const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const { persistAccessToken, setUserCredentials } = useAuthMethods();

  const { handleSubmit, control, formState } = useForm<LoginFormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const { errors } = formState;

  const onSubmit: SubmitHandler<LoginFormValues> = async data => {
    const { username, password } = data;

    try {
      setIsLoading(true);
      const { token, ...userCredentials } = await AuthApi.login(username, password, 30);
      persistAccessToken(token);
      setUserCredentials(userCredentials);
      navigate(ProductsPageLinks.main, { replace: true });

    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      const { error: errorMsg } = error.response as ErrorResponse;
      setErrMsg(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[540px] rounded-2xl bg-white p-16">
        <div className="mb-8 text-center">
          <Logo />
        </div>
        <h3 className="mb-6 text-center text-2xl font-medium">Вход в личный кабинет</h3>
        {errMsg && <Alert message={errMsg} type="error" />}
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <TextInput
                {...field}
                type="text"
                label="username"
                placeholder="Enter username use emilys"
                errors={errors}

              />
            );
          }}
        />
        {errors.username &&
          <Alert
            message={errors?.username?.message || ""}
            type="warning"
            className='text-sm text-red-400 bg-white border-none p-0'
          />}
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <TextInput
                type="password"
                label="Password"
                placeholder="Enter username use emilyspass"
                errors={errors}
                {...field}
              />
            );
          }}
        />
        <Button
          variant="primary"
          disabled={isLoading}
          className="w-full text-white"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </div>
  );
};
