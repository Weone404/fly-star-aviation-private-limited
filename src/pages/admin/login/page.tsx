"use client";

import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "weoneaviation";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #060e1c !important; }

  .al-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #060e1c;
  }

  .al-left {
    display: none;
    width: 45%;
    background: linear-gradient(145deg, #0a2342 0%, #0d3060 60%, #0a2342 100%);
    position: relative;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
  }
  @media (min-width: 900px) { .al-left { display: flex; } }

  .al-left-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(249,115,22,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(249,115,22,.07) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .al-left-glow {
    position: absolute;
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(249,115,22,.13) 0%, transparent 70%);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .al-left-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: #fff;
  }

  .al-plane-icon {
    font-size: 3.5rem;
    display: block;
    margin-bottom: 1.5rem;
    animation: floatPlane 4s ease-in-out infinite;
  }
  @keyframes floatPlane {
    0%, 100% { transform: translateY(0) rotate(-5deg); }
    50%       { transform: translateY(-14px) rotate(5deg); }
  }

  .al-left-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.3rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  .al-left-title span { color: #f97316; }

  .al-divider {
    width: 50px; height: 2px;
    background: #f97316;
    margin: 1.25rem auto;
    border-radius: 2px;
  }

  .al-left-sub {
    font-size: .88rem;
    color: rgba(255,255,255,.5);
    line-height: 1.65;
    max-width: 300px;
    margin: 0 auto;
  }

  .al-features {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    text-align: left;
  }
  .al-feature {
    display: flex;
    align-items: center;
    gap: .65rem;
    font-size: .82rem;
    color: rgba(255,255,255,.6);
  }
  .al-feature-dot {
    width: 6px; height: 6px;
    background: #f97316;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .al-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    background: #060e1c;
  }

  .al-card {
    width: 100%;
    max-width: 420px;
    animation: fadeUp .5s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .al-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 2.5rem;
  }
  .al-logo-icon {
    width: 40px; height: 40px;
    background: #f97316;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #fff;
  }
  .al-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
  }
  .al-logo-text span { color: #f97316; }

  .al-heading {
    font-family: 'Playfair Display', serif;
    font-size: 1.85rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: .4rem;
    line-height: 1.2;
  }
  .al-subheading {
    font-size: .85rem;
    color: rgba(255,255,255,.38);
    margin-bottom: 2.5rem;
    font-weight: 300;
  }

  .al-field { margin-bottom: 1.25rem; }
  .al-label {
    display: block;
    font-size: .72rem;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(255,255,255,.42);
    margin-bottom: 8px;
  }
  .al-input-wrap { position: relative; }
  .al-input {
    width: 100%;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 8px;
    padding: .8rem 1rem;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem;
    outline: none;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .al-input::placeholder { color: rgba(255,255,255,.2); }
  .al-input:focus {
    border-color: #f97316;
    background: rgba(249,115,22,.05);
    box-shadow: 0 0 0 3px rgba(249,115,22,.1);
  }
  .al-input.has-btn { padding-right: 3rem; }

  .al-eye-btn {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,.3);
    padding: 4px;
    transition: color .15s;
    display: flex;
    align-items: center;
  }
  .al-eye-btn:hover { color: rgba(255,255,255,.7); }

  .al-error {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(239,68,68,.1);
    border: 1px solid rgba(239,68,68,.25);
    border-radius: 8px;
    color: #f87171;
    font-size: .82rem;
    padding: 10px 14px;
    margin-bottom: 1.25rem;
    animation: fadeUp .25s ease;
  }

  .al-btn {
    width: 100%;
    background: #f97316;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: .9rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem;
    font-weight: 500;
    cursor: pointer;
    transition: background .2s, transform .1s, box-shadow .2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    letter-spacing: .03em;
  }
  .al-btn:hover {
    background: #ea6a0a;
    box-shadow: 0 4px 20px rgba(249,115,22,.35);
  }
  .al-btn:active { transform: scale(.98); }
  .al-btn:disabled { background: rgba(249,115,22,.4); cursor: not-allowed; }

  .al-spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .al-footer {
    margin-top: 2.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,.06);
    font-size: .75rem;
    color: rgba(255,255,255,.18);
    text-align: center;
    letter-spacing: .04em;
  }
`;

const EyeOpen = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOff = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const AlertIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const features = [
    "Manage & publish blog posts",
    "View and export lead submissions",
    "Upload cover images & rich content",
    "Secure, session-based admin access",
];

export default function AdminLogin() {
    const navigate = useNavigate();
    const location = useLocation();

    // Read the route the user was trying to reach; fall back to /admin/blog
    const from =
        (location.state as { from?: Location })?.from?.pathname || "/admin/blog";

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const isLoggedIn = sessionStorage.getItem("weone_admin") === "true";
            if (isLoggedIn) {
                navigate(from, { replace: true });
            }
        }
    }, [navigate, from]);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        setTimeout(() => {
            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                sessionStorage.setItem("weone_admin", "true");
                document.cookie = "weone_admin=true; path=/";
                navigate(from, { replace: true });
            } else {
                setError("Invalid username or password. Please try again.");
                setLoading(false);
            }
        }, 600);
    };

    if (!mounted) return null;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: globalStyles }} />

            <Helmet>
                <title>Admin Login — Fly Star Aviation</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="al-root">
                {/* Left decorative panel */}
                <div className="al-left">
                    <div className="al-left-grid" />
                    <div className="al-left-glow" />

                    <div className="al-left-content">
                        <span className="al-plane-icon">✈️</span>

                        <h2 className="al-left-title">
                            Fly Star<br />
                            <span>Aviation</span> Academy
                        </h2>

                        <div className="al-divider" />

                        <p className="al-left-sub">
                            Admin control panel for managing your aviation blog content, leads, and media.
                        </p>

                        <div className="al-features">
                            {features.map((f) => (
                                <div className="al-feature" key={f}>
                                    <span className="al-feature-dot" />
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right form panel */}
                <div className="al-right">
                    <div className="al-card">
                        <div className="al-logo">
                            <div className="al-logo-icon">✈</div>
                            <div className="al-logo-text">
                                Fly Star <span>Admin</span>
                            </div>
                        </div>

                        <h1 className="al-heading">
                            Welcome back,<br />Admin.
                        </h1>
                        <p className="al-subheading">Sign in to access your blog dashboard.</p>

                        <form onSubmit={handleLogin} noValidate>
                            <div className="al-field">
                                <label className="al-label" htmlFor="username">
                                    Username
                                </label>
                                <div className="al-input-wrap">
                                    <input
                                        id="username"
                                        type="text"
                                        autoComplete="username"
                                        className="al-input"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="al-field">
                                <label className="al-label" htmlFor="password">
                                    Password
                                </label>
                                <div className="al-input-wrap">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        className="al-input has-btn"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="al-eye-btn"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff /> : <EyeOpen />}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="al-error" role="alert">
                                    <AlertIcon />
                                    {error}
                                </div>
                            )}

                            <button type="submit" className="al-btn" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="al-spinner" />
                                        Signing in…
                                    </>
                                ) : (
                                    "Sign In →"
                                )}
                            </button>
                        </form>

                        <div className="al-footer">
                            🔒 Restricted access · Fly Star Aviation Admin Panel
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}