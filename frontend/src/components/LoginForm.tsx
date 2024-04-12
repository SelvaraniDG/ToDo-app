import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, Box, TextField, Button, FormControlLabel, Checkbox, Grid, Link } from '@mui/material';




const LoginForm: React.FC = () => {
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
 


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = () => {
    let formIsValid = true;
    const newErrors: { [key: string]: string } = {};

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidation()) {
      // Form is valid, perform login action
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
          marginTop={10}
          padding={10}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          bgcolor="rgba(168, 218, 253, 0.8)"
          sx={{ margin: '0 auto' }}
        >
          <Box display='flex' bgcolor="rgba(255, 255, 255, 0.8)" fontWeight='Bold' marginBottom={4} borderRadius={4} padding={"10px 30px"}><Typography>Log in</Typography></Box>
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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <FormControlLabel 
                label='Remember me' 
                control={<Checkbox style={{ color: 'black' }} checked={rememberMe} onChange={handleCheckboxChange} />} // Set checkbox color to black
              />
            </Grid>
            <Grid item>
              <Typography color="black" variant="body2">
                <Link href="#" color="inherit">Forgot Password?</Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Typography color="black" variant="body2">
              Don't have an account? <Link href="/register" color="inherit">Register</Link>
            </Typography>
          </Grid>
          <Button type="submit" sx={{ width: '80%', marginTop: 5, backgroundColor: '#2196f3', color: 'white', borderRadius: 20 }}>Login</Button>
        </Box>
      </form>
    </ThemeProvider>
  );
}

export default LoginForm;
