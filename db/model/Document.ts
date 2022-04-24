import { Model } from "@nozbe/watermelondb";
import { field, readonly, date, text } from "@nozbe/watermelondb/decorators";

export default class Document extends Model {
  static table = "documents";

  @field("name") name;
  @text("uid") uid;
  @text("file_name") fileName;
  @text("file_size") fileSize;
  @text("file_uri") fileUri;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
