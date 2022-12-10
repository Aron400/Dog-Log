import { useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [noteEditing, setNoteEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      id: new Date().getTime(),
      text: note,
      completed: false,
    };
    // take in current notes and add new notes
    // use spread operator to clone notes variable
    // take notes array and make new array
    setNotes([...notes].concat(newNote));
    setNote("");
  }

  function deleteNote(id) {
    //spread over notes array and filter
    //if you return true bool it will include element array
    //if you return false bool it will not include
    const updatedNotes = [...notes].filter((note) => note.id != id);
    setNotes(updatedNotes);
  }

  function editNote(id) {
    const updatedNotes = [...notes].map((note) => {
      if (note.id === id) {
        note.text = editingText;
      }
      return note;
    });
    setNotes(updatedNotes);
    setNoteEditing(null);
    setEditingText("");
  }
  return (
    <div className="notes">
      <h2>Notes</h2>
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          type="text"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
        <button type="submit">Add note</button>{" "}
      </form>
      {notes.map((note) => (
        <div key={note.id}>
          {noteEditing === note.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{note.text}</div>
          )}

          <button onClick={() => deleteNote(note.id)}>Delete</button>
          {noteEditing === note.id ? (
            <button onClick={() => editNote(note.id)}>Submit edit</button>
          ) : (
            <button onClick={() => setNoteEditing(note.id)}>Edit Note</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notes;
