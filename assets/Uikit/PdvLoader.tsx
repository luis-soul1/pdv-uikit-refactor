import Backdrop from '@mui/material/Backdrop'

import useLoader from 'hooks/useLoader'

import Loader from './Loader'

type TUiLoader = {
  onClick?: () => void
}

const PdvLoader: React.FC<TUiLoader> = (props) => {
  const loader = useLoader()

  return (
    <div>
      <Backdrop open={loader.isLoading} onClick={props?.onClick} sx={{ color: '#fff', zIndex: 2000 }}>
        <Loader />
      </Backdrop>
    </div>
  )
}

export default PdvLoader
