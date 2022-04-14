import React from "react";
import google from "../../../images/social/google.png";
import facebook from "../../../images/social/facebook.png";
import github from "../../../images/social/github.png";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useNavigate } from "react-router-dom";

const Social = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);

  const navigate = useNavigate();

  let errorMessage;

  if (error || error1) {
    errorMessage = (
      <div>
        <p className="text-danger">
          Error: {error?.message} {error1?.message}
        </p>
      </div>
    );
  }

  if (user || user1) {
    navigate("/home");
  }
  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-dark w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-dark w-50"></div>
      </div>
      {errorMessage}
      <div>
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-dark d-block mx-auto w-50 my-2"
        >
          <img src={google} alt="" />
          <span className="px-2 fw-bold">Google Sign In</span>
        </button>
        <button className="btn btn-dark d-block mx-auto w-50 my-2">
          <img src={facebook} alt="" />
          <span className="px-2 fw-bold">Facebook Sign In</span>
        </button>
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-dark d-block mx-auto w-50 my-2"
        >
          <img src={github} alt="" />
          <span className="px-2 fw-bold">GitHub Sign In</span>
        </button>
      </div>
    </div>
  );
};

export default Social;
