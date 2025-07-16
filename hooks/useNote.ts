import { useReducer, useState, useEffect } from "react";
import { FetchPayload, fetchReducer, Refetch } from "../reducer/fetch";
import { Note } from "@custom/components/Note";

/**
 * @desc   Request to fetch a note by its id
 * @route  GET /api/notes/:id
 * @returns [payload, refetch];
 */
export const useGetNoteById = (id: string) => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: true,
    error: null,
    data: null,
  });

  const [c, setC] = useState(0);
  const refetch = () => setC(c + 1);

  useEffect(() => {
    id && getNoteById();
  }, [c, id]);

  const getNoteById = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ payload: err.message, type: "FETCH_ERROR" });
    }
  };

  return [payload, refetch] as const;
};

/**
 * @desc   Request to get all notes
 * @route  GET /api/notes
 * @returns [payload, refetch];
 */
export const useGetMyNotes = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: true,
    error: null,
    data: null,
  });

  const [c, setC] = useState(0);
  const refetch = () => setC(c + 1);

  useEffect(() => {
    getNotes();
  }, [c]);

  const getNotes = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/notes/my`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ payload: err.message, type: "FETCH_ERROR" });
    }
  };

  return [payload, refetch] as const;
};

/**
 * @desc   Request to get all notes
 * @route  GET /api/notes
 * @returns [payload, refetch];
 */
export const useGetNotes = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: true,
    error: null,
    data: null,
  });

  const [c, setC] = useState(0);
  const refetch = () => setC(c + 1);

  useEffect(() => {
    getNotes();
  }, [c]);

  const getNotes = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/notes`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({ payload: err.message, type: "FETCH_ERROR" });
    }
  };

  return [payload, refetch] as const;
};

/**
 * @desc Registers a new note
 * @routes POST /api/notes
 * @body {name} string
 * @body {color} string
 * @returns [createNote, payload]
 */
type CreateNote = (form: Partial<Note>, cb?: Function) => Promise<void>;
type UseCreateNote = () => [CreateNote, FetchPayload];
export const useCreateNote: UseCreateNote = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const createNote: CreateNote = async (form, cb?: Function) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      typeof cb === "function" && cb();
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  return [createNote, payload];
};

/**
 * @desc Request to update note
 * @route PUT /api/notes/:id
 * @body {name?} string
 * @body {color?} string
 * @returns [updateNote, payload]
 */
export const useUpdateNote = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const updateNote = async (
    form: { id: string; note: string; title: string; verses: number[] },
    cb?: Function
  ) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      typeof cb === "function" && cb();
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  return [updateNote, payload] as const;
};

/**
 * @desc Request to delete note
 * @route DELETE /api/notes
 * @returns [deleteNote, payload]
 */
export const useDeleteNote = () => {
  const [payload, dispatch] = useReducer(fetchReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const updateNote = async (id: string, cb?: Function) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(`/api/notes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      typeof cb === "function" && cb();
    } catch (err: any) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  return [updateNote, payload] as const;
};
