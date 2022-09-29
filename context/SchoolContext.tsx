import { useState, createContext } from 'react'

import { ISchoolStructure } from 'types/interfaces/requests/ISchool'

const initialState = {
  id: 0,
  active: false,
  rut: '',
  rbd: '',
  name: '',
  description: '',
  address: '',
  commune_id: 0,
  province_id: 0,
  region_id: 0,
  email: '',
  telephone: '',
  mobile: '',
  web: '',
  type_establishment_id: 0,
  SchoolsTypesTeachings: []
}

type TSchoolContextProps = {
  school: ISchoolStructure
  setSchool: (school: ISchoolStructure) => void
  resetSchoolContext: () => void
}

const SchoolContext: React.Context<TSchoolContextProps> = createContext<TSchoolContextProps>({
  school: initialState,
  setSchool: (school: ISchoolStructure) => school,
  resetSchoolContext: () => false
})

const SchoolContextProvider: React.FC = (props) => {
  const [school, setSchool] = useState<ISchoolStructure>(initialState)

  const resetSchoolContext = () => setSchool(initialState)

  return <SchoolContext.Provider value={{ school, setSchool, resetSchoolContext }}>{props.children}</SchoolContext.Provider>
}

export { SchoolContext, SchoolContextProvider }
