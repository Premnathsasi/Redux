import { useEffect, Fragment } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/UiSlice";
import Notification from "./components/UI/Notification";
import { cartActions } from "./store/CartSlice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);


  useEffect(() => {
    const fetchCartData = async() => {
      const fetchData = async () => {
        const response = await fetch(
          'https://http-request-30a26-default-rtdb.firebaseio.com/cart.json'
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch cart data!');
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const cartData = await fetchData();
        dispatch(
          cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity,
          })
        );
      } catch (error) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!',
          })
        );
      }
  
    };
    fetchCartData();
  }, [dispatch])

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "sending...",
          message: "sending cart data",
        })
      );
      const res = await fetch(
        "https://http-request-30a26-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!res.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "sent cart data failed",
          })
        );
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "sent cart data successfully",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    
    sendCartData().catch((err) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "sent cart data failed",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
