import { database } from "../db";
import { Q } from "@nozbe/watermelondb";

const notes = database.collections.get("notes");

export default {
  observerNote: () => notes.query().observe(),
  createNote: async (body: { title: string; note: string }) => {
    return await database.write(async () => {
      await database.get("notes").create((notes) => {
        // @ts-ignore
        (notes.title = body.title),
          // @ts-ignore
          (notes.note = body.note);
      });
    });
  },
  deleteNote: async (id: string) => {
    return await database.write(async () => {
      const note = await database.get("notes").find(id);
      note.destroyPermanently();
    });
  },
  updateNote: async (body: { id: string; title: string; note: string }) => {
    return await database.write(async () => {
      const note = await database.get("notes").find(body.id);
      note.update((noteToBeUpdated) => {
        // @ts-ignore
        (noteToBeUpdated.title = body.title),
          // @ts-ignore
          (noteToBeUpdated.note = body.note);
      });
    });
  },
  search: async (text: string) => {
    return notes.query(
      Q.where("title", Q.like(`%${Q.sanitizeLikeString(text)}%`))
    );
  },
};
