import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, Box, TextField, Button, Grid, Link } from '@mui/material';

function Register() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#A8DAFD', // Light blue color
      },
    },
    typography: {
      fontFamily: 'Roboto, Montserrat', // Change font style here
    },
  });

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = () => {
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
      formIsValid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required';
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      // Form is valid, perform register action
      window.location.href = '/homepage';
      console.log('Form submitted successfully');
    } else {
      // Form is invalid, display errors
      console.log('Form validation failed');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar>
        <Toolbar>
          <Typography variant='h6' component='div' fontWeight='bold'>TO-DO APP</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit}>
        <Box 
          display='flex' 
          flexDirection={'column'} 
          maxWidth={400} 
          alignItems='center' 
          justifyContent={'center'}
          margin={4}
          marginLeft={44}
          marginTop={10}
          padding={10}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          bgcolor="rgba(168, 218, 253, 0.8)"
        >
          <Box display='flex' bgcolor="rgba(255, 255, 255, 0.8)" fontWeight='Bold' marginBottom={4} borderRadius={4} padding={"10px 30px"}><Typography>Register</Typography></Box>
          <TextField 
            label="Email" 
            margin='normal' 
            type='email' 
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' } }}
            sx={{ width: '100%' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField 
            label="Username" 
            margin='normal' 
            type='text' 
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' } }}
            sx={{ width: '100%' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField 
            label="Password" 
            margin='normal' 
            type='password' 
            InputLabelProps={{ style: { color: 'black' } }}
            InputProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.8)', color: 'black' } }}
            sx={{ width: '100%' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Grid container justifyContent="flex-end">
            <Typography color="black" variant="body2">
              Already have an account? <Link href="/" color="inherit">Log in</Link>
            </Typography>
          </Grid>
          <Button type="submit" sx={{ width: '80%', marginTop: 3, backgroundColor: '#2196f3', color: 'white', borderRadius: 20 }}>Register</Button>
        </Box>
      </form>
    </ThemeProvider>
  );
}

export default Register;
