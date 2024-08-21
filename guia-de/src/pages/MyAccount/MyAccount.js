import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'; // Corrigido para 'jwt-decode'
import axios from 'axios';
import './MyAccount.css';

function MyAccount() {
    const [userInfo, setUserInfo] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (token && storedUserInfo) {
            setUserInfo(storedUserInfo);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;

        const decodedToken = jwtDecode(token); 
        console.log('Decoded Token:', decodedToken);

        const { name, email } = decodedToken;

        console.log('Name:', name);
        console.log('Email:', email);

        axios.post('http://localhost:4000/user/login', { token })
            .then(response => {
                console.log('User login successful:', response.data);
                localStorage.setItem('userToken', token);
                localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                setUserInfo(response.data.user);
                setIsAuthenticated(true);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        setIsAuthenticated(false);
    };

    return (
        <GoogleOAuthProvider clientId="1081907781487-mg1jul5pngiq8vep4no71gr050mo78hk.apps.googleusercontent.com">
            <div className="conteiner">
                <header className="myaccount">
                    {isAuthenticated ? (
                        <div>
                            <p className="welcome">Bem-Vindo<br></br></p><p className="name">{userInfo.username}!</p>
                            <p className="email">Email: {userInfo.email}</p>
                            <button onClick={handleLogout} className="button">Sair agora</button>
                        </div>
                    ) : (
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    )}
                </header>
            </div>
        </GoogleOAuthProvider>
    );
}

export default MyAccount;
