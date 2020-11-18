import * as React from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

export default function Index() {
  let [productList, setProductList] = React.useState<ProductDetails[]>([]);
  React.useEffect(() => {
    Axios("/api/products/getAllProducts")
      .then((response) => {
        const { data } = response;
        setProductList(data.productList);
      })
      .catch((err) => {
        toast.error("Could not connect to the server.");
      });
  }, []);
  return (
    <React.Fragment>
      {productList?.length ? ( // if product-list download succeded
        <React.Fragment>
          <h1>Available Products</h1>
          <div className="productContainer">
            {productList.map((item) => {
              return (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  brand={item.brand}
                />
              );
            })}
          </div>
        </React.Fragment>
      ) : (
        // if there are no products, mainly because the connection to the server failed.
        <React.Fragment>
          <h3>Sorry, no products found.</h3>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
