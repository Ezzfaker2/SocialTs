import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {AppStateType} from "../Redux/stateRedux.ts";


const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});


const AuthRedirect = (Component) => {
    const AuthRedirectComponent = (props) => {

        if (!props.isAuth) return <Navigate to='/Login' replace/>;


        return <Component {...props} />;
    };


    return connect(mapStateToProps)(AuthRedirectComponent);
};

export default AuthRedirect;