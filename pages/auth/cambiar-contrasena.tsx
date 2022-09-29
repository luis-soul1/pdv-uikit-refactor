import type { NextPage } from 'next'
import Head from 'next/head'

import ChangePasswordForm from 'components/Auth/ChangePasswordForm'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recuperar Contraseña | Plataformas Educativas PDV</title>
      </Head>

      <ChangePasswordForm />
    </>
  )
}

export default Home
