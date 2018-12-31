import React from 'react';

const Repo = (props) => {
    return(
      <div className="github-repo-box">
          <a href={props.url}>{props.repoName}</a>
          <p className="github-repo-description">{props.description}</p>
      </div>
    );
};

export default Repo;