"use client";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
    const { user } = useUserAuth();
  return (<h1>Welcome to profile, {user.uid}, {user.email}</h1>);
}
