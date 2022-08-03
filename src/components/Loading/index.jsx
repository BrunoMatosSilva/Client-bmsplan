import { CircleNotch } from 'phosphor-react'
import { LoadingContainer } from './styles'

export function Loading() {
  return (
    <LoadingContainer>
      <div>
      <CircleNotch weight="bold" />
      </div>
    </LoadingContainer>
  )
}
