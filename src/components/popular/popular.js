import React from "react";
import api from "../../utils/api";
import "./popular.css";
import Loading from "../Loading/Loading";
function Selectlanguage(props) {
  var arr = ["All", "javaScript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="languages">
      {arr.map((lang) => {
        return (
          <li
            style={lang === props.selectedLanguage ? { color: "#d0021b" } : {}}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

function PopularGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => {
        return (
          <ul key={index} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={"Avatar for" + repo.owner.login}
                />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </ul>
        );
      })}
    </ul>
  );
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedLanguage: "All", repos: null };
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (lang) => {
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null,
      };
    });

    api.fetchPopularRepos(lang).then((repos) => {
      this.setState(() => {
        return { repos: repos };
      });
    });
  };

  render() {
    return (
      <div>
        <Selectlanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? (
          <Loading />
        ) : (
          <PopularGrid repos={this.state.repos} />
        )}
      </div>
    );
  }
}
export default Popular;
