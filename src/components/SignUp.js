import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Navbar, Nav, Container  as Cont} from "react-bootstrap";

function SignUp() {
      const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(12),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "10px",
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.dark,
        },
        form: {
          width: "100%", // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
        Btn: {
          fontSize: 20,
          backgroundColor: theme.palette.background.dark,
          color: "#3f51b5",
          fontFamily: "inherit",
        },
        container: {
          backgroundColor: theme.palette.background.dark,
          borderRadius: "3%",
          marginTop: theme.spacing(10),
        },
        sinupGrid: {
          marginLeft: "auto",
        },
      }));


  const classes = useStyles();
  let navigate = useNavigate();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [mobile, setMobile] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let role = 2;
  let [passwordMatch, setMatch] = useState("");

  useEffect(() => {
    if (password === confirmPassword) setMatch(false);
    else setMatch(true);
  });

  let handleSubmit = async () => {
    let res = await axios.post("https://express-video-app.herokuapp.com/users/signup", {
      firstName,
      lastName,
      email,
      mobile,
      password,
      role,
    });
    console.log(res);
    if (res.data.statusCode === 200) {
      navigate("/login");
    }
    else{
          alert(res.data.message)
        }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Cont>
          <div style={{ float: "left" }}>
            <Navbar.Brand href="#home">Video Streaming App</Navbar.Brand>
          </div>
          <div>
            <Nav className="me-auto">
              <Nav.Link href="#">
                {" "}
                <button
                  style={{ backgroundColor: "white" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </Nav.Link>
            </Nav>
          </div>
        </Cont>
      </Navbar>
      <Container className={classes.container} component="main" maxWidth="xs">
        <h2
          style={{
            textAlign: "center",
            paddingTop: "5px",
            color: "white",
            backgroundColor: "#3f51b5",
          }}
        >
          Sign Up
        </h2>

        <div>
          <form className={classes.form} noValidate>
            <TextField
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Firstname"
              label="Firstname"
              name="Firstname"
              autoComplete="Firstname"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="LastName"
              label="LastName"
              name="LastName"
              autoComplete="LastName"
              autoFocus
            />

            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Mobile"
              label="Mobile"
              name="Mobile"
              autoComplete="Mobile"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="Confirm_passowrd"
              label="Confirm_passowrd"
              type="passowrd"
              id="Confirm_passowrd"
              autoComplete="confirm -password"
            />
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
              <br></br>
              {passwordMatch ? (
                <div style={{ color: "red" }}>*Password Should Match!*</div>
              ) : (
                <></>
              )}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default SignUp;
