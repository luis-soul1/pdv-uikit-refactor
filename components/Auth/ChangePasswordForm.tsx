import { useRouter } from "next/router";
import { useState } from "react";

import Divider from "@mui/material/Divider";
import { useForm } from "react-hook-form";

import InputField from "@Uikit/Forms/Input/InputField";
import PdvButton from "@Uikit/PdvButton";
import { PdvIcons } from "@Uikit/PdvIcons";
import PdvModal from "@Uikit/PdvModal";
import LoginScreen from "components/Auth/LoginScreen";
import useLoader from "hooks/useLoader";
import { IChangePassword } from "types/interfaces/requests/IAuth";
import { apiClient } from "utils/ApiClient";

const ChangePasswordForm = () => {
 const router = useRouter();
 const { isLoading, setIsLoading } = useLoader();
 const [showModal, setShowModal] = useState<boolean>(true);
 const [responseMsg, setResponseMsg] = useState<string>("");
 const changePassForm = useForm();

 const changePassword = async ({ new_password }: IChangePassword) => {
  try {
   setIsLoading(true);
   const body = { new_password, reset_token: router?.query?.token as string };
   await apiClient.mutation<string, IChangePassword>({ endpoint: "/auth/new-password", method: "POST", body });
   setShowModal(true);
  } catch (error) {
   setResponseMsg("Token inválido o expirado");
   console.error(error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <LoginScreen>
   <div className='flex w-80 flex-col items-center justify-center'>
    <p className='subtitle1 mb-3 text-center font-bold text-gray-500'>¿Tienes problemas para iniciar sesión?</p>
    <p className='body1 mb-3 text-center text-gray-500'>
     Ingresa tu usuario y te enviaremos un enlace para que recuperes el acceso a tu cuenta.
    </p>
    <span className='h-1 w-6 rounded bg-teal-500' />
    <form className='m-2 w-full p-2' onSubmit={changePassForm.handleSubmit(changePassword)}>
     <InputField
      name='new_password'
      form={changePassForm}
      className='my-2'
      inputProps={{ placeholder: "Nueva contraseña", type: "password" }}
      options={{ required: "Debe ingresar su nueva contraseña" }}
     />

     <InputField
      name='repeat_password'
      form={changePassForm}
      className='my-2'
      inputProps={{ placeholder: "Repite tu contraseña", type: "password" }}
      options={{
       required: "Repita su contraseña previamente ingresada",
       validate: (value) =>
        value === changePassForm.getValues("password") || "Su contraseña no coincide con la previamente ingresada",
      }}
     />

     <PdvButton type='submit' className='mt-6 mb-2 w-full' theme='teal-500' size='large' loading={isLoading} disabled={isLoading}>
      Recuperar
      <PdvIcons name='ArrowRight' className='ml-2' color='white' />
     </PdvButton>

     {responseMsg && <span className='body1 block pt-4 text-center text-rose-500'>{responseMsg}</span>}
    </form>

    <Divider className='my-4 w-full' />

    <PdvButton
     asLink
     href='/auth/login'
     theme='gray-500'
     variant='outlined'
     className='my-6 w-full'
     size='large'
     icon='ArrowLeft'
    >
     Volver
    </PdvButton>

    <PdvModal
     open={showModal}
     size='xs'
     footer={
      <PdvModal.Footer className='flex justify-end'>
       <PdvButton size='small' icon='ArrowLeft' theme='gray-500' variant='outlined' onClick={() => router.push("/auth/login")}>
        Ir a iniciar sesión
       </PdvButton>
      </PdvModal.Footer>
     }
    >
     <div className='flex flex-col items-center justify-center gap-4'>
      <PdvIcons name='Unlock' className='text-center' color='teal-500' size='xlarge' />
      <h5 className='text-center'>Tu contraseña se cambió exitosamente</h5>
      <p className='body1 block text-center'>Presiona volver para regresar a la pantalla de inicio</p>
     </div>
    </PdvModal>

    <p className='body1 mt-5 text-gray-300'>© Copyright Preuniversitario Pedro de Valdivia</p>
   </div>
  </LoginScreen>
 );
};

export default ChangePasswordForm;
