import { CartStoreActionsType, CartStoreStateType } from "@/types";
import { create } from "zustand";
// 로컬에 상태 저장가능
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// zustand : state management tool

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
  persist(
    (set) => ({
      // initial state : CartStoreStateType type
      // state.cart = cart:[]
      cart: [],
      // zustand action functions
      // addToCart: (product: CartItemType) => void;
      addToCart: (product) =>
        set((state) => {
          // 장바구니에 같은상품 중복안되게..
          // findIndex는 **배열에서 조건을 만족하는  "인덱스 번호"*를 반환
          // 없으면 -1 반환
          const existingIndex = state.cart.findIndex(
            (p) =>
              p.id === product.id && p.selectedColor === product.selectedColor
          );


          // 이미 있는 상품이면 : existingIndex = 0,1,2,3, ......

          // already have the item
          if (existingIndex !== -1) {
            alert("이미 있는 상품");

            const updatedCart = [...state.cart];
            // 이미 있는 상품은 수량만 1씩 +
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          alert("새상품을 담습니다.");
          console.log(existingIndex);
          
          // 새 상품담기
          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1,  // 수량이 정해지지 않은경우 +1
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
            
          };
        }),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== product.id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      // 개발자 도구 -> application -> http://localhost:3000 에서 확인가능,
      name: "cart", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useCartStore;
