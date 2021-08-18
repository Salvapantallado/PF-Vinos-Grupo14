import { React, useEffect } from "react";
import {
  addCart,
  addProductToDBCart,
  addToFavourite,
} from "../../actions/index";
import cart2 from "../../assets/images/cart2.png";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

const Product = ({ image, name, price, id, delFromFavourite }) => {
  let productsFavourite = useSelector((state) => state.productFavourite);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth0();

  const addToCart = (id) => {
    if (isAuthenticated) dispatch(addProductToDBCart(id, user.sub)) ;
    else dispatch(addCart(id));
  };

  const addFavourite = (id) => {
    dispatch(addToFavourite(id));
  };

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(productsFavourite));
  }, [productsFavourite]);

  return (
    <div className="row center">
      <div key={name} className="product">
        <img src={`${image}`} alt="Henry" width="246" height="246" />
        <div className="product__data">
          <h3>{name}</h3>
          <br />
          <p>${price}</p>
          <br />
          <p className="product__stock">Stock</p>
          <div className="cartButton">
            <button onClick={() => addFavourite(id)}>
              Fav <FaStar className="star" color="#ffc107" size={15} />
            </button>

            <button onClick={() => addToCart(id)}>
              <img src={cart2} alt="cartlogo" width="30" height="30" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
