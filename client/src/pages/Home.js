//REACT
import React from "react";
import { useEffect } from "react";
// import { Link } from "react-router-dom"

//REACT-REDUX
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

//LAYOUT
import LayoutPrimary from "../layouts/layout-primary";

//COMPONENTS
import SimpleForm from "../components/SimpleForm/SimpleForm";
import Pagination from "components/pagination/pagination";
import Filtros from "../components/FIltros/filtros";
// import { ReactComponent as Arrow } from "assets/images/arrow.svg";
import AllProducts from "../components/allProducts/allproducts";
// import Cart from "components/cart/Cart";
import Carousel from "../components/carousel/carousel";
// import HistoryUser from "../components/historyUser/historyUser"
//ACTIONS
import {
  clearCart,
  getFavorites,
  getOrderlines,
  getUser,
  unifyCarts
} from "actions";

//BACKGROUND
import background from "assets/images/vendimia.jpeg";
import toast, { Toaster } from "react-hot-toast";

const Home = props => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  const cart = useSelector(state => state.cart);
  const userDB = useSelector(state => state.user);
  const cartDB = useSelector(state => state.cartDB);
  const addProductLogged = useSelector(state => state.addProductToDB);
  const editFavoritesState = useSelector(state => state.editFavorites);

  useEffect(() => {
    if (isAuthenticated && !userDB) {
      dispatch(getUser(user));
    }
  }, [dispatch,isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && userDB && cart.length) {
      dispatch(unifyCarts(user.sub, cart));
      toast.success("Products of your cart were successfully added !");
      dispatch(clearCart());
    }
  }, [userDB]);

  useEffect(() => {
    if (isAuthenticated && userDB) {
      dispatch(getOrderlines(userDB.order.id));
    }
  }, [cartDB, addProductLogged, userDB]);

  useEffect(() => {
    if (isAuthenticated && userDB) dispatch(getFavorites(user.sub));
  }, [userDB,editFavoritesState]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <LayoutPrimary>
      <div>
        <Toaster />
      </div>
      <div
        className="catalogo__container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          width: "100%",
          backgroundSize: "cover"
        }}
      >
        <div className="container">
          <h1>we have more than 90 varieties of wines</h1>
        </div>
      </div>
      {isAuthenticated ? <Carousel /> : null}

      <div id="catalogo">
        <br/>
        <br/>
        <div>
          <Filtros />
          <SimpleForm />
        </div>
        <AllProducts />
      </div>
      <div>
        <Pagination/>
      </div>
    </LayoutPrimary>
  );
};

export default Home;
