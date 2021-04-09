import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
const baseURL = "https://burger-react-d5fe4-default-rtdb.firebaseio.com/";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
    error: false,
  };
  async componentDidMount() {
    try {
      const response = await fetch(baseURL + "orders.json");

      if (!response.ok) throw new Error("Could not get response from server.");
      const data = await response.json();
      const fetchedOrders = [];
      for (let key in data) fetchedOrders.push({ ...data[key], id: key });

      this.setState({ loading: false, orders: fetchedOrders });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  render() {
    let orders = (
      <div>
        {this.state.orders.map(order => (
          <Order
            ingredients={order.ingredients}
            key={order.id}
            id={order.id}
            price={order.price}
          />
        ))}
      </div>
    );
    if (this.state.loading)
      orders = (
        <div
          style={{ width: "100%", height: "100px", background: "whitesmoke" }}
        >
          <Spinner />
        </div>
      );
    return orders;
  }
}
export default Orders;
