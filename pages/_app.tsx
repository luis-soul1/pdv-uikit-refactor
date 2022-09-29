import type { AppProps } from 'next/app'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { SessionProvider } from 'next-auth/react'
import { SnackbarProvider } from 'notistack'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import PdvLoader from '@Uikit/PdvLoader'
import ComposeContext from 'context/ComposeContext'
import { LoaderContextProvider } from 'context/LoaderContext'
import 'assets/styles/index.scss'
import AuthGuard from 'layouts/AuthGuard'
import ErrorBoundary from 'layouts/ErrorBoundary'
import Layout from 'layouts/Layout'
import { IRequestError } from 'types/interfaces/requests/IRequest'
import 'dayjs/locale/es-mx'

dayjs.locale('es-mx')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: (failureCount, error) => ((error as IRequestError).statusCode === 401 && failureCount <= 3 ? true : false)
    }
  }
})

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SnackbarProvider maxSnack={3}>
            <ComposeContext providers={[LoaderContextProvider]}>
              <PdvLoader />
              <ErrorBoundary>
                <AuthGuard>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </AuthGuard>
              </ErrorBoundary>
            </ComposeContext>
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </SessionProvider>
  )
}

export default MyApp
