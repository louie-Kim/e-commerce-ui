"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
  
  // url 입력하면 자동으로 useSearchParams() 가 쿼리 스트링읽음
  const searchParams = useSearchParams(); 
  // { 'category' => 'bags', 'sort' => 'newest' }
  console.log("Filter component searchParams", searchParams); // 1. ReadonlyURLSearchParams {} 처음


  const pathname = usePathname();
  const router = useRouter();

  // http://localhost:3000/products?category=accessories&sort=oldest
  // sort=oldest : 이 쿼리매개변수에 값을 넣어줌
  const handleFilter = (value: string) => {
    // alert(`soring!! ${value}`);
    const params = new URLSearchParams(searchParams); // 2. ReadonlyURLSearchParams {} 복사
    params.set("sort", value); // sort= 캐치 + 값넣기   // 3. http://localhost:3000/products?sort=oldest
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sort by: </span>
      <select
        name="sort"
        id="sort"
        className="ring-1 ring-gray-200 shadow-md p-1 rounded-sm"
        onChange={(e) => handleFilter(e.target.value)}
      >
        {/* e.target.value === <option value=" ">*/}
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
