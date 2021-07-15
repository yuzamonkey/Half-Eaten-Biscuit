import React from 'react'
import './Dropdown.css'

const NotificationsDropdown = ({show, setShow}: any) => {
  if (!show) {
    return null
  }
  return (
    <div className="dropdown">
      <h3 className="notifications-title">Notifications</h3>
    </div>
  )
}

export default NotificationsDropdown;