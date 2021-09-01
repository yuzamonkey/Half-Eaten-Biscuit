import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
import { useHistory } from 'react-router-dom'
import { SESSION_TOKEN, SIGN_IN_TOKEN } from '../../../utils/constants'
import { UserContext } from '../../UtilityComponents/UserContext'

import './Registrations.css'
import { TitleAndLogo } from '../../UtilityComponents/UtilityComponents'

const SignIn = () => {
  const userContext = useContext(UserContext)
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
      console.log("Error at sign in mutation: \n", error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const id = result.data.login.id
      const token = result.data.login.value
      localStorage.setItem(SIGN_IN_TOKEN, token)
      userContext.setToken(token)
      sessionStorage.setItem(SESSION_TOKEN, id)
      userContext.setSessionId(id)
      history.push('/')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event: any) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div className="registration-container">
      <div className="registration-items-container signin">
        <div className="registration-title-and-logo-container">
          <TitleAndLogo />
          <h2>Sign in</h2>
        </div>
        <form onSubmit={submit}>
          <div className="registration-inputs-container">
            <div className="error-message-container">
              {errorMessage}
            </div>
            <div>
              Email or username
              <br />
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <br />
            <div>
              Password
              <br />
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="filler-div" />
          </div>
          <div className="registration-submit-button-container">
            <button className="signup-form-submit-button blue-button" type='submit'>Sign in</button>
          </div>
        </form>
        <p className="registration-switch-view-text">
          No account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default SignIn