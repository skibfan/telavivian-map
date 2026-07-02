import { Button } from "@mui/material"
import axios from "axios";
import { ReactElement } from "react";



const Logout = (): ReactElement => {
  const path = import.meta.env.VITE_MY_PATH
    const handleLogout = async () => {
        try {
            await axios.get(`${path}/api/logout`, 
            {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log('something in logout went wrong:, ',error);
            
        }
    }

    return(<>
    <Button variant="contained" size="small" onClick={() => handleLogout()}
      sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, px: { xs: 1, sm: 2 } }}>
      Logout
    </Button>
    </>)
}

export default Logout