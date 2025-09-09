import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load notes for current user
  useEffect(() => {
    if (!user) {
      setNotes([]);
      return;
    }
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const fetchNotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    setLoading(false);
    if (error) throw error;
    setNotes(data ?? []);
  };

  const addNote = async (text) => {
    const { data, error } = await supabase
      .from("notes")
      .insert([{ text, user_id: user.id }])
      .select();
    if (error) throw error;
    setNotes((prev) => [data[0], ...prev]);
  };

  const updateNote = async (id, text) => {
    const { data, error } = await supabase
      .from("notes")
      .update(text)
      .eq("id", id)
      .select();
    if (error) throw error;
    setNotes((prev) => prev.map((n) => (n.id === id ? data[0] : n)));
  };

  const deleteNote = async (id) => {
    const { error } = await supabase.from("notes").delete().eq("id", id);
    if (error) throw error;
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{ notes, loading, fetchNotes, addNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
