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
  // url 감시중...
  const searchParams = useSearchParams(); // 1. ReadonlyURLSearchParams {} : 쿼리 스트링 을 담을 수 있는 객체
  console.log("Categories compo searchParams>>>>>>>>>>>>>>", searchParams); // { 'category' => 'bags', 'test' => '123', 'text => asdf'  } 

  // 클릭시 category.slug === selectedCategory -> 배경색 렌더링용
  const selectedCategory = searchParams.get("category");
  console.log("selectedCategory>>>>>>>>>>", selectedCategory); //

  const pathname = usePathname();
  console.log("pathname", pathname); // "/"
  

  const router = useRouter();

  // http://localhost:3000/?category=bags&test=123&text=asdf 
  // 여기서 'category=bags' 이거만 뽑아서 옴
  const handleChange = (value: string | null) => {

    const params = new URLSearchParams(searchParams);// 2. ReadonlyURLSearchParams {} 복사

    // URL 쿼리 파라미터 중 category 값만 value로 설정!
    params.set("category", value || "all"); //http://localhost:3000/?category=jackets
    //  { scroll: true } : 경로 이동후 스크롤을 맨위로 이동 
    // alert("쿼리 스트링 작성!!!!!!!")
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // category=value 만 만듬 -> Homepage 에서 value 캐치! -> ProductList 로 value 전달 -> value값으로 Link 생성
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
