import UserOrderDetailsPageComponent from "./components/UserOrderDetailsPageComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";

const getOrder = async (orderId) => {
  const { data } = await axios.get("/api/orders/user/" + orderId);
  return data;
};

const loadPayPalScript = (
  cartSubtotal,
  cartItems,
  orderId,
  updateStateAfterOrder
) => {
  loadScript({
    "client-id":
      "AZUPSyzwpdj8lEHD0kHPEInt0XKDf0ug3Z8VFrWxrsYvKowMOVkVaL8QMTYY1wnmoz-weg6fB3ppM-YK",
  })
    .then((paypal) => {
      paypal
        .Buttons(
          buttons(cartSubtotal, cartItems, orderId, updateStateAfterOrder)
        )
        .render("#paypal-container-element");
    })
    .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
    });
};

const buttons = (cartSubtotal, cartItems, orderId, updateStateAfterOrder) => {
  return {
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: cartSubtotal,
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: cartSubtotal,
                },
              },
            },
            items: cartItems.map((product) => {
              return {
                name: product.name,
                unit_amount: {
                  currency_code: "USD",
                  value: product.price,
                },
                quantity: product.quantity,
              };
            }),
          },
        ],
      });
    },
    onCancel: onCancelHandler,
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (orderData) {
        var transaction = orderData.purchase_units[0].payments.captures[0];
        if (
          transaction.status === "COMPLETED" &&
          Number(transaction.amount.value) === Number(cartSubtotal)
        ) {
          updateOrder(orderId)
            .then((data) => {
              if (data.isPaid) {
                updateStateAfterOrder(data.paidAt);
              }
            })
            .catch((err) => console.log(err));
        }
      });
    },
    onError: onErrorHandler,
  };
};

const createPayPalOrderHandler = function () {
  console.log("createPayPalOrderHandler");
};

const onCancelHandler = function () {
  console.log("onCancelHandler");
};

const onErrorHandler = function () {
  console.log("onErrorHandler");
};

const updateOrder = async (orderId) => {
  const { data } = await axios.put("/api/orders/paid/" + orderId);
  return data;
};

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
