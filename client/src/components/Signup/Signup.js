import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import styled from "styled-components";

//
import { useDispatch, useSelector } from 'react-redux';
import { LoginCart, receiveUserInfo, requestUserInfo, receiveUserInfoError } from '../../actions';
//

//Reference Sebastian Silbermann - Materials UI OpenSource Code


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Tech6Gear.com
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp({ setLoginState }) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)
    const dispatch = useDispatch();


    const [userInfo, setUserInfo] = useState({
        user: '',
        pass: '',
    })


    const classes = useStyles();


    const handleClickOpen = () => {
        setOpen(true);
        setError(false)
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleDone = (e) => {
        e.preventDefault();
        console.log(userInfo, 'OUTSIDE ASYNC')


        const handleSignUp = async () => {
            dispatch(requestUserInfo())

            if (userInfo.user.length > 0 && userInfo.pass.length > 0) {
                let response = await fetch('/Signup', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                //successful sign up
                if (response.status === 200) {
                    let userCredentials = await response.json()
                    dispatch(receiveUserInfo(userCredentials))
                    setOpen(false)
                    setLoginState(false)
                }

                else if (response.status === 401) {
                    console.log("User Already Exists!")
                    //setError (will display error message)
                    setError(true)
                    //reset on CHange
                    setUserInfo({
                        ...userInfo,
                        user: '',
                        pass: ''
                    })
                    //dispatch error action 
                    dispatch(receiveUserInfoError())

                }
                else if (response.status === 400) {
                    console.log('Some error occured signing up')
                    //reset on CHange
                    setUserInfo({
                        ...userInfo,
                        user: '',
                        pass: ''
                    })
                    dispatch(receiveUserInfoError())

                }
            }
        }
        handleSignUp();

    }




    return (<>
        <StyledButton variant="outlined" onClick={handleClickOpen}>
            Register
      </StyledButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
        </Typography>
                    <form className={classes.form} onSubmit={handleDone}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required

                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                user: e.target.value,
                            })}
                            value={userInfo.user}
                            helperText={!error ? "" : "Existing User."}
                        />
                        <TextField

                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setUserInfo({
                                ...userInfo,
                                pass: e.target.value,
                            })}

                            value={userInfo.pass}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign up
                     </Button>
                        <Button onClick={handleClose}

                            fullWidth
                            variant="contained"
                            color="inherit"
                            className={classes.submit}
                        >
                            Cancel
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </Dialog>

    </>);
}

const StyledButton = styled.button`
    width: 70px; 
    border: none; 
    background: white; 
    color: #164C81;
    font-weight: 600; 
    border-radius: 3px; 
    margin-left: 1.2rem;
    transition-duration: 400ms; 
    cursor:pointer; 

    &:hover {
        background: #EEEEEE;
    }
`