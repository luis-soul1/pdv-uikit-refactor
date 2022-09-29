import Image from 'next/image'

import Background from 'assets/images/backgrounds/login.png'
import Login from 'assets/images/login.png'

type TLoginScreenProps = {
  children: React.ReactNode
}

const LoginScreen: React.FC<TLoginScreenProps> = (props) => {
  return (
    <div
      className="w-100 relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-2"
      style={{ backgroundImage: `url(${Background.src})` }}
    >
      <div className="shadow-gray-500/50 flex max-w-full rounded-3xl bg-white py-20 px-10 shadow-lg">
        <div>{props.children}</div>
        <div className="m-auto hidden md:block">
          <Image src={Login} alt="Bienvenido" width={651} height={447} quality={100} />
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
