import { useState } from 'react'

export type TToggleActions<T = void, A = void> = {
  modalAction?: A
  modalData?: T
}

const useModal = <T, A = void>() => {
  const [isOpen, setisOpen] = useState<boolean>(false)
  const [data, setData] = useState<T>()
  const [action, setAction] = useState<A>()

  const toggle = ({ modalAction = undefined, modalData = undefined }: TToggleActions<T, A> = {}) => {
    setisOpen(!isOpen)
    if (modalData !== data) setData(modalData)
    if (modalAction !== action) setAction(modalAction)
  }

  return { isOpen, data, action, toggle }
}

export default useModal
