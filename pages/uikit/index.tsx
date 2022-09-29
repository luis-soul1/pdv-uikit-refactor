import { NextPage } from 'next'
import Head from 'next/head'

import UiKitLayout from 'assets/Uikit/UiPage/UiPageLayout'

const UiKitPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>UIkit</title>
      </Head>
      <UiKitLayout />
    </>
  )
}

export default UiKitPage
