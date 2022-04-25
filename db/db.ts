import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import Note from "./model/Note";
import Document from "./model/Document";
import Card from "./model/Card";

const adapter = new SQLiteAdapter({
  dbName: "mainID",
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [Note, Document, Card],
});

export { database };
