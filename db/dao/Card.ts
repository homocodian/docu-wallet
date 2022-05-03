import { database } from "../db";
import { Q } from "@nozbe/watermelondb";

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
      await cards.create((card) => {
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
      const card = await cards.find(id);
      card.destroyPermanently();
    });
  },
  updateCard: async (body: {
    id: string;
    cardName: string;
    cardNumber: string;
    frontImageUri: string;
    backImageUri: string;
  }) => {
    return await database.write(async () => {
      const card = cards.find(body.id);
      (await card).update((cardToBeUpdated) => {
        // @ts-ignore
        cardToBeUpdated.cardName = body.cardName;
        // @ts-ignore
        cardToBeUpdated.cardNumber = body.cardNumber;
        // @ts-ignore
        cardToBeUpdated.frontImageUri = body.frontImageUri;
        // @ts-ignore
        cardToBeUpdated.backImageUri = body.backImageUri;
      });
    });
  },
  search: async (text: string) => {
    return cards.query(
      Q.where("card_name", Q.like(`%${Q.sanitizeLikeString(text)}%`))
    );
  },
};
