import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/form.css'

export default function Form(props){
    const [loginData, setLoginData] = useState({
        email:"", password:""
    })

    const [res, setRes] = useState("");
    const navigate = useNavigate();

    function handleLoginChange(event){
        const {name, value} = event.target;
        setLoginData(function(prevData){
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    function submitLoginForm(event){
        event.preventDefault();
        fetch('http://127.0.0.1:5000/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(loginData),
        }).then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if(data[0].success){
                setRes(data[0].success);
                props.login(data[0].currentUser);
                setTimeout(()=>navigate('/dashboard'), 2000);
            }
            else setRes(data[0].failure)

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    const [signUpData, setSignUpData] = useState({
        email:"", username:"", password:"", confirmPassword: ""
    })

    function handleSignUpChange(event){
        const {name, value} = event.target;
        setSignUpData(function(prevData){
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    function submitSignupForm(event){
        event.preventDefault();
        console.log(event.form)
        fetch('http://127.0.0.1:5000/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(signUpData),
        }).then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if(data[0].success){
                setRes(data[0].success)
                setTimeout(()=>navigate('/dashboard'), 2000);
                
            }else setRes(data[0].failure)
            
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }

    useEffect(()=>{
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
            setRes("");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            setRes("");
        });
    }, [])

    return (
        
            <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form className="forms" onSubmit={submitSignupForm}>
                    <h1 className="heading1">Create Account</h1>
                    <div className="social-container">
                        <a className="links" href="#" ><i className="fab fa-facebook-f"></i></a>
                        <a className="links" href="#" ><i className="fab fa-google-plus-g"></i></a>
                        <a className="links" href="#" ><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span className="statusSpan">{res}</span>
                    <input className="inputField" type="text" placeholder="Name" name="username" value={signUpData.username} onChange={handleSignUpChange}/>
                    <input className="inputField" type="email" placeholder="Email" name="email" value={signUpData.email} onChange={handleSignUpChange}/>
                    <input className="inputField" type="password" placeholder="Password" name="password" value={signUpData.password} onChange={handleSignUpChange}/>
                    <input className="inputField" type="password" placeholder="Password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleSignUpChange}/>
                    <button className='btn'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form className="forms" onSubmit={submitLoginForm}>
                    <h1 className="heading1">Dashboard</h1>
                    <div className="social-container">
                        <a className="links" href="#" ><i className="fab fa-facebook-f"></i></a>
                        <a className="links" href="#" ><i className="fab fa-google-plus-g"></i></a>
                        <a className="links" href="#" ><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span className="statusSpan">{res}</span>
                    <input className="inputField" type="email" placeholder="Email" name="email" value={loginData.email} onChange={handleLoginChange}/>
                    <input className="inputField" type="password" placeholder="Password" name="password" value={loginData.password} onChange={handleLoginChange}/>
                    <a className="links" href="#">Forgot your password?</a>
                    <button className='btn'>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="heading1">Welcome Back!</h1>
                        <p className="para">To keep connected with us please login with your personal info</p>
                        <button className="btn ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="heading1">Hello, Friend!</h1>
                        <p className="para">Enter your personal details and start journey with us</p>
                        <button className="btn ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>

    

    )
}