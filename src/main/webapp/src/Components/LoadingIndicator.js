import React from "react";
import '../Styles/Components/LoadingIndicator.css';

const LoadingIndicator = ({loadingIconUrl = 'loading.gif'}) => {
    return(
        <div className="loading-indicator-container">
            <img src={loadingIconUrl} alt="Loading icon"/>
        </div>
    )
};

export default LoadingIndicator;