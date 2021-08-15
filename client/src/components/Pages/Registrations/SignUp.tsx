import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { SIGNUP } from '../../../graphql/mutations'

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
    <div>
      <h2>Sign up</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          first name <input
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
        </div>
        <div>
          last name <input
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Sign up</button>
      </form>
    </div>
  )
}

export default SignUp;