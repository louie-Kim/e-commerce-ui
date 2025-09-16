import { z } from "zod";

// 1개의 상품 타입
export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  /**
 *  images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
 */
  // Record는 TypeScript의 유틸리티 ( 타입정의 )
  // Record<key, value>
  images: Record<string, string>;
};

//  여러개의 ProductType 객체들이 [] 로 ProductsType에 들어간다
export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  // ProductType + additional type
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

// CartItemsType = CartItemType 객체들의 배열
export type CartItemsType = CartItemType[]

// schema validation
export const shippingFormSchema = z.object({
  // min(1,) : 최소 한글자 이상
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"), // 전번에는 숫자 외의 문자가 포함되지 않도록
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>; 
/**
 * shippingFormSchema 를 타입스크립트 타입으로 만들어줌
 * type ShippingFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

 *  */ 


export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

/**
 * PaymentFormInputs
 * 
 * type PaymentFormInputs = {
  cardHolder: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  };

 */


// product → CartItemType[] → CartItemsType → CartStoreStateType
export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

/**
 * CartStoreStateType
 * 
 * type CartStoreStateType = {
  cart: Array<{
    // ProductType
    id: string | number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;

   // + CartItemType
    quantity: number;
    selectedSize: string;
    selectedColor: string;
  }>;
};

 */

// action types
// 타입 →  store에서 구현 -> ProductCard 에서 사용
export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};

/**
 * addToCart({
  id: 1,
  name: "티셔츠",
  shortDescription: "간단한 설명",
  description: "자세한 설명",
  price: 20000,
  sizes: ["S", "M", "L"],
  colors: ["Red", "Blue"],
  images: { red: "/img/red.png", blue: "/img/blue.png" },
  
  quantity: 1,
  selectedSize: "M",
  selectedColor: "Red",
});

 */
