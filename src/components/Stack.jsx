import { cloneElement } from 'react'

const Stacks = ({ wrappers, children }) => {
  return wrappers.reduceRight(
    (acc, x) => cloneElement(x, { children: acc }),
    children
  )
}

export default Stacks
