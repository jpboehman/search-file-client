"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  gap: 20px;
`;

const NavItem = styled.a`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  cursor: pointer;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const pathname = usePathname();

  return (
    <NavContainer>
      <Link href="/" passHref>
        <NavItem active={pathname === "/"}>Home</NavItem>
      </Link>
      <Link href="/search" passHref>
        <NavItem active={pathname === "/search"}>Search</NavItem>
      </Link>
      <Link href="/upload" passHref>
        <NavItem active={pathname === "/upload"}>Upload</NavItem>
      </Link>
    </NavContainer>
  );
};

export default Navbar;
