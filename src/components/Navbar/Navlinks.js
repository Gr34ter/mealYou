import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import {AiOutlinePoweroff} from "react-icons/ai"

const Navlinks = ({ handleMenu }) => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
        handleMenu()
    }


    return ( 
        <ul>
            <Link to='/' className="menu-item" onClick={handleMenu}><li>Home</li></Link>

            <Link to='/about' className="menu-item" onClick={handleMenu}><li>About</li></Link>

            <Link to='/contact' className="menu-item" onClick={handleMenu}><li>Contact</li></Link>

            {!user && <Link to='/signup' className="menu-item" onClick={handleMenu} ><li>Signup</li></Link>}

            {!user && <Link to='/login' className="menu-item" onClick={handleMenu}><li>Login</li></Link> }

            {user && <Link to='/logout' className='logout-wrapper menu-item' onClick={() => handleLogout()}><li className='logout menu-item'>Logout</li><AiOutlinePoweroff className='logout-icon'/></Link>}  
        </ul> );
}
 
export default Navlinks;