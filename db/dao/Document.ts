import { database } from "../db";

const documents = database.collections.get("documents");

export default {
  observerDocument: () => documents.query().observe(),
  createDocument: async (body: {
    name: string;
    uid: string;
    fileName: string;
    fileSize: number;
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
          (doc.fileSize = body.fileSize),
          // @ts-ignore
          (doc.fileUri = body.fileUri);
      });
    });
  },
  deleteDocument: async (id: string) => {
    return await database.write(async () => {
      const note = await database.get("documents").find(id);
      note.destroyPermanently();
    });
  },
};
