import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 4,
  tables: [
    tableSchema({
      name: "notes",
      columns: [
        { name: "title", type: "string", isIndexed: true },
        { name: "note", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "documents",
      columns: [
        { name: "name", type: "string", isIndexed: true },
        { name: "uid", type: "string" },
        { name: "file_name", type: "string" },
        { name: "file_size", type: "number" },
        { name: "file_uri", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "cards",
      columns: [
        { name: "card_name", type: "string", isIndexed: true },
        { name: "card_number", type: "string" },
        { name: "front_image_uri", type: "string" },
        { name: "back_image_uri", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
