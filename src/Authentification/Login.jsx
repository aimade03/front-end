import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    function validateForm() {
        const err = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            err.email = ' this input required ';
        } else if (!emailRegex.test(email)) {
            err.email = ' this email invalid ';
        }
        if (!password) {
            err.password = 'this input required';
        }
        setError(err);
        
        return Object.keys(err).length === 0;
    }

    async function handle_Submit(e) {
        e.preventDefault();
        if (validateForm()) {
            const item = { email, password };
            
            try {
                const response = await fetch('http://localhost:8000/api/login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to login');
                }
                const responseData = await response.json();
                if (responseData.error) {
                    setError({ data: responseData.error });
                } else {
                    localStorage.setItem('user_info', JSON.stringify(responseData));
                    navigate('/');
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        }
        
    }

    return (
        <div>
            <div className="border border-rounded bg-black">
                <form onSubmit={handle_Submit} >
                    <label className="form-label" > email </label>
                    <input type="text" className="form-controll" onChange={(e) => setEmail(e.target.value)} />
                    <label className="form-label" > password </label>
                    <input type="password" className="form-controll" onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value={'connecter'} />
                </form>
                {error && (
                    <div className="error-message">
                        {Object.values(error).map((errorMessage, index) => (
                            <p key={index}>{errorMessage}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
