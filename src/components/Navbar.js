import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div style={{ marginRight: "20px" }}>
        <Link href="/">Home</Link>
      </div>
      <div style={{ marginRight: "20px" }}>
        <Link href="/search">Search</Link>
      </div>
      <div style={{ marginRight: "20px" }}>
        <Link href="/upload">Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;
