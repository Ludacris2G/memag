import React from 'react'
import './Styles/Header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { logOut } from './firebase'

function Header() {
    const [{ basket, user }, updateState] = useStateValue()

    // the scroll position didn't refresh when changing sections
    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

  return (
    <div className='header'>
        <Link onClick={scrollToTop} to='/'>
        <h1 className='header__logo'>memag</h1>
        </Link>
        {/* <div className="header__searchBar">
            <input type="text" />
            <button className='header__searchButton'>
                <SearchIcon/>
            </button>
        </div> */}
        <div className="header__nav">
            <Link to={user ? '/' : '/login'}>
                <div className="header__option">
                    <small className="header__optionOne">Hello {user ? user?.email : 'Guest'}</small>
                    <span className='header__optionTwo'>{user ? <button onClick={logOut} className='header__logOutButton'>Log Out</button> : "Log In"}</span>
                </div>
            </Link>

            <Link to='/orders'>
            <div className="header__option">
                <div className="header__optionTwo">Orders</div>
            </div>
            </Link>

            <Link onClick={scrollToTop} to='/checkout'>
                <div className="header__cartOption">
                    <div className="header__optionOne">
                        <ShoppingCartIcon/>
                    </div>
                    <span className='header__cartCount'>{basket.length}</span>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default Header
