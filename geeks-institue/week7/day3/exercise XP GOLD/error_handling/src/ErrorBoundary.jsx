import React from "react";
import Modal from "./Modal";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  handleClose = () => {
    this.setState({ hasError: false, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal message="Something went wrong!" onClose={this.handleClose}>
          {this.state.errorInfo ? this.state.errorInfo.componentStack : null}
        </Modal>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;