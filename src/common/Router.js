import React from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ScrollToTop from "./ScrollToTop";
import Detail from "../volunteer/detail/Detail";
import GuestNav from "../guest/nav/GuestNav";
import GuestInfo from "../volunteer/detail/GuestInfo";
import ForumItem from "../chat/ForumItem";
import ChatItem from "../chat/ChatItem.js";
import App from "../App";
import Register from "../Register";
import Userflg from "../Userflg";
import Nav from "../volunteer/nav/Nav";
import GuestDetail from "../guest/detail/GuestDetail";
import VolunteerInfo from "../guest/detail/VolunteerInfo";
import VolunteerSelect from "../guest/detail/VolunteerSelect";

const Router = () => {
    return (
        <>
        <BrowserRouter>
            <ScrollToTop>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/userflg" component={Userflg} />
                <Route exact path="/volunteer" component={Nav} />
                <Route exact path="/volunteer/detail" component={Detail} />
                <Route exact path="/volunteer/guestprofile" component={GuestInfo} />
                <Route exact path="/guest" component={GuestNav} />
                <Route exact path="/guest/detail" component={GuestDetail} />
                <Route exact path="/guest/volunteerprofile" component={VolunteerInfo} />
                <Route exact path="/guest/volunteerselect" component={VolunteerSelect} />
                <Route exact path="/forum" component={ForumItem} />
                <Route exact path="/chat" component={ChatItem} />
            </Switch>
            </ScrollToTop>
        </BrowserRouter>
        </>
    )
}

export default Router
