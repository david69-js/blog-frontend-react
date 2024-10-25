import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js'; // Asegúrate de tener un hook para la autenticación

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth(); // Obtén el estado de autenticación

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" /> // Redirige a la página de inicio de sesión si no está autenticado
                )
            }
        />
    );
};

export default PrivateRoute;
