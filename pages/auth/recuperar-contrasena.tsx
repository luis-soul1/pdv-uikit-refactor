import type { NextPage } from 'next'
import Head from 'next/head'

import RecoveryForm from 'components/Auth/RecoveryForm'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Recuperar Contraseña | Plataformas Educativas PDV</title>
      </Head>

      <RecoveryForm />
    </>
  )
}

export default Home
