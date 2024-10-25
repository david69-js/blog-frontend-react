
import React from 'react';

const UserProfile = ({ user }) => {
    return (
        <div className="card mb-4">
            <img 
                src={user.imagen_perfil} 
                alt={`${user.nombre}'s profile`} 
                className="card-img-top" 
            />
            <div className="card-body">
                <p className="card-text">
                    <strong>Nombre:</strong> {user.nombre}
                </p>
                <p className="card-text">
                    <strong>Nickname:</strong> {user.nickname}
                </p>
                <p className="card-text">
                    <strong>Correo:</strong> {user.correo}
                </p>
                <p className="card-text">
                    <strong>Número de Teléfono:</strong> {user.numero_telefono}
                </p>
                <p className="card-text">
                    <strong>Fecha de Nacimiento:</strong> {new Date(user.fecha_nacimiento).toLocaleDateString()}
                </p>
                <p className="card-text">
                    <strong>Rol:</strong> {user.rol}
                </p>
                <p className="card-text">
                    <strong>Fecha de Creación:</strong> {new Date(user.fecha_creacion).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
