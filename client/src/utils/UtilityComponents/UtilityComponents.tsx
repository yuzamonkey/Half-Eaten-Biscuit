import React, { useState } from 'react'
import './UtilityComponents.css'

export const Toggle = ({ state, toggleClick }: any) => {
  return (
    <div className={state ? "toggle-container toggle-on" : "toggle-container toggle-off"} onClick={toggleClick}>
      <div className={state ? "toggle-circle toggle-on-circle" : "toggle-circle toggle-off-circle"}>
      </div>
    </div>
  )
}

//button,
//hover-info-box