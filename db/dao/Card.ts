import { database } from "../db";

const cards = database.collections.get("cards");

export default {
  observerCard: () => cards.query().observe(),
  createCard: async (body: {
    cardName: string;
    cardNumber: string;
    frontImageUri: string;
    backImageUri: string;
  }) => {
    return await database.write(async () => {
      await database.get("cards").create((card) => {
        // @ts-ignore
        card.cardName = body.cardName;
        // @ts-ignore
        card.cardNumber = body.cardNumber;
        // @ts-ignore
        card.frontImageUri = body.frontImageUri;
        // @ts-ignore
        card.backImageUri = body.backImageUri;
      });
    });
  },
  deleteCard: async (id: string) => {
    return await database.write(async () => {
      const card = await database.get("cards").find(id);
      card.destroyPermanently();
    });
  },
};
