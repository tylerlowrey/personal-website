import React from "react";

const Repo = ({ repoData }) => {
    return(
        <div className="github-repo-box">
            <a href={repoData.url}>
                {repoData.name}</a>
            <p className="github-repo-description">{repoData.description}</p>

                <p className="github-repo-language"><span className="github-repo-lang-title">Language:</span> {repoData.language}</p>

        </div>
    );
};

export default Repo;