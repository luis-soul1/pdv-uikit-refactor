import type { NextPage } from 'next'
import Head from 'next/head'

import LoginForm from 'components/Auth/LoginForm'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | Plataformas Educativas PDV</title>
      </Head>

      <LoginForm />
    </>
  )
}

export default Home
