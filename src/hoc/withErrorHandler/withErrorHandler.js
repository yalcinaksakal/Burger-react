import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary/Auxilary";

const withErrorHandler = WrappedComponent => {
  return class extends Component {
    state = { error: null };
    componentDidMount() {}
    render() {
      console.log(WrappedComponent.props);
      return (
        <Aux>
          <Modal>Sth went wrong!</Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
export default withErrorHandler;

///use axıos to intercept fetching , in case error renderi modal here. wrap buregerbuilder with that function.
//i didnt choose that way.
