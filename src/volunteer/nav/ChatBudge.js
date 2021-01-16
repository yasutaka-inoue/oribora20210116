import React from 'react'
import { Badge } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

const ChatBudge = ({myId}) => {
    // const [invisibleChat, setInvisibleChat] = useState(true);
    
    return (
        <>
            <Badge variant="dot" color="secondary" invisible>
                <MessageIcon />
            </Badge>
        </>
    )
}

export default ChatBudge
