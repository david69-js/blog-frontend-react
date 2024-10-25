// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import Userlist from './pages/Userlist';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ArticleForm from './components/articles/ArticleForm/ArticleForm';
import ArticlePage from './pages/ArticlePage';
import Navbar from './components/Navbar';
import ArticleItem from './components/articles/ArticleItem';
import CreateForm from './components/articles/ArticleForm/CreateForm';


const App = () => {
    const { usuario } = useSelector((state) => state.user); 
    const newUser = usuario?.usuario;
    return (
        <Router>
            <Navbar user={usuario}/>
            <Routes>
                {usuario ? (
                    <>
                        {/* Rutas accesibles solo si el usuario está logueado */}
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        
                       
                        {newUser && newUser.rol === 'Administrador' && (
                            <Route path="/usuarios" element={<Userlist />} />
                        )}

                        <Route path="/articulos" element={<ArticlePage />} />
                        <Route path="/articulos/editar/:id_articulo" element={<ArticleForm />} />
                        <Route path="/articulos/ver/:id_articulo" element={<ArticleItem />} />
                        <Route path="/articulos/crear" element={<CreateForm />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        {/* Rutas accesibles solo si el usuario no está logueado */}
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        {/* Redirecciona cualquier ruta desconocida a la página de login */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};

export default App;
