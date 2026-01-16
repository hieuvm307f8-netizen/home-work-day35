import { Link } from "react-router-dom";

const ProductsList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p style={{ marginTop: "20px" }}>Không tìm thấy sản phẩm nào.</p>;
  }

  return (
    <div 
      style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
        gap: "20px", 
        marginTop: "20px" 
      }}
    >
      {products.map((item) => {
        return (
          <div 
            key={item.id} 
            style={{ 
              border: "1px solid #ddd", 
              padding: "10px", 
              borderRadius: "8px", 
              textAlign: "center" 
            }}
          >
            <img
              src={item.images[0]}
              alt={item.title}
              style={{ width: "100%", height: "150px", objectFit: "contain" }}
            />
            <h3 style={{ fontSize: "16px", margin: "10px 0" }}>{item.title}</h3>
            <p style={{ color: "red", fontWeight: "bold" }}>{item.price} $</p>
            <Link 
              to={`/products/${item.id}`} 
              style={{ 
                display: "inline-block", 
                marginTop: "5px", 
                textDecoration: "none", 
                color: "blue" 
              }}
            >
              Xem chi tiết
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;