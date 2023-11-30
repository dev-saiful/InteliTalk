import { Fragment } from "react";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <Fragment>
      <div className="main flex flex-col">
        <div className="title w-full bg-amber-400 pt-3 font-bold text-4xl">
          <p>Intelitalk</p>
        </div>
        <div className="wel-note">
          Welcome to Itelitalk! I'm here to make your academic 🎓 life a breeze
          by answering all your questions. I've got the info you need. From
          courses to campus facilities, consider me your go-to guide for all
          things university. Let's dive into your queries and make your academic
          journey smoother together! Ask away! 🌟
        </div>
        <div className="buttons">
          <Link className="std-btn bg-green-300" to="/student">
            <button>Login</button>
          </Link>
          <Link className="std-btn bg-green-300" to="/guest">
            <button>Guest</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Intro;
