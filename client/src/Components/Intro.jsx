import { Fragment } from "react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <Fragment>
      <div className="main flex flex-col">
        <div className="wel-note">
          Welcome to <b>Itelitalk</b> ! I'm here to make your academic 🎓 life a
          breeze by answering all your questions. I've got the info you need.
          From courses to campus facilities, consider me your go-to guide for
          all things university. Let's dive into your queries and make your
          academic journey smoother together! Ask away! 🌟
        </div>
        <div className="buttons">
          <Link className="std-btn bg-green-300" to="/login">
            <button>Login</button>
          </Link>
          <Link className="std-btn bg-green-300" to="/chat">
            <button>Guest</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Intro;