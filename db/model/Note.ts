import { Model } from "@nozbe/watermelondb";
import { field, readonly, date } from "@nozbe/watermelondb/decorators";

export default class Note extends Model {
  static table = "notes";

  @field("title") title;
  @field("note") note;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
