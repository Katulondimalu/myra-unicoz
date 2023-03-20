import React from 'react'

export let IsDevelopmentContext = React.createContext(false)
export let useIsDevelopment = () => React.useContext(IsDevelopmentContext)
