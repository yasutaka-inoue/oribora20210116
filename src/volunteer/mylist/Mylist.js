import React from 'react'
import Title from '../../common/Title'
import MylistTab from './MylistTab'

const Mylist = ({myId, mypic, mynickname, history}) => {
    return (
        <>
        <Title title="マイリスト" history={history}/>
        <MylistTab 
            myId={myId}
            mypic={mypic}
            mynickname={mynickname}
            history={history}
            />           
        </>
    )
}

export default Mylist