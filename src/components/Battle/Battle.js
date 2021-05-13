import React from "react";
import { Link } from "react-router-dom";
import "./Battle.css";
import PlayerPreview from "../PlayerPreview/PlayerPreview";
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  handleChange = (event) => {
    var value = event.target.value;
    this.setState(() => {
      return { username: value };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  };
  render() {
    return (
      <div>
        <form className="column" onSubmit={this.handleSubmit}>
          <label className="header" htmlFor="username">
            {this.props.label}
          </label>
          <input
            id="username"
            placeholder="github username"
            type="text"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="Button"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null,
    };
  }
  handleSubmit = (id, username) => {
    this.setState(() => {
      var newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  };
  handleReset = (id) => {
    this.setState(() => {
      var resetState = {};
      resetState[id + "Name"] = "";
      resetState[id + "Image"] = null;
      return resetState;
    });
  };
  render() {
    var playerOne = this.state.playerOneName;
    var playerTwo = this.state.playerTwoName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoImage = this.state.playerTwoImage;
    var match = this.props.match;
    return (
      <div className="battle-column">
        <div className="row">
          {!playerOne && (
            <PlayerInput
              id={"playerOne"}
              label={"Player One"}
              onSubmit={this.handleSubmit}
            />
          )}
          {playerOneImage !== null && (
            <PlayerPreview avatar={playerOneImage} username={playerOne}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, "playerOne")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
          {!playerTwo && (
            <PlayerInput
              id={"playerTwo"}
              label={"Player Two"}
              onSubmit={this.handleSubmit}
            />
          )}
          {playerTwoImage !== null && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwo}>
              <button
                className="reset"
                onClick={this.handleReset.bind(null, "playerTwo")}
              >
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage && playerTwoImage && (
          <Link
            className="Button"
            to={{
              pathname: `${match.url}/results`,
              search: `?playerOneName=${playerOne}&playerTwoName=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    );
  }
}
export default Battle;
