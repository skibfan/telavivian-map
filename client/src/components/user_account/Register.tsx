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


const Register = (): ReactElement => {
    const [open, setOpen] = useState(false);
    const [registerError, setRegisterError] = useState(false)
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = async (email: string, username: string, password: string) => {
      try {
         const regresp = await axios.post('http://localhost:3001/api/register', {
              email, username, password
          }, 
          {withCredentials: true})

          if (regresp.status !== 200) {
            setRegisterError(true)
          } else {
            
          const response = await axios.post('http://localhost:3001/api/login', {
            email, password
            }, 
            {withCredentials: true})

          if (response.status !== 401) {
              setOpen(false);
              window.location.reload()
          }
        }
      } catch (error) {
          setRegisterError(true)
      }
    };
  
    return (
      <>
        <Button variant="contained" 
        onClick={handleClickOpen}>
          Register
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
              const username = formJson.username
              const password = formJson.password;
              handleClose(email, username, password);
            },
          }}
        >
          <DialogTitle>Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To be able to save your favorite locations, we suggest you to register a personal account.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />

        <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="username"
              type="text"
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
              setRegisterError(false)
              setOpen(false)
              }}>Cancel</Button>
            <Button type="submit">Register</Button>
          </DialogActions>
          {
              registerError ? <Alert severity='error'  onClose={() => setRegisterError(false)}>Please, try again with correct credentials.</Alert> : null
          }
        </Dialog>
      </>
    );
}

export default Register