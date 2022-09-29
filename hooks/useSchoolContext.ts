import { useContext } from 'react'

import { SchoolContext } from 'context/SchoolContext'

const useSchoolContext = () => {
  return useContext(SchoolContext)
}

export default useSchoolContext
