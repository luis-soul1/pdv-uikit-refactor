import { useContext } from 'react'

import { PeriodContext } from 'context/PeriodContext'

const usePeriodContext = () => {
  return useContext(PeriodContext)
}

export default usePeriodContext
