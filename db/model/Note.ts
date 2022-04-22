import { Model } from "@nozbe/watermelondb";
import { field, readonly, date, text } from "@nozbe/watermelondb/decorators";

export default class Note extends Model {
  static table = "notes";

  @field("title") title;
  @text("note") note;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
