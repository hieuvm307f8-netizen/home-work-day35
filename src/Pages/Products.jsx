import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "rc-pagination";
import SearchInput from "../Components/SearchInput";
import ProductsList from "../Components/ProductsList";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 10; 
  const searchQuery = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * limit;

        let url = "";
        if (searchQuery) {
          url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`;
        } else {
          url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        setProducts(data.products);
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [searchQuery, currentPage]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ q: value, page: 1 });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (page) => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery, page: page });
    } else {
      setSearchParams({ page: page });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products Page</h1>
      
      <SearchInput value={searchQuery} handle={handleInputChange} />

      {loading ? (
        <div style={{ marginTop: "20px" }}>Loading data...</div>
      ) : (
        <>
          <ProductsList products={products} />
          
          {total > 0 && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
              <Pagination
                current={currentPage}
                total={total}
                pageSize={limit}
                onChange={handlePageChange}
                prevIcon="Trước"
                nextIcon="Sau"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;