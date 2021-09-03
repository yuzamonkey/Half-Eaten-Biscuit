import './ErrorPage.css'
import Cookie from '../../images/bittencookie.png'
import { BlueButton } from './UtilityComponents'
import { useApolloClient } from '@apollo/client'

const ErrorPage = () => {
  const client  = useApolloClient()

  const handleRefresh = () => {
    window.location.assign('')
  }

  const handleSignout = async () => {
    await client.resetStore()
    localStorage.clear()
    sessionStorage.clear()
    window.location.assign('/')
  }

  return (
    <div className="error-page-container">
      <div className="error-page-title-and-image-container">
        <h1>Oh boy, <br />something happened!</h1>
        <img src={Cookie} alt="cookie" />
      </div>
      <div className="error-page-text-container">
        <p>And we have no idea what. </p>
        <p>
          It might be an internet connection problem or an issue with the database. Or both.
        </p>
        <p>
          Hard to admit, but it might also be a bug in the application 😱
        </p>
      </div>
      <div className="error-page-buttons-container">
        <BlueButton text={'Refresh'} handleClick={() => handleRefresh()} />
        <BlueButton text={'Sign out'} handleClick={() => handleSignout()} />
      </div>
    </div>
  )
}

export default ErrorPage