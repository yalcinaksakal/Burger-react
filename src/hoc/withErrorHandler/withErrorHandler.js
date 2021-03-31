import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxilary/Auxilary";

const withErrorHandler = WrappedComponent => {
  return class extends Component {
    state = { error: null };
    componentWillMount() {
      // set axios interceptor
      //this.reqInterceptor=axios.interceptors.request.use(req=>{ this.setState({error:null});return req;});
      //this.resInterceptor=axios.interceptors.response.use(res=>{ this.setState({error:error});return res;});
    }
    componentWillUnmount() {
      //remoe interceptor
      //axios.interceptors.request.eject.(this.reqInterceptor);
      //axios.interceptors.response.eject.(this.resInterceptor);
    }
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
