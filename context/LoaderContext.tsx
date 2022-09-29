import { useState, createContext } from 'react'

type TLoaderContextProps = {
  isLoading: boolean
  setIsLoading: (e: boolean) => void
}
const LoaderContext: React.Context<TLoaderContextProps> = createContext<TLoaderContextProps>({
  isLoading: false,
  setIsLoading: () => false
})

const LoaderContextProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  return <LoaderContext.Provider value={{ isLoading, setIsLoading }}>{props.children}</LoaderContext.Provider>
}

export { LoaderContext, LoaderContextProvider }
