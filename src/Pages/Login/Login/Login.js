import React, { useRef } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "../../../firebase.init";
import Social from "../Social/Social";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  let errorMessage;

  if (loading) {
    return (
      <div className="w-100 d-flex justify-content-center align-item-center">
        <Spinner animation="border" variant="primary"></Spinner>
      </div>
    );
  }

  if (error) {
    errorMessage = (
      <div>
        <p className="text-danger">Error: {error?.message}</p>
      </div>
    );
  }

  if (user) {
    navigate(from, { replace: true });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
  };

  const navigateRegister = (event) => {
    navigate("/register");
  };

  const handleResetPassword = async () => {
    const email = emailRef.current.value;
    await sendPasswordResetEmail(email);
    if (email) {
      toast("Sent email");
    } else {
      toast("Please Enter Your Email");
    }
  };

  return (
    <div className="container w-50 mx-auto">
      <h2 className="text-primary text-center mt-2">Please Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            ref={emailRef}
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            ref={passwordRef}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          className="d-block w-50 mx-auto mb-2"
          type="submit"
        >
          Login
        </Button>
      </Form>
      {errorMessage}
      <p>
        New to Genius Car?{" "}
        <Link
          to="/register"
          className="text-primary pe-auto text-decoration-none"
          onClick={navigateRegister}
        >
          Please Register
        </Link>{" "}
      </p>
      <p>
        Forgot Password?{" "}
        <button
          className="btn btn-link text-primary pe-auto text-decoration-none"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>{" "}
      </p>
      <ToastContainer />
      <Social></Social>
    </div>
  );
};

export default Login;
