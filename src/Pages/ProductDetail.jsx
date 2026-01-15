import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState({});
  const [image, setImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error("Fail to fetch !");
        const data = await response.json();
        setProductDetail(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetail();
  }, [id]);

  if (loading) return <span>Loading...</span>;

  return (
    <div>
      <h1>Product Detail</h1>
      <div>
        <img
          src={image ? image : productDetail.thumbnail}
          alt={productDetail.title}
          style={{ width: "200px", height: "150px", objectFit: "cover" }}
        />

        {/* Detail-control */}
        <div style={{ display: "flex", gap: " 10px" }}>
          {productDetail.images.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "80px",
                  height: "80px",
                  border: "1px solid #333",
                  marginTop: "10px",
                }}
                onClick={() => setImage(item)}
              >
                <img
                  src={item}
                  alt={productDetail.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </div>
            );
          })}
        </div>

        <h2>{productDetail.title}</h2>
        <p>{productDetail.price} $</p>
      </div>
    </div>
  );
};

export default ProductDetail;
