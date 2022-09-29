const AccordionTitle = (props: { title: string }) => (
  <div className="flex w-full justify-between">
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded bg-white" />
      <p className="subtitle1 text-white">{props.title}</p>
    </div>
  </div>
)

export default AccordionTitle
