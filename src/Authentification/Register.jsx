import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    function validateForm() {
        const errors = [];
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            errors.push('Email is required');
        } else if (!emailRegex.test(email)) {
            errors.push('Invalid email');
        }
    
        if (!password) {
            errors.push('Password is required');
        } else if (password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
    
        setErrors(errors);
    
        // Return true if there are no errors, false otherwise
        return errors.length === 0;
    }
    

    async function handle_Submit(e){
        e.preventDefault();
        const item = { email, password, name };
        if(validateForm()){
            try {
                const response = await fetch('http://localhost:8000/api/register',{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                });
                const responseData = await response.json();
                if(responseData.error){
                    setErrors([responseData.error]);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                setErrors(['An error occurred. Please try again later.']);
            }
        }
    }

    return(
        <div>
            <div className="card">
                <form onSubmit={handle_Submit}>
                    <label>email</label>
                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>name</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="submit" value="Send Information" />
                    {errors.length > 0 && (
                    <div className="error-message">
                        {errors.map((errorMessage, index) => (
                            <p key={index}>{errorMessage}</p>
                        ))}
                    </div>
                )}

                </form>
            </div>
        </div>
    );
}
