import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = () => {
  return (
    <div className=''>
      {/* image: fill -> parent: relative, aspect-ratio */}
      <div className="relative aspect-[3/1] mb-12">
        <Image src="/featured.png" alt="Featured Product" fill/>
      </div>
      <div className="">
        <ProductList />
      </div>
    </div>
  )
}

export default Homepage