type TCircleCheck = {
  checked: boolean
  onClick?: React.MouseEventHandler<HTMLSpanElement>
}

const CircleCheck = (props: TCircleCheck) => {
  const checkedStyles = `after:content-[' '] 
  bg-teal-600 
  after:absolute 
  after:table 
  after:border-2 after:border-white 
  after:w-[6px] after:h-3 
  after:rounded-full 
  after:top-[3px] after:left-[6px] 
  after:rotate-45 after:translate-2/4 after:scale-100	
  after:border-t-0 after:border-l-0`

  return (
    <div className="flex items-center justify-center">
      <span
        className={`relative block h-[22px] w-[22px] cursor-pointer rounded-full border-2 border-teal-600 transition ${
          props.checked ? checkedStyles : ''
        }`}
        onClick={props.onClick}
      />
    </div>
  )
}

export default CircleCheck
