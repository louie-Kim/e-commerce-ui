"use client";

import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { log } from "node:console";
import { text } from "node:stream/consumers";
import { useEffect, useState } from "react";
/**
 * export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
   }; 
 */

// product : 상품 1개
const ProductCard = ({ product }: { product: ProductType }) => {
  // console.log("상품색..", product.images[product.colors[0]]);
  // console.log("상품색..", product.images);

  /**
   * product.images[product.colors[0]]
   * 접근 순서
    product.colors
    → ["red", "blue", "green"] (배열)

    product.colors[0]
    → "red" (배열에서 첫 번째 값 꺼내기)

    product.images["red"] 
    대괄호 표기법(bracket notation) -> 키 이름이 동적일 때 사용 
    → "/images/red-tshirt.jpg"
    (객체 images에서 "red"라는 키의 value 가져오기)

   */

  
  const [productTypes, setProductTypes] = useState({
    // productTypes 의 초기값
    size: product.sizes[0],
    color: product.colors[0],
  });


  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    alert(`type: ${type}, value: ${value}`); // 로그 대신 알림
    // console.log("type and value>>>>>>>>>>>>>", `type: ${type}, value: ${value}`);
    setProductTypes((prev) => ({
      //  handleProductType({ type: "color", value: color })
      //  handleProductType({ type: "size", value: e.target.value })
      // 이전 값 + 바뀐값 : 컬러 선택시, 기존 사이즈는 유지
      ...prev,
      /**
       * type이 "color" → { color: value }
         type이 "size" → { size: value }
         동적으로 key 이름 정함
         bracket notation!!
       */
      [type]: value,
    }));
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* IMAGE */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[2/3]">
          {/* object-cover: 부모 컨테이너의 크기에 맞게 '잘리더라도' '꽉' 차도록 <=> 
              object-contain: 부모 영역과 비율이 맞지 않으면 여백이 생김*/}
          {/* transition-all duration-300 : 호버링 천천히 */}
          <Image
            // [productTypes.color] => images 배열의 key 값에 접근
            src={product.images[productTypes.color]}
            alt="product images"
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-8 text-xs">
          {/* SIZE */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-30 rounded-md px-2"
              onChange={(e) =>
                handleProductType({ type: "size", value: e.target.value })
              }
            >
              {/* value: e.target.value = <option>. value={size} */}
              {product.sizes.map((size) => (
                <option key={size} value={size} className="">
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`cursor-pointer border-1 ${
                    productTypes.color === color
                      ? "border-gray-400"
                      : "border-gray-200"
                  } rounded-full p-[1.2px]`}
                  onClick={() =>
                    handleProductType({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND CART BUTTON*/}
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all  duration-300 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
