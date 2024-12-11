"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check auth status and admin role on component mount
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/status", {
          credentials: "include",
        });
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
        setIsAdmin(data.isAdmin); // Assume API sends isAdmin boolean
      } catch {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include", // Ensure cookies are included in the request
    });
    setIsLoggedIn(false);
    setIsAdmin(false);
    router.push("/login");
  };

  if (isLoggedIn === null) {
    return null; // Render nothing until we know the login status
  }

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <Link href="/" style={styles.title}>
          IDS SMART CITY PORTAL
        </Link>
        <nav style={styles.nav}>
          <Link href="/about" style={styles.navLink}>
            About
          </Link>
          <Link href="/contact" style={styles.navLink}>
            Contact
          </Link>
        </nav>
      </div>
      <div style={styles.buttons}>
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link href="/admindash" style={styles.button}>
                Admin
              </Link>
            )}
            <Link href="/uploads" style={styles.button}>
              Upload Page
            </Link>
            <Link href="/account" style={styles.button}>
              Account
            </Link>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" style={styles.button}>
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

// Styles...
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1f2937",
    color: "#fff",
    fontFamily: "'Roboto', sans-serif",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginRight: "30px",
    color: "#f3f4f6",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: "#f3f4f6",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "500",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Header;
