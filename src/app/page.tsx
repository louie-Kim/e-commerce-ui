import ProductList from "@/components/ProductList"
import Image from "next/image"
/**
 * client 컴포넌트에서는 useSearchParams() 사용해서 searchParams 얻지만
 * next.js page.tsx에서는 searchParams사용해서 바로 category=jackets 캐치 가능
 * 쿼리스트링 중에서 category 값만 감지
 */
const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>; // Promise<T>
}) => {


  const category = (await searchParams).category
  console.log("Homepage compo category", category);
  
  return (
    <div className=''>
      {/* image: fill -> parent: relative, aspect-[ratio] */}
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill/>
      </div>
      <div className="">
        <ProductList  category={category} params="homepage"/>
      </div>
    </div>
  )
}

export default Homepage