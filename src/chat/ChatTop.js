import React from 'react'
import Title from '../common/Title'
import ChatTab from './ChatTab'

const ChatTop = ({myId, history}) => {
    return (
        <>
        <Title title="チャット" history={history}/>
        <ChatTab myId={myId} history={history}/>           
        </>
    )
}

export default ChatTop
