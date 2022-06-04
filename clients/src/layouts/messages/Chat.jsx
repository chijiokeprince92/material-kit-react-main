import React from 'react'

const Chat = ({message}) => {
  return (
    <div>
       {message.map((m) => (
            <p>message is : {m}</p>
        ))}
    </div>
  )
}

export default Chat