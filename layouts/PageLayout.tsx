import Head from 'next/head'

type TPageLayoutProps = {
  title: string
}

const PageLayout: React.FC<TPageLayoutProps> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title} | Plataformas Educativas PDV</title>
      </Head>

      <h5 className="text-gray-500">{props.title}</h5>

      <span className="my-2 inline-block h-1 w-8 bg-gray-300 " />

      <main>{props.children}</main>
    </>
  )
}

export default PageLayout
