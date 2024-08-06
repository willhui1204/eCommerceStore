"use client";
import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function Page() {
    const { user } = useUserAuth();
  if (!user) {
    return (
      <div className="">
        <Link className="btn m-3" href="../user/login">Login</Link>
        <Link className="btn m-3" href="../user/register">Register</Link>
      </div>
    );
  }

  return (<h1>Welcome to profile, {user.uid}, {user.email}</h1>);
}
