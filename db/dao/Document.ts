import { database } from "../db";
import { Q } from "@nozbe/watermelondb";

const documents = database.collections.get("documents");

export default {
  observerDocument: () => documents.query().observe(),
  createDocument: async (body: {
    name: string;
    uid: string;
    fileName: string;
    fileUri: string;
  }) => {
    return await database.write(async () => {
      await database.get("documents").create((doc) => {
        // @ts-ignore
        (doc.name = body.name),
          // @ts-ignore
          (doc.uid = body.uid);
        // @ts-ignore
        (doc.fileName = body.fileName),
          // @ts-ignore
          (doc.fileUri = body.fileUri);
      });
    });
  },
  deleteDocument: async (id: string) => {
    return await database.write(async () => {
      const document = await database.get("documents").find(id);
      document.destroyPermanently();
    });
  },
  updateDocument: async (body: {
    id: string;
    name: string;
    uid: string;
    fileName: string;
    fileUri: string;
  }) => {
    return await database.write(async () => {
      const document = await database.get("documents").find(body.id);
      document.update((doc) => {
        // @ts-ignore
        (doc.name = body.name),
          // @ts-ignore
          (doc.uid = body.uid);
        // @ts-ignore
        (doc.fileName = body.fileName),
          // @ts-ignore
          (doc.fileUri = body.fileUri);
      });
    });
  },
  search: async (text: string) => {
    return documents.query(
      Q.where("name", Q.like(`%${Q.sanitizeLikeString(text)}%`))
    );
  },
};
