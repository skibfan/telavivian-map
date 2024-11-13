import { useState,  FormEvent, ReactElement} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Alert } from '@mui/material';

const Login = (): ReactElement => {
  const [open, setOpen] = useState(false);
  const [loginError, setLoginError] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (email: string, password: string) => {
    const path = import.meta.env.VITE_MY_PATH
    try {
       const response = await axios.post(`${path}/api/login`, {
            email, password
        }, 
        {withCredentials: true})
        
        if (response.status !== 401) {
            setOpen(false);
            window.location.reload()
        }
    } catch (error) {
        setLoginError(true)
    }
  }

  return (
    <>
      <Button variant="contained" 
      onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            const password = formJson.password;
            handleClose(email, password);
          },
        }}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To be able to save your favorite locations, we suggest you to login into your account.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

        <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setLoginError(false)
            setOpen(false)
            }}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
        {
            loginError ? <Alert severity='error'  onClose={() => setLoginError(false)}>Incorrect e-mail or password</Alert> : null
        }
      </Dialog>
    </>
  );
}

export default Login