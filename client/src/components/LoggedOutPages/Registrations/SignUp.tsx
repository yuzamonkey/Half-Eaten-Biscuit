import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client'

import { SIGNUP } from '../../../graphql/mutations'
import { TitleAndLogo } from '../../UtilityComponents/UtilityComponents';
import { ALL_USERNAMES } from '../../../graphql/queries';

const SignUp = () => {
  const history = useHistory()
  const [allUsernames, setAllUsernames] = useState<string[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [signUpConmpleted, setSignUpCompleted] = useState(false)

  const [signup, result] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log("Error at sign up mutation: \n", error.graphQLErrors[0].message)
    }
  })

  useQuery(ALL_USERNAMES, { onCompleted: (data) => setAllUsernames(data.allUsers.map(u => u.username)) })

  // useEffect(() => {
  //   if (result.data) {
  //     //console.log("(sign up) RESULT DATA USE EFFECT", result.data)
  //     history.push('/signin')
  //   }
  // }, [result.data]) // eslint-disable-line

  const validationOk = () => {
    if (firstName.length < 2) {
      setErrorMessage('First name must be at least 2 characters')
      return false
    }
    if (lastName.length < 2) {
      setErrorMessage('Last name must be at least 2 characters')
      return false
    }
    if (username.length < 3) {
      setErrorMessage('Username must be at least 3 characters')
      return false
    }
    if (allUsernames.includes(username)) {
      setErrorMessage(`Username ${username} is already taken`)
      return false
    }
    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters')
      return false
    }
    if (password !== passwordConfirmation) {
      setErrorMessage('Passwords do not match')
    }
    console.log("VALIDATION OK")
    return false
  }

  const submit = async (event: any) => {
    event.preventDefault()
    if (validationOk()) {
      const signUpResult = await signup({
        variables: {
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: password
        }
      })
      console.log("SIGN UP RESULT", signUpResult)
    }
  }


  const usernameInputClassName = () => {
    if (username === '') {
      return ""
    } else if (allUsernames.includes(username)) {
      return "username-input invalid"
    } else {
      return "username-input valid"
    }
  }

  const passwordConfirmationClassName = () => {
    if (passwordConfirmation === '') {
      return ""
    } else if (passwordConfirmation !== password) {
      return "password-confirmation-input invalid"
    } else {
      return "password-confirmation-input valid"
    }
  }


  return (
    <div className="registration-container">
      <div className="registration-items-container signup">
        <div className="registration-title-and-logo-container">
          <TitleAndLogo />
          <h2>Sign up</h2>
        </div>
        <form onSubmit={submit}>
          <div className="registration-inputs-container">
            <div className="error-message-container">
              {errorMessage}
            </div>
            <div>
              First name
              <br />
              <input
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </div>
            <br />
            <div>
              Last name
              <br />
              <input
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </div>
            <br />
            <div>
              Email or username
              <br />
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className={usernameInputClassName()}
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
                className="password-input"
              />
            </div>
            <br />
            <div>
              Confirm password
              <br />
              <input
                type='password'
                value={passwordConfirmation}
                onChange={({ target }) => setPasswordConfirmation(target.value)}
                className={passwordConfirmationClassName()}
              />
            </div>
          </div>
          <div className="registration-submit-button-container">
            <button className="blue-button" type='submit'>Sign up</button>
          </div>
        </form>
        <p className="registration-switch-view-text">
          Already have an account? <a href="/signin">Sign in</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp;
