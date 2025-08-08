"use client";

import { ProductType } from "@/types";
import { log } from "node:console";
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
const ProductCard = ({product}:{product:ProductType}) => {
    // console.log("상품들...", product);
    
  return (
    <div className="">ProductCard</div>
  )
}

export default ProductCard