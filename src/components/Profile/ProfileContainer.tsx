import {Profile} from "./Profile.tsx";
import {connect} from "react-redux";
import React from "react";
import {
    profileNew,
    savePhoto,
    userProfileThunk,
    userStatusThunk,
    userUpdateStatusThunk
} from "../Redux/ProfileReducer.ts";

import AuthRedirect from "../Hoc/AuthRedirect.tsx";
import {compose} from "redux";









export class ProfileContainer extends React.Component {
    refreshProfile() {

        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authId
        }
        if (!userId) {
            this.props.history.push("/profile");
        }
        this.props.userProfileThunk(userId)
        this.props.userStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps) {

        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <Profile {...this.props} status={this.props.status} profile={this.props.profile}
                     userUpdateStatusThunk={this.props.userUpdateStatusThunk} owner={!this.props.match.params.userId}
                     savePhoto={this.props.savePhoto} profileNew={this.props.profileNew}/>
        )
    }
}

const mapStateToProps = (state: any) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authId: state.auth.id
});





export default compose(AuthRedirect, connect(mapStateToProps, {
    userProfileThunk,
    userStatusThunk,
    userUpdateStatusThunk,
    savePhoto,
    profileNew
}))(ProfileContainer)