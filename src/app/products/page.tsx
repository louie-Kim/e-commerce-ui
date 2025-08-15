import ProductList from "@/components/ProductList";

// next.js page.tsx에서는 searchParams사용해서 바로 fetching 가능
const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>; // Promise<T>
}) => {
  const category = (await searchParams).category;
  console.log("ProductPage compo category>>>>>>>>>>>", category);

  return (
    <div className="">
      <ProductList category={category} params="products"/>
      products.page.tsx
    </div>
  );
};

export default ProductPage;
