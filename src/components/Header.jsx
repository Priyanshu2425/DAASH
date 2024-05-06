import { useNavigate } from 'react-router-dom';
import '../assets/header.css'

export default function Header(){
    
    const navigate = useNavigate();

    function handleLogout(event){
        event.preventDefault();
        localStorage.removeItem('auth_token');
        navigate('/');
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