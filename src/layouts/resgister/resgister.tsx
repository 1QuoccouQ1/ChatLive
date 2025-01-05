import React from "react";
import styles from"./styles.module.scss";

const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.flexColumn}>
          <label>Email</label>
        </div>
        <div className={styles.inputForm}>
          <svg
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_3" data-name="Layer 3">
              <path
                d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"
              ></path>
            </g>
          </svg>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your Email"
          />
        </div>

        <div className={styles.flexColumn}>
          <label>Password</label>
        </div>
        <div className={styles.inputForm}>
          <svg
            height="20"
            viewBox="-64 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"
            ></path>
            <path
              d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969-16-16-16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"
            ></path>
          </svg>
          <input
            type="password"
            className={styles.input}
            placeholder="Enter your Password"
          />
        </div>

        <div className={styles.flexRow}>
          <div>
            <input type="checkbox" />
            <label>Remember me</label>
          </div>
          <span className={styles.span}>Forgot password?</span>
        </div>
        <button className={styles.buttonSubmit}>Sign In</button>
        <p className={styles.p}>
          Don't have an account? <span className={styles.span}>Sign Up</span>
        </p>
        <p className={`${styles.p} ${styles.line}`}>Or With</p>

        <div className={styles.flexRow}>
          <button className={`${styles.btn} ${styles.google}`}>
            <svg
              version="1.1"
              width="20"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xml:space="preserve"
            >
              <path
                style={{ fill: "#fbbb00" }}
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z"
              ></path>
            </svg>
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
