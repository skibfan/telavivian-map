import { Link } from "react-router-dom"
import { Button, Stack } from '@mui/material'
import Login from "./user_account/Login"
import Auth from "../auth/Auth"
import Logout from "./user_account/Logout"
import Register from "./user_account/Register"

const Header = () => {
    return(<div id="header">
<Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
    <Stack spacing={2} direction={"row"} >
        {/* <Button>Dashboard</Button> */}
        {/* <Button LinkComponent={Link} to='/'>Dashboard</Button> */}
        
        <Button component={Link} to='/'>Dashboard</Button>
        <Button component={Link} to='/about'>About</Button>
        
    </Stack>
    <Stack  id="login-register" spacing={2} direction={'row'}> 
            {/* <Login/> */}
            <Auth placeholder={<Login />}><Logout/></Auth>
            <Register />
        </Stack>
    </Stack>
    </div>)
}

export default Header