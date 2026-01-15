import { Link } from "react-router-dom";

const ProductsList = ({ products }) => {
  // console.log(products);

  return (
    <div>
      <br />
      <br />
      <br />
      {products.map((item) => {
        return (
          <div key={item.id}>
            <img
              src={item.images[0]}
              alt={item.title}
              style={{ width: "200px", height: "150px", objectFit: "cover" }}
            />
            <h2>{item.title}</h2>
            <p>{item.price} $</p>
            <Link to={`/products/${item.id}`}>Xem chi tiết</Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
