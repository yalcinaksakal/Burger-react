import React, { Component } from "react";
import Aux from "../../hoc/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

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

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) disabledInfo[key] = disabledInfo[key] <= 0;
    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ordered={this.purchaseHandler}
          ingredientChanged={this.ingredientChangeHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
