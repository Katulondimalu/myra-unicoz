import React from 'react'
import { Navigate } from 'react-router-dom'
import {
  DEVELOPMENT_LANG,
  ENVIRONMENT,
  PRODUCTION_LANG,
} from '../utils/staticData'

const NoGame = () => {
  if (ENVIRONMENT === 'development') {
    return <Navigate to={`/${DEVELOPMENT_LANG}`} />
  }
  return <Navigate to={`/${PRODUCTION_LANG}`} />
}

export default NoGame
