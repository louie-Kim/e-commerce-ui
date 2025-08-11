"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"


const ShoppingCartIcon = () => {
  return (
    // relative 기준으로 -> absolute 자리 잡음
    <Link href="/cart" className="relative">
         <ShoppingCart className="w-4 h-4 text-gray-600"/> 
         {/* 부모기준: left-[] 왼쪽에서'부터' 떨어짐, right-[] 오른쪽에서'부터' 떨어짐, top- , bottom-도 마찬가지 */}
         {/*  flex items-center justify-center -> 노란동그라미 안에 숫자를 '중앙'에 */}
         <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-sm font-medium">0</span>
    </Link>
  )
}

export default ShoppingCartIcon