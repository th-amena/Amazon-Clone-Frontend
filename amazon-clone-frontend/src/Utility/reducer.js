import { Type } from "./action.type";

export const initialState = {

    basket:[]
}

export const reducer =(state,action) => {
   switch (action.type) {
      case Type.ADD_TO_BASKET:
         //check if items exists in the basket
         const existingItem = state.basket.find(
            (item) => item.id === action.item.id
         );
         if (!existingItem) {
            // Item doesn't exist, add it to the basket
            return {
               ...state,
               basket: [...state.basket, { ...action.item, amount: 1 }],
            };
         } else {
            // Item exists, update its quantity
            const updatedBasket = state.basket.map((item) => {
               return item.id === action.item.id
                  ? { ...item, amount: item.amount + 1 }
                  : item;
            });

            return {
               ...state,
               basket: updatedBasket,
            };
         }
      default:
         return state;
      // Always return the state if no action matches
   }
}
