import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
import { useHistory } from 'react-router-dom'
import { TOKEN_NAME } from '../../../utils/constants'

interface SignInProps {
  setToken: any;
}

const SignIn = ({ setToken }: SignInProps) => {
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
      console.log("RESULT DATA USE EFFECT", result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem(TOKEN_NAME, token)
      history.push('/')
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event: any) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
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
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default SignIn