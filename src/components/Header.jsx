import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../assets/header.css'

export default function Header(props){
    
    const [res, setRes] = useState("");
    const navigate = useNavigate();

    function handleLogout(event){
        event.preventDefault();
        fetch('https://deadpool2411.pythonanywhere.com/auth/logout', {
            method: "POST",

        }).then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            if(data[0].success){
                setRes(data[0].success)
                navigate('/')
                props.logout("");
            }
            else setRes(data[0].failure)
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
        
        
    }
    return (
        <>  
            <div>
                <div className="header">
                    <button className='bttn'>dashboard</button>
                    <form onSubmit={handleLogout}>
                        <button className='bttn' type='submit'>Log out</button>
                    </form>
                </div> 
            </div>
            
            
        </>
    )
}