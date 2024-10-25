import React from 'react';
import useFetch from '../hooks/useFetch'; // Ajusta la ruta según tu estructura de carpetas

const UsuariosList = () => {
  const token = localStorage.getItem('token'); // Obtén el token de localStorage
  const { data: usuarios } = useFetch(`http://localhost:4000/usuarios`, token);

  // Función para manejar el clic en el botón de ver usuario
  const handleViewUser = (usuario) => {
    // Aquí puedes redirigir a una página de detalles o mostrar un modal
    alert(`Detalles del usuario:\nNombre: ${usuario.nombre}\nCorreo: ${usuario.correo}\nTeléfono: ${usuario.numero_telefono}\nFecha de Nacimiento: ${new Date(usuario.fecha_nacimiento).toLocaleDateString()}\nFecha de Creación: ${new Date(usuario.fecha_creacion).toLocaleDateString()}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista de Usuarios</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nickname</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Fecha de Nacimiento</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th> {/* Columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {usuarios?.map(usuario => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.nickname}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.numero_telefono}</td>
              <td>{new Date(usuario.fecha_nacimiento).toLocaleDateString()}</td>
              <td>{new Date(usuario.fecha_creacion).toLocaleDateString()}</td>
              <td>
                <button 
                  className="btn btn-info" 
                  onClick={() => handleViewUser(usuario)} // Llama a la función al hacer clic
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;
