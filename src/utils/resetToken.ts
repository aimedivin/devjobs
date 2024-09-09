const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 


const refreshToken = async () => {
    const token = localStorage.getItem('refreshToken');
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/token/${token}`)
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            localStorage.setItem('expirationTime', `${Date.now() + (3600 * 1000)}`);
        }
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expirationTime');
    }
}

export const checkExpiredToken = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    const token = localStorage.getItem('token');
    
    
    if (expirationTime && token) {
        if(Number(expirationTime) <= Date.now()) {
            refreshToken();
        }
    }
    return;
}