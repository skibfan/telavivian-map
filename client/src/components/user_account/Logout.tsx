import { Button } from "@mui/material"
import axios from "axios";
import { ReactElement } from "react";



const Logout = (): ReactElement => {

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3001/api/logout', 
            {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log('something in logout went wrong:, ',error);
            
        }
    }

    return(<>
    <Button variant="contained" 
      onClick={() => handleLogout()}>
        Logout
      </Button>
    </>)
}

export default Logout