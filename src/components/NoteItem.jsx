import React from "react";

import { useState } from "react";
import Button from "./Button";

export default function NoteItem({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(note.text);

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onUpdate(note.id, trimmed);
    setEditing(false);
  };

  return (
    <div className="note-item">
      <div className="flex-1">
        {editing ? (
          <textarea
            className="input min-h-[80px]"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <p className="text-gray-800 whitespace-pre-wrap">{note.text}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {editing ? (
          <>
            <Button className="btn-primary" onClick={save}>
              Save
            </Button>
            <Button className="btn-ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button className="btn-ghost" onClick={() => setEditing(true)}>
              Edit
            </Button>
            <Button className="btn-ghost" onClick={() => onDelete(note.id)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
