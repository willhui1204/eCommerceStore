import NavLink from "../components/nav-link";

export default function UserLayout({ children }) {
  return (
    <>
      <NavLink />
      {children}
    </>
  );
}
