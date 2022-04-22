import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import NoteDao from "../../../db/dao/Note";

interface AddNote {
  titleText: string;
  noteText: string;
  isNoteSaved: boolean;
  isError: boolean;
  isLoading: boolean;
  isDeleted: boolean;
}

const initialState: AddNote = {
  titleText: "",
  noteText: "",
  isNoteSaved: false,
  isError: false,
  isLoading: false,
  isDeleted: false,
};

export const saveNote = createAsyncThunk("note/save", async (_, thunkAPI) => {
  const { addNote }: any = thunkAPI.getState();
  try {
    if (!addNote.titleText || !addNote.noteText) {
      return false;
    }
    await NoteDao.createNote({
      title: addNote.titleText,
      note: addNote.noteText,
    });
    return true;
  } catch (error) {
    thunkAPI.rejectWithValue(false);
  }
});

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (id: string, thunkAPI) => {
    try {
      await NoteDao.deleteNote(id);
      return true;
    } catch (error) {
      thunkAPI.rejectWithValue(false);
    }
  }
);

const addNoteSlice = createSlice({
  name: "AddNote",
  initialState,
  reducers: {
    setTitleText: (state, action) => {
      state.titleText = action.payload.text;
    },
    setNoteText: (state, action) => {
      state.noteText = action.payload.note;
    },
    reset: (state) => {
      (state.titleText = ""), (state.noteText = "");
      (state.isNoteSaved = false), (state.isError = false);
      state.isLoading = false;
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveNote.fulfilled, (state, action) => {
        if (!action.payload) return;
        (state.titleText = ""), (state.noteText = "");
        (state.isNoteSaved = true), (state.isError = false);
        state.isLoading = false;
      })
      .addCase(saveNote.rejected, (state) => {
        (state.titleText = ""), (state.noteText = "");
        (state.isNoteSaved = false), (state.isError = true);
        state.isLoading = false;
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        (state.isLoading = false), (state.isDeleted = true);
      })
      .addCase(deleteNote.rejected, (state) => {
        (state.isLoading = false), (state.isDeleted = false);
      });
  },
});

export const { setTitleText, setNoteText, reset } = addNoteSlice.actions;
export default addNoteSlice.reducer;
