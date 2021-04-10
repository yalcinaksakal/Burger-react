import React, { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
const baseURL = "https://burger-react-d5fe4-default-rtdb.firebaseio.com/";

class Orders extends Component {
  state = {
    orders: {},
    loading: true,
    error: false,
  };

  async getOrders() {
    try {
      const response = await fetch(baseURL + "orders.json");

      if (!response.ok) throw new Error("Could not get response from server.");
      let data = await response.json();
      if (!data) throw new Error("You haven't ordered a burger yet.");
      this.setState({ loading: false, orders: data });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
    }
  }

  componentDidMount() {
    this.getOrders();
  }

  deleteOrderHandler = id => {
    fetch(baseURL + "orders/" + id + ".json", {
      method: "DELETE",
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        this.getOrders();
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };
  render() {
    let orders = (
      <div>
        {Object.keys(this.state.orders).map(order => (
          <Order
            ingredients={this.state.orders[order].ingredients}
            key={order}
            id={order}
            price={this.state.orders[order].price}
            deleter={this.deleteOrderHandler}
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
    if (this.state.error)
      orders = (
        <div
          style={{
            width: "100%",
            height: "100px",
            background: "whitesmoke",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {" "}
          {`❌ ${this.state.error}`}
        </div>
      );
    return orders;
  }
}
export default Orders;
