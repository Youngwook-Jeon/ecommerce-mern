import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const loadPayPalScript = () => {
  loadScript({
    "client-id":
      "AZUPSyzwpdj8lEHD0kHPEInt0XKDf0ug3Z8VFrWxrsYvKowMOVkVaL8QMTYY1wnmoz-weg6fB3ppM-YK",
  })
    .then((paypal) => {
      paypal.Buttons({
        createOrder: createPayPalOrderHandler,
        onCancel: onCancelHandler,
        onApprove: onApproveHandler,
        onError: onErrorHandler,
      }).render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
};

const createPayPalOrderHandler = function () {
  console.log("createPayPalOrderHandler");
}

const onApproveHandler = function () {
  console.log("onApproveHandler");
}

const onCancelHandler = function () {
  console.log("onCancelHandler");
}

const onErrorHandler = function () {
  console.log("onErrorHandler");
}

const UserOrderDetailsPage = () => {
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  const getUser = async () => {
    const { data } = await axios.get("/api/users/profile/" + userInfo._id);
    return data;
  };

  return (
    <UserOrderDetailsPageComponent
      userInfo={userInfo}
      getUser={getUser}
      getOrder={getOrder}
      loadScript={loadScript}
      loadPayPalScript={loadPayPalScript}
    />
  );
};

export default UserOrderDetailsPage;
