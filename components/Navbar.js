import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/script";
export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/ad91fb5d97.js"
        crossorigin="anonymous"
      ></Script>
      <nav className="header">
        <h1 className="logo">
          <a href="/">Blog</a>
        </h1>
        <ul className={`main-nav`}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          {session && (
            <li>
              <Link href={"/blog"}>Create</Link>
            </li>
          )}
          {session ? (
            <>
              <li className="two-word">
                <Link href={"/profile"}>
                  <div className="profile">
                    <p>{session.user.name}</p>
                    <img src={session.user.image} width="25px"></img>
                  </div>
                </Link>
              </li>

              <li className="two-word">
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  href={"/api/auth/signout"}
                >
                  Sign Out
                </Link>
              </li>
            </>
          ) : (
            <li>
              <div className="sign--in">
                <div className="signInContainer">Sign In</div>
                <ul className="drop--login">
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("facebook", {
                        callbackUrl: "http://localhost:3000",
                      });
                    }}
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </li>
                  <li
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("github", {
                        callbackUrl: "http://localhost:3000",
                      });
                    }}
                  >
                    <i className="fa-brands fa-github"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-google"></i>
                  </li>
                </ul>
              </div>
            </li>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
};
export default Navbar;
