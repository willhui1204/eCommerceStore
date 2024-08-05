"use client";
// Import the useUserAuth hook
import { useUserAuth } from "./user/_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut, register, login } =
    useUserAuth();
  if (!user) {
    return (
      <div className="">
        <button className="btn m-3" onClick={gitHubSignIn}>
          Sign in with GitHub
        </button>

        <Link className="btn m-3" href="./user/login">Login</Link>

        <Link className="btn m-3" href="./user/register">Register</Link>  
      </div>
    );
  }
  // const router = useRouter();

  // Return null as the component does not need to render anything
  return (
    <>
      <Link className="btn m-3" href="/user">Shopping Now</Link>
      <button className=" btn " onClick={firebaseSignOut}>
        Sign out
      </button>
    </>
  );
}
