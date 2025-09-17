"use client";

import useCartStore from "@/Stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

// in NavBar
const ShoppingCartIcon = () => {
  const { cart, hasHydrated } = useCartStore();

  // console.log("장바구니 아이콘's 숫자", cart);
  // hasHydrated : false -> 로컬스토리지에 저장돼 있던 상태 불러오고 true
  console.log("장바구니 hasHydrated", hasHydrated);

  // 로컬 스토리지에서 state 블러오는 동안 UI표시 안함.
  // hasHydrated = false -> true
  if (!hasHydrated) {
    console.log("hydrating!!");
    return null;
  }
  // state 다 불러 오면 UI 표시

  return (
    // relative 기준으로 -> absolute 자리 잡음
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      {/* 부모기준: left-[] 왼쪽에서'부터' 떨어짐, right-[] 오른쪽에서'부터' 떨어짐, top- , bottom-도 마찬가지 */}
      {/*  flex items-center justify-center -> 노란동그라미 안에 숫자를 '중앙'에 */}
      <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-sm font-medium">
        {cart.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </Link>
  );
};

export default ShoppingCartIcon;
