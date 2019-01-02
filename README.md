##personal-website
This repository houses the source code for my personal website (https://tylerlowrey.com)

My website is mostly static HTML with some JavaScript based niceties added in. For the front-end 
I have added a React app that is used to grab a list of my public github repositories and displays them on my website.
In order to grab that data from the Github API I send a GET request to a NodeJS server of mine that adds my personal
access token and then performs the API request and returns the necessary information.