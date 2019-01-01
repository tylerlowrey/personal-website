import React from 'react';

const Repo = (props) => {
    return(
      <div className="github-repo-box">
          <a href={props.url} className={(props.error) ? "error" : ""}>
              {props.repoName}</a>
          <p className="github-repo-description">{props.description}</p>
          {
              (!props.error) ?
                  <p className="github-repo-language"><span className="github-repo-lang-title">Language:</span> {props.repoLang}</p>
                  : ""
          }

      </div>
    );
};

export default Repo;