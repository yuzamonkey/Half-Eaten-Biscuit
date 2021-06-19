import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { CREATE_QUERY } from '../../../../queries';

const SendQuery = () => {

  const [content, setContent] = useState('')

  const [createQuery] = useMutation(CREATE_QUERY, {
    onError: (error) => {
      //setError(error.graphQLErrors[0].message)
      console.log("Error at create query mutation: \n", error.graphQLErrors[0].message)
    }
  })


  const submit = async (event: any) => {
    event.preventDefault()
    console.log(`submit called with ${content}`)
    createQuery({ variables: { content } })
    setContent('')
  }

  return (
    <div>
      <h2>Send Query</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            content <input
              value={content}
              onChange={({ target }) => setContent(target.value)}
            />
          </div>
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
};

export default SendQuery;