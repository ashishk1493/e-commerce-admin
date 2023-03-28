import { CircularProgress } from '@mui/material'
import React from 'react'

const FormDisabledOnLoading = () => {
  return (
    <div style={{
      position: "absolute",
      top: "0%",
      left: "0%",
      // backgroundColor: "#f0f0f0",
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1"
    }}>
      <CircularProgress />
    </div>
  )
}

export default FormDisabledOnLoading