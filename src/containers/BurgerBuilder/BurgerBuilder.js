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
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: null,
  };

  priceCalculator(ingredients) {
    return Object.keys(ingredients).reduce(
      (price, current) =>
        (price += ingredients[current] * INGREDIENT_PRICES[current]),
      4
    );
  }

  async componentDidMount() {
   
    try {
      const response = await fetch(baseURL + "ingredients.json");

      if (!response.ok) throw new Error("Could not get response from server.");
      const data = await response.json();
      this.setState({
        ingredients: data,
        totalPrice: this.priceCalculator(data),
      });
    } catch (error) {
      error.message = "While getting ingredients - " + error.message;
      this.setState({ error: error });
    }
  }

  ingredientChangeHandler = (type, opperation) => {
    const oldCount = this.state.ingredients[type];
    if (!oldCount && opperation === "remove") return;
    const opp = opperation === "add" ? 1 : -1;
    //unmutate state
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = oldCount + opp;
    //price
    const newPrice = this.state.totalPrice + opp * INGREDIENT_PRICES[type];
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  };
  //purchaseHandler() { wont work because this will refer to event which called that function. So use arrow fnctions as above
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false, error: null });
  };
  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }

    queryParams.push("price=" + this.state.totalPrice.toFixed(2));

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;
    let orderSummary = null;
    let burger = (
      <div
        style={{
          margin: "0 auto",
          width: "60%",
          backgroundColor: "whitesmoke",
        }}
      >
        <Spinner />
      </div>
    );
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientChanged={this.ingredientChangeHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
          />
          <Burger ingredients={this.state.ingredients} />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) orderSummary = <Spinner />;
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Modal show={this.state.error} modalClosed={this.purchaseCancelHandler}>
          {`❌ Something went wrong. (${this.state.error})`}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
export default BurgerBuilder;
// export default withErrorHandler(BurgerBuilder);
///use axıos to intercept fetching , in case error renderi modal here. wrap buregerbuilder with that function.
//i didnt choose that way.
