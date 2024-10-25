import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slices/userSlice';

const Navbar = () => {
    const { usuario } = useSelector((state) => state.user); // Accede al estado de usuario desde Redux
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Mi Blog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {usuario ? (
                                <>
                                    {/* Mostrar Perfil y Logout si el usuario está logueado */}
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/profile">Perfil</NavLink>
                                    </li>

                                    {usuario.usuario && usuario.usuario.rol === 'Administrador' && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/usuarios">Usuarios</NavLink>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/articulos">Artículos</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/articulos/crear">Crear Articulo</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* Mostrar Login y Register si el usuario no está logueado */}
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </>
                            )}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
