import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { SIGNUP } from '../../../graphql/mutations'
import { TitleAndLogo } from '../../UtilityComponents/UtilityComponents';

const SignUp = () => {
  const history = useHistory()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [signup, result] = useMutation(SIGNUP, {
    onError: (error) => {
      console.log("Error at sign up mutation: \n", error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      //console.log("(sign up) RESULT DATA USE EFFECT", result.data)
      history.push('/signin')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event: any) => {
    event.preventDefault()
    signup({
      variables: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password
      }
    })
  }

  return (
    <div className="registration-container">
      <div className="registration-items-container">
        <div className="registration-title-and-logo-container">
          <TitleAndLogo />
          <h2>Sign up</h2>
        </div>
        <form onSubmit={submit}>
          <div className="registration-inputs-container">
            <div>
              first name
              <br />
              <input
                value={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </div>
            <br />
            <div>
              last name
              <br />
              <input
                value={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </div>
            <br />
            <div>
              email/username
              <br />
              <input
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <br />
            <div>
              password
              <br />
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <br />
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