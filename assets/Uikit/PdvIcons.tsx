import Link from 'next/link'
import { CSSProperties } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUp'
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined'
import NotInterestedRoundedIcon from '@mui/icons-material/NotInterestedRounded'
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined'
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { Iconly } from 'react-iconly'

import { TColors } from './colors'

const MuiIcons: Record<string, OverridableComponent<SvgIconTypeMap<unknown, 'svg'>> & { muiName: string }> = {
  Add: AddRoundedIcon,
  Check: CheckRoundedIcon,
  Close: CloseRoundedIcon,
  AddCircle: AddCircleOutlinedIcon,
  TalkBox: ChatOutlinedIcon,
  Casino: CasinoOutlinedIcon,
  VideoDisplay: OndemandVideoOutlinedIcon,
  Stories: AutoStoriesOutlinedIcon,
  SmileFace: SentimentVerySatisfiedOutlinedIcon,
  BadMoodFace: MoodBadOutlinedIcon,
  HappyFace: SentimentSatisfiedOutlinedIcon,
  KeyArrowDown: KeyboardArrowDownRoundedIcon,
  KeyArrowRight: KeyboardArrowRightRoundedIcon,
  KeyArrowUp: KeyboardArrowUpRoundedIcon,
  KeyArrowLeft: KeyboardArrowLeftRoundedIcon,
  AddCircleOutlined: AddCircleOutlineIcon,
  FileUpload: FileUploadIcon,
  ContentCopy: ContentCopyRoundedIcon,
  Disabled: NotInterestedRoundedIcon
}
const muiSize = {
  small: 16,
  medium: 24,
  large: 32,
  xlarge: 48
}
export const iconNames = [
  'Work',
  'Wallet',
  'VolumeOff',
  'Voice2',
  'Voice',
  'Video',
  'User',
  'Upload',
  'Unlock',
  'TwoUsers',
  'TimeSquare',
  'TimeCircle',
  'TickSquare',
  'TicketStar',
  'Ticket',
  'Swap',
  'Star',
  'Show',
  'ShieldFail',
  'ShieldDone',
  'Setting',
  'Send',
  'Search',
  'Scan',
  'Plus',
  'Play',
  'People',
  'Password',
  'PaperUpload',
  'PaperPlus',
  'PaperNegative',
  'PaperFail',
  'PaperDownload',
  'Paper',
  'Notification',
  'MoreSquare',
  'MoreCircle',
  'Message',
  'Logout',
  'Lock',
  'Location',
  'InfoSquare',
  'InfoCircle',
  'Image2',
  'Image',
  'Home',
  'Hide',
  'Heart',
  'Graph',
  'Game',
  'Folder',
  'Filter2',
  'Filter',
  'EditSquare',
  'Edit',
  'Download',
  'Document',
  'Discovery',
  'Discount',
  'Delete',
  'Danger',
  'CloseSquare',
  'ChevronUpCircle',
  'ChevronUp',
  'ChevronRightCircle',
  'ChevronRight',
  'ChevronLeft',
  'ChevronLeftCircle',
  'ChevronDownCircle',
  'ChevronDown',
  'Chat',
  'Chart',
  'Category',
  'CaretUp',
  'CaretRight',
  'CaretLeft',
  'CaretDown',
  'Camera',
  'CallSilent',
  'CallMissed',
  'Call',
  'Calendar',
  'Buy',
  'Bookmark',
  'Bag2',
  'Bag',
  'ArrowUpSquare',
  'ArrowUp',
  'ArrowRightSquare',
  'ArrowRight',
  'ArrowLeftSquare',
  'ArrowLeft',
  'ArrowDownSquare',
  'ArrowDown',
  'AddUser',
  'Activity',
  //Material icons
  'Add',
  'Check',
  'Close',
  'AddCircle',
  'Chat',
  'TalkBox',
  'Casino',
  'VideoDisplay',
  'Stories',
  'SmileFace',
  'BadMoodFace',
  'HappyFace',
  'KeyArrowDown',
  'KeyArrowRight',
  'KeyArrowUp',
  'KeyArrowLeft',
  'AddCircleOutlined',
  'FileUpload',
  'ContentCopy',
  'Disabled'
] as const

export type TIconNames = typeof iconNames[number]

export type TIconSizes = 'small' | 'medium' | 'large' | 'xlarge' | number

export interface TPdvIcon {
  name: TIconNames
  size?: TIconSizes
  set?: 'bold' | 'broken' | 'bulk' | 'curved' | 'light' | 'two-tone'
  color?: TColors
  style?: CSSProperties
  className?: string
  asLink?: boolean
  href?: string
  onClick?: () => void
}

export const PdvIcons: React.FC<TPdvIcon> = (props) => {
  const MuiIcon = MuiIcons[props.name]
  const muiStyles = {
    fontSize: typeof props.size === 'string' ? muiSize[props.size] ?? muiSize.medium : props.size,
    color: `var(--${props.color ?? 'gray-500'})`
  }

  const handleIcon = () => {
    if (props.name === 'ChevronRightCircle') return { name: 'ChevronLeftCircle', style: 'rotate-180' }
    return { name: props.name, style: '' }
  }

  return (
    <>
      {MuiIcon ? (
        <>
          {props.asLink ? (
            <Link href={props.href ?? ''} passHref>
              <MuiIcon className={props.className} style={muiStyles} onClick={props.onClick} />
            </Link>
          ) : (
            <MuiIcon className={props.className} style={muiStyles} onClick={props.onClick} />
          )}
        </>
      ) : (
        <>
          {props.asLink ? (
            <Link href={props.href ?? ''} passHref>
              <a className={`${handleIcon().style} ${props.className ?? ''}`} onClick={props.onClick} style={{ display: 'inline-block' }}>
                <Iconly
                  name={handleIcon().name}
                  set={`${props.set ?? 'light'}`}
                  style={{ ...props.style, color: `var(--${props.color ?? 'gray-500'})` }}
                  size={props.size ?? 'medium'}
                />
              </a>
            </Link>
          ) : (
            <span className={`${handleIcon().style} ${props.className ?? ''}`} onClick={props.onClick} style={{ display: 'inline-block' }}>
              <Iconly
                name={handleIcon().name}
                set={`${props.set ?? 'light'}`}
                style={{ ...props.style, color: `var(--${props.color ?? 'gray-500'})` }}
                size={props.size ?? 'medium'}
              />
            </span>
          )}
        </>
      )}
    </>
  )
}
