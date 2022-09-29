import Skeleton from '@mui/material/Skeleton'

type TPdvSkeleton = {
  rows: number
  className?: string
  variant: 'text' | 'rectangular' | 'text'
}
const PdvSkeleton: React.FC<TPdvSkeleton> = ({ rows = 1, variant = 'text', className = '' }) => {
  const randomPercentage = () => Math.floor(Math.random() * (100 - 60 + 1)) + 60

  const setWidth = (index: number) => ((index + 1) % 2 === 0 ? randomPercentage() + '%' : '100%')

  return (
    <div className={className}>
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={index} variant={variant} height={30} width={setWidth(index)} />
      ))}
    </div>
  )
}

export default PdvSkeleton
