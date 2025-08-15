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
      // 
      hasHydrated: false,
      // zustand action functions
      // addToCart: (product: CartItemType) => void;
      addToCart: (product) =>
        set((state) => {
          // 장바구니에 같은상품 중복안되게..
          // findIndex는 **배열에서 조건을 만족하는  "인덱스 번호"*를 반환
          // 없으면 -1 반환
          const existingIndex = state.cart.findIndex(
            // 제품 id , color가 같으면 같은 제품으로 취급
            (p) =>
              p.id === product.id && p.selectedColor === product.selectedColor
          );

          // 이미 있는 상품이면 : existingIndex = 0,1,2,3, ......

          // already have the item
          /**
           * (existingIndex !== -10) ???
           * existingIndex 이게 반환하는 값은 항상 0,1,2,3.... 혹은 -1
           * 때문에 if (existingIndex !== -10)이 항상 true
           * "이미있는 상품"으로 처리
           */
          if (existingIndex !== -1) {
            alert("이미 있는 상품!! 수량만 +1");

            const updatedCart = [...state.cart]; // 얕은 복사(shallow copy) -> zustand 불변성 유지
            // 이미 있는 상품은 수량만 1씩 +
            /**
             * 만약 새로 추가하려는 상품에 quantity 값이 있다면 그만큼 증가.
               quantity가 없으면 기본값 1만큼 증가
             */
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return { cart: updatedCart };
          }

          alert("새상품을 담습니다.");

          // 새 상품담기
          return {
            // CartItemType 타입과 일치
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: product.quantity || 1, // 수량이 정해지지 않은경우 +1
                selectedSize: product.selectedSize,
                selectedColor: product.selectedColor,
              },
            ],
          };
        }),
      // 한개 상품만 딜리트하기
      // 삭제 조건을 묶어서 !()로 뒤집음
      /**
       * 
       * 
       * p = { id: 1, selectedSize: "L", selectedColor: "Red" }
        (p.id === 1) → true  
        (p.selectedSize === "M") → false  
        (p.selectedColor === "Red") → true  
        → 전체 조건 = true && false && true → false  
        → `!(false)` → true → 남김

       * p = { id: 1, selectedSize: "M", selectedColor: "Red" }
        (p.id === 1) → true  
        (p.selectedSize === "M") → true  
        (p.selectedColor === "Red") → true  
        → 전체 조건 = true && true && true → true  
        → `!(true)` → false → 제거됨

       * 
       */
      removeFromCart: (product) =>
        set((state) => ({
          
          cart: state.cart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              )
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      // 개발자 도구 -> application -> http://localhost:3000 에서 확인가능,
      name: "cart", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // hydration 동안 ( 새로 고침 ): 장바구니 숫자 0 -> 2 이렇게 안되고 바로 2 이렇게 나옴 
      // 로컬스토리지에 저장돼 있던 상태를 불러올 때 자동으로 호출
      onRehydrateStorage: () => (state) =>{
        if(state){
          state.hasHydrated = true;
        }
      } 
    }
  )
);
export default useCartStore;
