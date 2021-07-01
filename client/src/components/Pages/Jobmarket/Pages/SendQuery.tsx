import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { CREATE_JOBQUERY } from '../../../../graphql/mutations';

const SendQuery = () => {

  const [content, setContent] = useState('')

  const [createQuery] = useMutation(CREATE_JOBQUERY, {
    onError: (error) => {
      console.log("Error at create query mutation: \n", error)
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
          <ul>
            <li>what are you lookin for? ( single players | group )</li>
            <li>salary ( no | negotiable | by hour | fixed )</li>
            <li>description</li>
            <li>location ( single | multiple )</li>
          </ul>
          <br></br>
          <div>
            description <input
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