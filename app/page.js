"use client";
// Import the useUserAuth hook
import { useUserAuth } from "./user/_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut, register, login } =
    useUserAuth();
  const router = useRouter();

  const handleGitHubSignIn = () => {
    gitHubSignIn()
      .then(() => {
        router.push("/user");
      })
      .catch((error) => {
        console.error("Error during GitHub sign in:", error);
      });
  };
  if (!user) {
    return (
      <div className="">
        <button className="btn m-3" onClick={handleGitHubSignIn}>
          Sign in with GitHub
        </button>

        <Link className="btn m-3" href="./user/login">
          Login
        </Link>

        <Link className="btn m-3" href="./user/register">
          Register
        </Link>
      </div>
    );
  }
  // const router = useRouter();

  // Return null as the component does not need to render anything
  return (
    <>
      <Link className="btn m-3" href="/user">
        Shopping Now
      </Link>
      <button className=" btn " onClick={firebaseSignOut}>
        Sign out
      </button>
    </>
  );
}
