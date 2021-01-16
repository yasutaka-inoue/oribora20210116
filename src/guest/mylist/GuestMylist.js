import React from 'react'
import Title from '../../common/Title'
import MylistTab from './MylistTab'

const GuestMylist = ({myId, mypic, mynickname, history}) => {
    return (
        <>
            <Title title="マイリスト" history={history}/>
            <MylistTab 
                myId={myId}
                mynickname={mynickname}
                mypic={mypic}
                history={history}/>    
        </>
    )
}

export default GuestMylist
