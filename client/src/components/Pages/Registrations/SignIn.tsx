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
      <div className="registration-form-container">
        <TitleAndLogo />
        <form onSubmit={submit}>
          <div>
            username <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="blue-button-container" type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn