import React, { useState, CSSProperties } from 'react'

import Button from '../../UI/Button'

import './Login.css'

import { API_BASE_URL } from '../../../utils/global'
import Notification from '../../Notification/Notification'

interface propsType {
    signUpFormActive: () => void
    removeAuth: () => void
}

interface FormData {
    email: string;
    password: string;
}

const Login = (props: propsType) => {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [isCompany, setIsCompany] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const signUpFormLink = () => {
        props.signUpFormActive()
    }

    const loginFormHandler = async (event: React.FormEvent<HTMLFormElement>,) => {
        event.preventDefault();
        setLoading(true)
        let response;

        if (isCompany) {
            response = await fetch(`${API_BASE_URL}/api/auth/company/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );
            localStorage.setItem('isCompany', 'true');
        } else {
            response = await fetch(`${API_BASE_URL}/api/auth/user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            localStorage.setItem('isCompany', 'false')
        }

        if (response.ok) {
            const { token, refreshToken } = await response.json();
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', token);
            setNotification('')
            setLoading(false);
            props.removeAuth();
        } else {
            setNotification('Invalid Credentials.')
            setTimeout(() => {
                setNotification('')
            }, 3000);
            setLoading(false)
        }
    }

    return <form action="" onSubmit={loginFormHandler} className="form">
        {isCompany && <div className='badge'>Company</div>}
        {notification.length ? <Notification text={notification} /> : ''}
        <h2>Login</h2>
        <label htmlFor="email">
            <span>Email</span>
            <input type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder="example@gmail.com" id="email" />
        </label>
        <label htmlFor="password">
            <span>Password</span>
            <input type="password" name='password' value={formData.password} onChange={handleInputChange} placeholder="Your password" id="password" required />
        </label>
        <div className='sub--form-action' >
            <p className='sign-as'>
                {isCompany ? 'For non-company users sign in ' : 'Sign in as a company '}
                <span className='login--signup-here' onClick={() => { setIsCompany(!isCompany) }}>here</span></p>
            <p>
                Don't have account
                <span className='login--signup-here' onClick={signUpFormLink}> Sign up</span>
            </p>
        </div>
        <Button className='' text='Login' loading={loading} />
    </form>
}
export default Login