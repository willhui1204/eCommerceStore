"use client";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const handleSignOut = () => {
    firebaseSignOut()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during GitHub sign out:", error);
      });
  };
  if (!user) {
    return (
      <div className="">
        <Link className="btn m-3" href="../user/login">
          Login
        </Link>
        <Link className="btn m-3" href="../user/register">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-primary-content">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <h2>User Email Address: {user.email}</h2>
      <h2>User ID: {user.uid}</h2>
      <button className="btn" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
}
