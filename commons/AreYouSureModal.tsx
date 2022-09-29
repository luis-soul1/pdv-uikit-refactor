import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import PdvButton from '@Uikit/PdvButton'
import { PdvIcons, TIconNames } from '@Uikit/PdvIcons'
import PdvModal from '@Uikit/PdvModal'

type TAreYouSure = {
  title?: string
  areYouSure: boolean
  iconName?: TIconNames
  successButtonText?: string
  cancelButtonText?: string
  successAction: () => void
  cancelAction: () => void
}

const AreYouSureModal: React.FC<TAreYouSure> = (props) => {
  return (
    <PdvModal
      open={props.areYouSure}
      title={props.title}
      size="lg"
      headerColor="red-600"
      footer={
        <PdvModal.Footer className="flex justify-end">
          <PdvButton
            size="small"
            className="mr-4"
            theme="gray-500"
            variant="outlined"
            icon={<CloseIcon className="text-gray-500" fontSize="small" />}
            onClick={props.cancelAction}
          >
            {props.cancelButtonText ?? 'Cerrar'}
          </PdvButton>
          <PdvButton size="small" theme="blue-400" icon={<CheckIcon className="text-white" fontSize="small" />} onClick={props.successAction}>
            {props.successButtonText ?? 'Confirmar'}
          </PdvButton>
        </PdvModal.Footer>
      }
    >
      <div className="flex flex-col justify-center py-4" style={{ width: 400 }}>
        {props.iconName && <PdvIcons className="mx-auto mb-4 block" name={props.iconName} color="red-600" size={65} />}

        {props.children}
      </div>
    </PdvModal>
  )
}

export default AreYouSureModal
