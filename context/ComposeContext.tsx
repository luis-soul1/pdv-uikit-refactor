type TComposeContext = {
  children: React.ReactNode
  providers: React.ComponentType[]
}

const ComposeContext: React.FC<TComposeContext> = ({ providers = [], children }) => (
  <>
    {providers.reduceRight((acc, Provider) => {
      return <Provider>{acc}</Provider>
    }, children)}
  </>
)

export default ComposeContext
