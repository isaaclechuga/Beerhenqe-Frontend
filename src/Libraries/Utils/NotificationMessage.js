import React, { Component } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class NotificationMessage extends Component {
  render() {
    return (
      <Snackbar
        autoHideDuration={this.props.autoHideDuration}
        anchorOrigin={this.props.anchorOrigin}
        open={this.props.open}
        onClose={this.props.handleCloseSnackbar}
        style={this.props.snackBarStyle}
      >
        <Alert
          onClose={this.props.handleCloseSnackbar}
          severity={this.props.alertType}
        >
          <div>{this.props.alertMessage}</div>
        </Alert>
      </Snackbar>
    );
  }
}

NotificationMessage.defaultProps = {
  open: false,
  autoHideDuration: null,
  anchorOrigin: { vertical: "bottom", horizontal: "center" },
  snackBarStyle: {},
  alertType: "info",
  alertMessage: "",
  handleCloseSnackbar: () => {},
};

NotificationMessage.propTypes = {
  open: PropTypes.bool.isRequired,
  autoHideDuration: PropTypes.number,
  anchorOrigin: PropTypes.object,
  snackBarStyle: PropTypes.object,
  alertType: PropTypes.string,
  alertMessage: PropTypes.string,
  handleCloseSnackbar: PropTypes.func,
};

export default NotificationMessage;
