"use client";

import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className="w-4 h-4" />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className="w-4 h-4" />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className="w-4 h-4" />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className="w-4 h-4" />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className="w-4 h-4" />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className="w-4 h-4" />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className="w-4 h-4" />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className="w-4 h-4" />,
    slug: "gloves",
  },
];

const Categories = () => {
  // http://localhost:3000/?category=bags&test=123&text=asdf 
  // useSearchParams() :   브라우저 URL의 쿼리 파라미터를 "구독" -> 현재 페이지의 쿼리 스트링 가져옴
  const searchParams = useSearchParams();
  // console.log("searchParams>>>>>>>>>>>>>>", searchParams); // { 'category' => 'bags', 'test' => '123', 'text => asdf'  }

  // 클릭시 category.slug === selectedCategory -> 배경색 렌더링용
  const selectedCategory = searchParams.get("category");
  // console.log("selectedCategory>>>>>>>>>>", selectedCategory); //

  // 경로주소를 잡아준다  http://localhost:3000/product =>  /product
  const pathname = usePathname();
  // console.log("경로 이름", pathname);

  const router = useRouter();

  // http://localhost:3000/?category=bags&test=123&text=asdf 
  // 여기서 'category=bags' 이거만 뽑아서 옴
  const handleChange = (value: string | null) => {

    const params = new URLSearchParams(searchParams); // 이거 로깅 안됨

    // URL 쿼리 파라미터 중 category 값만 value로 설정
    params.set("category", value || "all");
    //  { scroll: true } : 경로 이동후 스크롤을 맨위로 이동 
    // 직접 경로 생성 후 -> push!!
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-300 rounded-lg p-2  mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
