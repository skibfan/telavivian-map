import { Link } from "react-router-dom"
import { Button, Stack } from '@mui/material'
import Login from "./user_account/Login"
import Auth from "../auth/Auth"
import Logout from "./user_account/Logout"
import Register from "./user_account/Register"

const Header = () => {
    return(<div id="header">
<Stack spacing={{ xs: 0.5, sm: 2 }} direction={"row"} justifyContent={"space-between"}>
    <Stack spacing={{ xs: 0.5, sm: 2 }} direction={"row"}>
        <Button component={Link} to='/' size="small" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, px: { xs: 1, sm: 2 } }}>Dashboard</Button>
        <Button component={Link} to='/about' size="small" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, px: { xs: 1, sm: 2 } }}>About</Button>
    </Stack>
    <Stack id="login-register" spacing={{ xs: 0.5, sm: 2 }} direction={'row'}>
        <Auth placeholder={<Login />}><Logout/></Auth>
        <Register />
    </Stack>
</Stack>
    </div>)
}

export default Header