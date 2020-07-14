import React from "react";

const Repo = ({ repoData }) => {

    console.log(repoData);

    return(
        <div className="github-repo-box">
            <div className="github-repo-box-header">
                <h2>{repoData.name}</h2>
                <a href={repoData.html_url}><img src="images/Github-black.png" /></a>
            </div>
            <p className="github-repo-description">{repoData.description}</p>

            <p className="github-repo-language"><span className="github-repo-lang-title">Language:</span> {repoData.language}</p>

        </div>
    );
};

export default Repo;