import React from 'react'
import { ErrorPageC } from './component'
import { useRouteError } from 'react-router-dom'
import { MyErrorType } from './types';

export const ErrorPageV = () => {
  const error = useRouteError() as MyErrorType;
  return (
    <ErrorPageC data={{error}}/>
  )
}
