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
      let note;
      if (text.includes("\n") && text.includes("-")) {
        note = text.split("\n").map((line, index) => {
          if (line.includes("-")) {
            return {
              id: index,
              text: line.replace("-", "").trimStart(),
              isCompleted: false,
            };
          }
          return { id: index, text: line.trimStart(), isCompleted: false };
        });
      } else {
        note = [{ id: 0, text: text.trimStart(), isCompleted: false }];
      }
      await addNote(note);
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

      <main className="max-w-4xl mx-auto my-10 grid grid-cols-1 gap-4">
        <div className="justify-self-center grid gap-4">
          <Card>
            {/* <Input
              label="New note"
              placeholder="Write something..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            /> */}
            <label className="label">New note</label>
            <div className="flex justify-center items-center gap-2">
              <textarea
                className="input min-h-[80px]"
                placeholder="Write something..."
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
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
              <p className="text-gray-500">
                No notes yet. Start by adding one.
              </p>
            </Card>
          ) : (
            notes?.map((n) => (
              <Card key={n.id} className="p-4">
                <NoteItem
                  note={n}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                />
              </Card>
            ))
          )}
        </div>
        {/* {
  "id": 9,
  "user_id": "70bd6399-62af-4aa5-a2e1-2c6cd0cd4cbc",
  "text": [
    {
      "id": 0,
      "text": "prueba quitando los guiones",
      "isCompleted": true
    },
    {
      "id": 1,
      "text": "si ",
      "isCompleted": false
    },
    {
      "id": 2,
      "text": "no",
      "isCompleted": false
    }
  ],
  "created_at": "2025-09-05T19:27:41.268242+00:00",
  "updated_at": "2025-09-05T19:27:41.268242+00:00"
} */}
      </main>
    </div>
  );
}
