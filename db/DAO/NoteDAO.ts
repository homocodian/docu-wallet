import { database } from "../db";

const notes = database.collections.get("notes");

export default {
  observerNote: () => notes.query().observe(),
  createNote: async (body: { title: string; note: string }) => {
    await database.get("notes").create((notes) => {
      // @ts-ignore
      (notes.title = body.title),
        // @ts-ignore
        (notes.note = body.note);
    });
  },
};
