//
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { login, logout } from "../reducers/user";
import { Modal } from "antd";
import { useRouter } from "next/router";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  //   useEffect(() => {}, []);

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: signUpFirstname,
              username: signUpUsername,
              token: data.token,
            })
          );
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
          console.log("Inscription OK", user);
          router.push("/tweets");
        } else {
          console.log("Inscription échouée", data);
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signInUsername,
              token: data.token,
            })
          );
          setSignInUsername("");
          setSignInPassword("");
        } else {
          console.log("Connexion échouée", data);
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  let modalContent;
  // if (!user.token) {
  // 	modalContent = ()

  // 	;
  // }

  let userSection;
  if (user.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p>Welcome {user.username} / </p>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>HACKATWEET</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img
            className={styles.logo}
            alt=""
            draggable="false"
            src="pngegg.png"
          />
        </div>
        <div className={styles.rightContainer}>
          <img
            className={styles.logosmall}
            alt=""
            draggable="false"
            src="pngegg.png"
          />
          <h1 className={styles.title1}>See what's happening</h1>

          <h3 className={styles.title1}>Join Hackatweet today.</h3>
        </div>
        <div>
          <div>
            <p>Sign-up</p>
            <input
              type="text"
              placeholder="Firstname"
              id="signUpFirstname"
              onChange={(e) => setSignUpFirstname(e.target.value)}
              value={signUpFirstname}
            />
            <input
              type="text"
              placeholder="Username"
              id="signUpUsername"
              onChange={(e) => setSignUpUsername(e.target.value)}
              value={signUpUsername}
            />
            <input
              type="password"
              placeholder="Password"
              id="signUpPassword"
              onChange={(e) => setSignUpPassword(e.target.value)}
              value={signUpPassword}
            />
            <button id="register" onClick={() => handleRegister()}>
              Register
            </button>
          </div>
          <div>
            <p>Already have an account</p>
            <p>Sign-in</p>
            <input
              type="text"
              placeholder="Username"
              id="signInUsername"
              onChange={(e) => setSignInUsername(e.target.value)}
              value={signInUsername}
            />
            <input
              type="password"
              placeholder="Password"
              id="signInPassword"
              onChange={(e) => setSignInPassword(e.target.value)}
              value={signInPassword}
            />
            <button id="connection" onClick={() => handleConnection()}>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
