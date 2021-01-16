import React from 'react'
import Title from '../../common/Title'
import RequestTab from './RequestTab'

// VolunteerのTop画面。
const Request = ({myId, mynickname, mypic, history}) => {
    return (
        <>
            <Title title="リクエスト" history={history}/>
            <RequestTab 
                myId={myId}
                mynickname={mynickname}
                mypic={mypic}
                history={history}
                />
        </>
    )
}

export default Request
