import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import imageLogo from '../assest/logo_blogger_40px_2x.png'
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import './Header.css'
import MiniDrawer from '../Drawer/drawer';
import { useNavigate } from 'react-router-dom';
import imageOfAccountIcon from '../assest/imageAccoun2.jpg'
function Header(props) {
    const [drawer, setDrawer] = React.useState(false)
    
    const navigte = useNavigate()
    const listenToHeader = () => {
        setDrawer(!drawer)
    }
    const takeToCreatenewPost = () => {
        navigte("/createPost")
    }

    const onClickOnDashBoard = () =>{
        navigte("/dashboard")
    }
    return (
        <>
            <div className='header-main'>
                <div className='meun-icn' onClick={listenToHeader}><MenuIcon /></div>
                <img src={imageLogo} className='img-logo-blog' height={"45px"} />
                <Button onClick={onClickOnDashBoard} style={{color:'orange',marginLeft:'30px'}} className=''>Dashboard</Button>
                <div onClick={takeToCreatenewPost} className='rgt-icon-header'>
                  {props.propValue ?<div style={{marginLeft:'140px'}}></div>  :  <Button style={{color:'orange'}} className='addIcnBlock'><AddIcon style={{ marginLeft: '0px' }} /> NEW POST</Button>}
                </div>
                <div className='account-icon'><img src={imageOfAccountIcon} height={'52px'} width={'52px'} /></div>
            </div>
           
            <MiniDrawer open={drawer} />
        </>
    )
}

export default Header