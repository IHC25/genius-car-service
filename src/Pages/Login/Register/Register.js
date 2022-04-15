import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import "./Register.css";
import auth from "../../../firebase.init";
import Social from "../Social/Social";
import { Spinner } from "react-bootstrap";

const Register = () => {
  const [agree, setAgree] = useState(false);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-100 d-flex justify-content-center align-item-center">
        <Spinner animation="border" variant="primary"></Spinner>
      </div>
    );
  }

  let errorMessage;
  if (error) {
    errorMessage = (
      <div>
        <p className="text-danger">Error: {error?.message}</p>
      </div>
    );
  }

  if (user) {
    navigate("/home");
  }

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;

    if (agree) {
      createUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="register-form">
      <h2 style={{ textAlign: "center" }}>Please Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" id="" placeholder="Your Name" />

        <input
          type="email"
          name="email"
          id=""
          placeholder="Email Address"
          required
        />

        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          required
        />

        <input
          onClick={() => setAgree(!agree)}
          className="me-2 py-2"
          type="checkbox"
          name="terms"
          id="terms"
        />
        <label
          className={agree ? "text-primary py-2" : "text-danger py-2"}
          htmlFor="terms"
        >
          Accept Terms & Conditions
        </label>
        <input
          disabled={!agree}
          className="btn btn-primary d-block mx-auto w-50 mb-2"
          type="submit"
          value="Register"
        />
      </form>
      {errorMessage}
      <p>
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary pe-auto text-decoration-none"
          onClick={navigateLogin}
        >
          Please Login
        </Link>{" "}
      </p>
      <Social></Social>
    </div>
  );
};

export default Register;
