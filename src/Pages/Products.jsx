import SearchInput from "../Components/SearchInput";
import ProductsList from "../Components/ProductsList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = searchParams
          ? `https://dummyjson.com/products/search?q=${searchQuery}`
          : "https://dummyjson.com/products?limit=10";
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // console.log(data.products);
        setProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({}); 
    }
  };

  if (loading) return <span>Loading....</span>;

  return (
    <div>
      <h1>Products Page</h1>
      <SearchInput value={searchQuery} handle={handleInputChange} />
      <ProductsList products={products} />
    </div>
  );
};

export default Products;
