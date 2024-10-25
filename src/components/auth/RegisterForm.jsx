// src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { registerUser } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice'; // Importa la acción para establecer el usuario
import { useNavigate } from 'react-router-dom'; // Para redirigir después de registrar

const RegisterForm = () => {
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const dispatch = useDispatch(); // Inicializa el hook useDispatch
  const [formData, setFormData] = useState({
    nombre: '',
    nickname: '',
    correo: '',
    contrasenia: '',
    imagen_perfil: '',
    numero_telefono: '',
    fecha_nacimiento: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Resetea el error

    try {
      const data = await registerUser(formData);
      console.log('Usuario registrado:', data);

      // Almacena el token y la información del usuario en el almacenamiento local
      localStorage.setItem('token', data.token); // Asegúrate de que el token se devuelva al registrar
      localStorage.setItem('usuario', JSON.stringify(data.usuario)); // Almacena la información del usuario

      // Almacena el usuario en el estado global (Redux)
      dispatch(setUser(data.usuario));

      // Redirige a la página de perfil después de registrar
      navigate('/profile'); // Cambia a la ruta que desees
    } catch (err) {
      setError(err.message || 'Error al registrar usuario.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nickname:</label>
          <input 
            type="text" 
            name="nickname" 
            value={formData.nickname} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo:</label>
          <input 
            type="email" 
            name="correo" 
            value={formData.correo} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input 
            type="password" 
            name="contrasenia" 
            value={formData.contrasenia} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen de Perfil (URL):</label>
          <input 
            type="url" 
            name="imagen_perfil" 
            value={formData.imagen_perfil} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Teléfono:</label>
          <input 
            type="text" 
            name="numero_telefono" 
            value={formData.numero_telefono} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento:</label>
          <input 
            type="date" 
            name="fecha_nacimiento" 
            value={formData.fecha_nacimiento} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
      {error && <div className="mt-3 alert alert-danger">{error}</div>}
    </div>
  );
};

export default RegisterForm;
