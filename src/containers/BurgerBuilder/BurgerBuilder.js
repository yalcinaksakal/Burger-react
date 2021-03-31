import React, { Component } from "react";
import Aux from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const baseURL = "https://burger-react-d5fe4-default-rtdb.firebaseio.com/";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: null,
  };

  ingredientChangeHandler = (type, opperation) => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount && opperation === "remove") return;
    const opp = opperation === "add" ? 1 : -1;
    const updatedCount = oldCount + opp;
    //unmutate state
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    //price
    const priceChange = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + opp * priceChange;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };
  //purchaseHandler() { wont work because this will refer to event which called that function. So use arrow fnctions as abov
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false, error: null });
  };
  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    //in a real app price sort of important data should be calculated on server side, so that user cant manupulate them
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "YA",
        adress: { street: "adress", zipCode: "1234", country: "Germany" },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    fetch(baseURL + "/orders.json", {
      method: "POST",
      body: JSON.stringify(order),
    })
      .then(response => {
        if (!response.ok)
          throw new Error(response.status + " " + response.statusText);
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false, error: error });
      });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />
    );
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Modal show={this.state.error} modalClosed={this.purchaseCancelHandler}>
          {`Something went wrong. (${this.state.error})`}
        </Modal>
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientChanged={this.ingredientChangeHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />{" "}
        <Burger ingredients={this.state.ingredients} />
      </Aux>
    );
  }
}
export default BurgerBuilder;
// export default withErrorHandler(BurgerBuilder);
///use axıos to intercept fetching , in case error renderi modal here. wrap buregerbuilder with that function.
//i didnt choose that way.
