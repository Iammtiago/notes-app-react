import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";

export default function NoteItem({ note, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [updatedNote, setUpdatedNote] = useState(note);
  const [textArea, setTextArea] = useState(note.text?.map((note) => note.text));
  const [subnotes, setSubnotes] = useState(note.text?.map((note) => note));
  const [isCompleted, setIsCompleted] = useState(
    note.text?.map((note) => note.isCompleted)
  );

  useEffect(() => {
    const ejecutarActualizacion = async () => {
      // console.log("updatedNote.text actualizado:", updatedNote.text);

      if (editing && updatedNote.text.length > 1) {
        const textoFormateado = updatedNote.text
          .map((note) => "- " + note.text)
          .join("\n");
        setTextArea(textoFormateado);
      }

      setSubnotes(updatedNote.text);
      await onUpdate(note.id, updatedNote);
    };

    ejecutarActualizacion();
  }, [editing, updatedNote]);

  const save = async () => {
    if (!textArea) return;
    try {
      let noteSaved;
      if (textArea.includes("\n") && textArea.includes("-")) {
        noteSaved = textArea.split("\n").map((line, index) => {
          if (line.includes("-")) {
            return {
              id: index,
              text: line.replace("-", "").trimStart(),
              isCompleted:
                index < subnotes.length ? subnotes[index]?.isCompleted : false,
            };
          }
          return { id: index, text: line.trimStart(), isCompleted: false };
        });
      } else {
        noteSaved = [
          { id: 0, text: textArea, isCompleted: subnotes[0]?.isCompleted },
        ];
      }

      setUpdatedNote((prev) => ({
        ...prev,
        text: [...noteSaved],
      }));

      // await onUpdate(note.id, updatedNote);
      setEditing(false);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="note-item">
      <div className="flex-1">
        {editing ? (
          <textarea
            className="input min-h-[80px]"
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        ) : (
          <>
            {subnotes.length > 1 || subnotes[0]?.text.includes("-") ? (
              <>
                <div className="text-gray-800 whitespace-pre-wrap">
                  {subnotes.map((n, index) => (
                    <p key={index}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={n.isCompleted}
                        onChange={async () => {
                          // n.isCompleted = !n.isCompleted;
                          setUpdatedNote((prev) => {
                            const nuevaLista = [...prev.text];
                            nuevaLista[index] = {
                              ...nuevaLista[index],
                              isCompleted: !n.isCompleted,
                            };
                            return { ...prev, text: [...nuevaLista] };
                          });
                          // await onUpdate(note.id, updatedNote);
                        }}
                      />
                      <span
                        key={index}
                        className={
                          n.isCompleted ? "line-through text-gray-700" : ""
                        }
                      >
                        {n.text.includes("-")
                          ? n.text.replace("-", "")
                          : n.text}
                      </span>
                      <span>{n.isCompleted ? "✔️ " : ""}</span>
                      <br />
                    </p>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {updatedNote.text?.map((note) => note.text)}
                </p>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          className="btn-ghost"
          onClick={() => setEditing((prev) => !prev)}
        >
          {/* Cancel */}
          {editing ? "Cancel" : "Edit"}
        </Button>
        {editing ? (
          <>
            <Button className="btn-primary" onClick={save}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button className="btn-ghost" onClick={() => onDelete(note.id)}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
