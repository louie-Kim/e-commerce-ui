
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

//  ProductType[] : 여기에 여러가지 상품이 들어간다
export type ProductsType= ProductType[];
