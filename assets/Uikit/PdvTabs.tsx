import { useState, Children, cloneElement, useEffect } from 'react'

import PdvButton, { TButtonSize, TButtonTheme } from './PdvButton'
import { PdvIcons, TIconNames } from './PdvIcons'
import PdvTooltip from './PdvTooltip'

type TPdvTabs = {
  children: React.ReactElement<TTab>[] | React.ReactElement<TTab>
  size?: 'full' | 'auto'
  className?: string
  theme: TButtonTheme
  defaultSelectedTab?: string | number
}

type TPdvTab = {
  Tab: React.FC<TTab>
}

const PdvTabs: React.FC<TPdvTabs> & TPdvTab = (props) => {
  const { size = 'auto' } = props
  const firstTab = Children.toArray(props.children)[0] as React.ReactElement<TTab>

  const [selectedTab, setSelectedTab] = useState<string | number>(props.defaultSelectedTab ?? firstTab.props.tabKey)
  const changeActiveTab = (tabKey: string | number) => setSelectedTab(tabKey)

  let selectedTabContent: React.ReactNode | undefined = undefined

  useEffect(() => {
    if (props.defaultSelectedTab) changeActiveTab(props.defaultSelectedTab)
  }, [props.defaultSelectedTab])

  return (
    <>
      <div className={`overflow-hidden rounded-xl bg-gray-25  ${size === 'full' ? 'w-full p-1' : 'inline whitespace-nowrap'}`}>
        <div className={`${props.className ?? ''} slider items-center rounded-xl `}>
          <div className={`flex gap-2 ${size === 'full' ? 'w-full' : ''} items-center rounded-xl bg-gray-25 p-2`}>
            {Children.map(props.children, (child: React.ReactElement<TTab>) => {
              const { children, ...restTabProps } = child.props as TTab

              if (selectedTab === restTabProps.tabKey) selectedTabContent = children

              const onTabClick = () => {
                changeActiveTab(restTabProps.tabKey)
                restTabProps.onClick && restTabProps.onClick()
              }

              const tabProps = {
                ...restTabProps,
                isSelected: selectedTab === restTabProps.tabKey,
                onClick: onTabClick,
                theme: restTabProps.theme ? restTabProps.theme : props.theme,
                tabSize: size
              }

              if (child && child.type === Tab) return <>{cloneElement(child, tabProps)}</>
            })}
          </div>
        </div>
      </div>
      {selectedTabContent && selectedTabContent}
    </>
  )
}

type TTab = {
  tabText: string
  icon?: TIconNames
  iconSize?: number
  isTabHidden?: boolean
  href?: string
  asLink?: boolean
  onClick?: () => void
  isSelected?: boolean
  tabKey: string | number
  tabSize?: 'full' | 'auto'
  size?: TButtonSize
  theme?: TButtonTheme
  children?: React.ReactNode[] | React.ReactNode
  disabled?: boolean
  tooltip?: string
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

const Tab: React.FC<TTab> = (props) => {
  const selectedVariant = props.isSelected ? 'contained' : 'default'
  const selectedTheme = selectedVariant.includes('default') ? 'gray-500' : props.theme

  return (
    <TooltipWrapper text={props.tooltip} placement={props.tooltipPlacement}>
      <span className={`flex grow items-center gap-2 ${props?.disabled ? 'cursor-not-allowed' : ''}`}>
        <PdvButton
          asLink={props.asLink}
          href={props.href}
          theme={selectedTheme}
          variant={selectedVariant}
          size={props.size ?? 'small'}
          className={`w-full py-2.5 ${props.size?.includes('small') ? 'px-4' : 'px-10'} ${props.tabSize === 'full' ? 'grow' : ''} ${
            props.isSelected ? 'shadow-md' : ''
          }`}
          onClick={props.onClick}
          noShadow
          icon={props?.icon && <PdvIcons name={props.icon} color={props.isSelected ? 'white' : 'gray-500'} size={props?.iconSize} />}
          disabled={props.disabled}
        >
          {props.tabText}
        </PdvButton>
      </span>
    </TooltipWrapper>
  )
}

PdvTabs.Tab = Tab

type TooltipWrapperProps = {
  children: React.ReactElement
  text?: string
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
}

const TooltipWrapper = (props: TooltipWrapperProps) => {
  const { placement = 'top' } = props
  if (!props.text) return <>{props.children}</>

  return (
    <PdvTooltip title={props.text} placement={placement} bgColor="blue-100" textColor="blue-500">
      {props.children}
    </PdvTooltip>
  )
}

export default PdvTabs
