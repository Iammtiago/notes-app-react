import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { isValidEmail, isValidPassword } from "../utils/validation";

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
    setMessage(null);
  };

  const submit = async () => {
    setMessage(null);

    if (!isValidEmail(email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    if (!isValidPassword(password)) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters.",
      });
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await signIn({ email, password });
        setMessage({ type: "success", text: "Logged in successfully." });
      } else {
        await signUp({ email, password });
        setMessage({
          type: "success",
          text: "Registration successful. Check your email to confirm if required.",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-centered">
      <Card>
        <div className="flex flex-col items-center gap-2 mb-4">
          <div className="badge">{mode}</div>
          <h1 className="text-2xl font-semibold text-gray-900">Notes App</h1>
          <p className="text-gray-500 text-sm text-center">
            Sign {mode === "login" ? "in" : "up"} with your email and password.
          </p>
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p className={message.type}>{message.text}</p>}

        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={submit}
            className={`btn-primary w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <button className="btn btn-ghost w-full" onClick={toggleMode}>
            {mode === "login"
              ? "Don't have an account? Register"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
    </div>
  );
}
