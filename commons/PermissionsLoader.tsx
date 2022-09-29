import Head from 'next/head'
import React from 'react'

import Loader from '@Uikit/Loader'
import { PdvIcons } from '@Uikit/PdvIcons'
import Background from 'assets/images/backgrounds/loading-bg.jpg'

type TLoader = {
  title?: string
  notAllowed?: boolean
}

const PermissionsLoader: React.FC<TLoader> = (props) => (
  <div
    className="relative flex h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${Background.src})` }}
  >
    <Head>
      <title>Plataformas Educativas PDV</title>
    </Head>
    <div className="flex w-4/12 min-w-max flex-col items-center justify-between rounded-3xl bg-white py-10 px-5">
      <div className="my-5">
        {!props.notAllowed && <Loader />} {props.notAllowed && <PdvIcons name="Danger" />}
      </div>
      <div className="h5 text-center">
        <span className="pb-2">{props.title ?? ''}</span>

        {props.notAllowed && (
          <p className="h5 my-5">
            Lo sentimos, <b>no tiene permisos</b> para ver esta página.
          </p>
        )}

        {!props.title && !props.notAllowed && (
          <>
            <span className="subtitle1 mb-2 inline-block text-blue-800">Cargando...</span> <br />
            <h3 className="mb-10 text-center uppercase text-gray-700">
              PLATAFORMAS <br /> EDUCATIVAS PDV
            </h3>
          </>
        )}
      </div>
    </div>
  </div>
)

export default PermissionsLoader
