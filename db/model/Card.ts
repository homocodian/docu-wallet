import { Model } from "@nozbe/watermelondb";
import { field, readonly, date, text } from "@nozbe/watermelondb/decorators";

export default class Card extends Model {
  static table = "cards";

  @field("card_name") cardName;
  @text("card_number") cardNumber;
  @text("front_image_uri") frontImageUri;
  @text("back_image_uri") backImageUri;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;
}
