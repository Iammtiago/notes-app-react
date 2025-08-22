import React from "react";
import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import NoteItem from "../components/NoteItem";
import { useAuth } from "../context/AuthContext";
import { useNotes } from "../context/NotesContext";

export default function NotesPage() {
  const { user, signOut } = useAuth();
  const { notes, addNote, updateNote, deleteNote, loading } = useNotes();
  const [draft, setDraft] = useState("");

  const submit = async () => {
    const text = draft.trim();
    if (!text) return;
    try {
      await addNote(text);
      setDraft("");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <header className="max-w-3xl mx-auto flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Notes</h1>
          <p className="text-sm text-gray-500">Signed in as {user?.email}</p>
        </div>
        <Button className="btn-ghost" onClick={signOut}>
          Sign out
        </Button>
      </header>

      <main className="max-w-3xl mx-auto grid gap-4">
        <Card>
          <Input
            label="New note"
            placeholder="Write something..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="btn-primary" onClick={submit}>
              Add
            </Button>
          </div>
        </Card>

        {loading ? (
          <Card>
            <p>Loading notes…</p>
          </Card>
        ) : notes.length === 0 ? (
          <Card>
            <p className="text-gray-500">No notes yet. Start by adding one.</p>
          </Card>
        ) : (
          notes.map((n) => (
            <Card key={n.id} className="p-4">
              <NoteItem note={n} onUpdate={updateNote} onDelete={deleteNote} />
            </Card>
          ))
        )}
      </main>
    </div>
  );
}
