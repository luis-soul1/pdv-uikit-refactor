import { useState, useRef, PropsWithChildren, cloneElement, Children } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'

import { TButtonSize, TButtonTheme, TButtonVariant } from '@Uikit/PdvButton'

type TPdvDropdown = {
  title: string
  className?: string
  variant?: TButtonVariant
  theme?: TButtonTheme
  size?: TButtonSize
  children: React.ReactElement<TItem>[] | React.ReactElement<TItem>
  onClick?: () => void
}

type TDropdownItems = {
  Item: React.FC<TItem>
}

const outlinedStructure = 'border hover:bg-gray-25 bg-transparent'
const defaultStructure = 'bg-transparent border-none shadow-transparent hover:shadow-transparent hover:bg-gray-25'
const structure = 'rounded-l border-0 py-1 pl-2 normal-case shadow-md transition duration-200'

const root: Record<string, string> = {
  // Themes
  'indigo-700_contained': 'bg-indigo-700 text-white hover:bg-indigo-600',
  'indigo-700_outlined': `text-indigo-700 border-indigo-700 ${outlinedStructure}`,
  'indigo-700_default': `text-indigo-700 ${defaultStructure}`,

  'teal-500_contained': 'bg-teal-500 text-white hover:bg-teal-300',
  'teal-500_outlined': `text-teal-500 border-teal-500 ${outlinedStructure}`,
  'teal-500_default': `text-teal-500 ${defaultStructure}`,

  'blue-400_contained': 'bg-blue-400 text-white hover:bg-blue-200',
  'blue-400_outlined': `text-blue-400 border-blue-400 ${outlinedStructure}`,
  'blue-400_default': `text-blue-400 ${defaultStructure}`,

  'blue-100_contained': 'bg-blue-100 text-blue-400 hover:bg-blue-50',
  'blue-100_outlined': `text-blue-100 border-blue-100 ${outlinedStructure}`,
  'blue-100_default': `text-blue-100 ${defaultStructure}`,

  'orange-400_contained': 'bg-orange-400 text-white hover:bg-orange-200',
  'orange-400_outlined': `text-orange-400 border-orange-400 ${outlinedStructure}`,
  'orange-400_default': `text-orange-400 ${defaultStructure}`,

  'yellow-600_contained': 'bg-yellow-600 text-white hover:bg-yellow-400',
  'yellow-600_outlined': `text-yellow-600 border-yellow-600 ${outlinedStructure}`,
  'yellow-600_default': `text-yellow-600 ${defaultStructure}`,

  'gray-500_contained': 'bg-gray-500 text-white hover:bg-gray-50',
  'gray-500_outlined': `text-gray-500 border-gray-500 ${outlinedStructure}`,
  'gray-500_default': `text-gray-500 ${defaultStructure}`,

  black_contained: 'bg-black text-white hover:bg-gray-700',
  black_outlined: `text-black border-black ${outlinedStructure}`,
  black_default: `text-black ${defaultStructure}`,

  white_contained: 'bg-white text-gray-500 hover:bg-gray-25'
}

export const PdvDropdown: React.FC<TPdvDropdown> & TDropdownItems = (props) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const buttonStyles = () => {
    const selectedVariant: TButtonVariant = props.variant ? props.variant : 'contained'
    const selectedTheme: TButtonTheme = props.theme ? props.theme : 'orange-400'
    return root[`${selectedTheme}_${selectedVariant}`]
  }

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        className="shadow-gray-500/50 gap-0.5 rounded-none"
        style={{ boxShadow: 'var( --shadow-gray--016)' }}
      >
        <Button onClick={handleToggle} className={`${props.className} ${structure} ${buttonStyles()}`}>
          {props.title}
        </Button>
        <Button
          className={`${props.className} ${structure} ${buttonStyles()}`}
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal className="z-50">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {props.children &&
                    Children.map(props.children, (child) => {
                      const item = child as React.ReactElement<PropsWithChildren<TItem>>
                      if (item.type === Item) {
                        const onClick = () => {
                          setOpen(false)
                          item.props.onClick?.()
                        }

                        return cloneElement(item, { onClick })
                      }
                    })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

type TItem = {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}

const Item: React.FC<TItem> = (props) => {
  return (
    <MenuItem disabled={props.disabled} onClick={props.onClick} className="body1">
      {props.children}
    </MenuItem>
  )
}

PdvDropdown.Item = Item

export default PdvDropdown
