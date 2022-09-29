import { useState, createContext, useEffect } from 'react'

import { TGenericId } from 'types/commons/types'
import { IPeriod } from 'types/interfaces/requests/IPeriod'

type TPeriodContextProps = {
  selectedPeriod: IPeriod | undefined
  periods: IPeriod[] | []
  changePeriod: (periodId: TGenericId) => void
  updatePeriodsList: (periods: IPeriod[]) => void
}

const PeriodContext = createContext<TPeriodContextProps>({} as TPeriodContextProps)

type TProviderProps = {
  periods: IPeriod[]
}
const PeriodContextProvider: React.FC<TProviderProps> = (props) => {
  const [selectedPeriod, setSelectedPeriod] = useState<IPeriod>()
  const [periods, setPeriods] = useState<IPeriod[]>(props.periods)

  const setDefaultPeriod = () => {
    if (!periods.length && props.periods.length) setPeriods(props.periods)
    if (periods.length && selectedPeriod === undefined) setSelectedPeriod(periods[0])
  }

  const changePeriod = (periodId: TGenericId) => {
    const period = props.periods.find((period) => period.id === periodId)
    setSelectedPeriod(period)
  }

  const updatePeriodsList = (periods: IPeriod[]) => setPeriods(periods)

  useEffect(() => {
    setDefaultPeriod()
  }, [props.periods, periods])

  return (
    <PeriodContext.Provider value={{ selectedPeriod, periods: periods, changePeriod, updatePeriodsList }}>{props.children}</PeriodContext.Provider>
  )
}

export { PeriodContext, PeriodContextProvider }
