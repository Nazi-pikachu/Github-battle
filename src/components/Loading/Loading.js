import React from "react";
import "./Loading.css";
class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };
  }
  componentDidMount() {
    var stopper = this.props.text + "...";
    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState(() => {
          return {
            text: this.props.text,
          };
        });
      } else {
        this.setState((state) => {
          return {
            text: state.text + ".",
          };
        });
      }
    }, this.props.speed);
  }
  componentWillUnmount() {
    console.log("Unmounted");
    window.clearInterval(this.interval);
  }
  render() {
    return <p className="loader">{this.state.text}</p>;
  }
}
Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
export default Loading;
