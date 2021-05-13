import React from "react";
function PlayerPreview(props) {
  return (
    <div>
      <div className="column">
        <img
          className="avatar"
          src={props.avatar}
          alt={`Avatar for ${props.username}`}
        />
        <h2 className="username">
          <a
            className="GithubProfile"
            href={`https://github.com/${props.username}`}
          >
            @{props.username}
          </a>
        </h2>
      </div>
      {props.children}
    </div>
  );
}
export default PlayerPreview;
