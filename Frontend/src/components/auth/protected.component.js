// import { Navigate } from "react-router-dom";
// import UserContext from "../../UserContext";

// const Protected = ({ isLoggedIn, children }) => {
//     if (!isLoggedIn) {
//         return <Navigate to="/" replace />;
//     }
//     return children;
// };

// Protected.contextType = UserContext;

// export default Protected;


import { Route, Redirect } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authAtom);
    return (
        <Route {...rest} render={props => {
            if (!auth) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorized so return component
            return <Component {...props} />
        }} />
    );
}