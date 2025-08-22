import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import AuthPage from "./pages/Auth";
import NotesPage from "./pages/Notes";

function AppContent() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="container-centered">
        <p>Loading…</p>
      </div>
    );
  return user ? (
    <NotesProvider>
      <NotesPage />
    </NotesProvider>
  ) : (
    <AuthPage />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
