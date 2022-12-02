import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <>
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
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
                href={"/api/auth/signin"}
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <hr />
    </>
  );
};
export default Navbar;
