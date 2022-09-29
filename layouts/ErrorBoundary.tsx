import Image from 'next/image'
import React, { Component, ErrorInfo, ReactNode } from 'react'

import PdvButton from '@Uikit/PdvButton'
import PdvModal from '@Uikit/PdvModal'
import error500 from 'assets/images/errors/error500.png'
import { routes } from 'utils/routes'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: ''
  }

  public static getDerivedStateFromError(error: Error): State {
    let errorMessage = error.message
    if (!error.message) errorMessage = 'Ups, un error ha ocurrido'

    return { hasError: true, errorMessage }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <PdvModal
          open={true}
          size="xl"
          title="Upss hubo un error"
          footer={
            <PdvModal.Footer className="flex justify-end">
              <PdvButton className="mr-2" size="small" onClick={() => this.setState({ hasError: false })}>
                Volver a intentar
              </PdvButton>
              <PdvButton asLink href={routes.private.home} theme="indigo-700" size="small" variant="outlined">
                Ir al Home
              </PdvButton>
            </PdvModal.Footer>
          }
        >
          <div className="w-[900px]">
            <div className="mt-7">
              <Image src={error500} className="object-cover" alt="error500" />
            </div>
            <h5 className="text-center font-semibold">{'No esperábamos esto :('}</h5>
            <h5 className="mt-4 text-center font-normal">{`"${this.state.errorMessage}"`}</h5>
            <h5 className="mt-4 text-center font-normal">Pero no te preocupes. Intentalo nuevamente o puedes volver al Home.</h5>
          </div>
        </PdvModal>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
