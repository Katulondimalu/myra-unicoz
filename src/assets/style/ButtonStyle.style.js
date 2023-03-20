import styled from 'styled-components'

export const DevControlledButton = styled.button.attrs({ children: 'skip' })`
  color: var(--dev-button-color);
  background-color: transparent;
  position: fixed;
  top: 0px;
  left: 0px;
  width: auto;
  font-size: 12px;
  height: 40px;
  z-index: 1000;
  border-radius: 0px;
`
