import Image from 'next/image'

import PdvButton from '@Uikit/PdvButton'
import error404 from 'assets/images/errors/error404.png'
import { routes } from 'utils/routes'

const Error404 = () => {
  return (
    <div className="total-center h-screen w-screen">
      <div className="grid h-full grid-cols-12 rounded-xl bg-white">
        <div className="col-span-12 flex items-center justify-center pt-7">
          <Image className="pl-1" src={error404} alt="error404" width={891} height={416} quality={100} />
        </div>
        <div className="col-span-12 flex items-center justify-center">
          <div className="">
            <div className="flex items-center justify-center pt-4 pb-1">
              <h5 className="block font-semibold text-gray-500">{'La página que buscas no existe :('}</h5>
            </div>
            <div className="flex items-center justify-center pb-1">
              <h5 className="block font-light text-gray-500">Puedes volver al Home y seguir estudiando para ser mejor</h5>
            </div>
            <div className="flex items-center justify-center pt-4">
              <form className="mb-4 bg-white pb-8">
                <div className="flex flex-col items-start justify-center ">
                  <PdvButton type="submit" asLink href={routes.private.home} theme="teal-500" size="large" icon="ArrowLeft" className="w-64 py-2">
                    Volver al Home
                  </PdvButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Error404
