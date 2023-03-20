import { DevControlledButton } from '../../assets/style/ButtonStyle.style'
import { useIsDevelopment } from '../../contexts/use-is-development'

export let DevButton = (props) => {
  let is_dev = useIsDevelopment()
  if (!is_dev) return null
  return <DevControlledButton {...props} />
}
