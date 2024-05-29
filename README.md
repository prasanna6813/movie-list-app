# Steps to follow

* `npm install` - install required node modules,

* Create a `.env` file in the root of the project folder and add your api key as such

  ```
  REACT_APP_API_KEY = <your_api_key>
  ```
* `npm start` - to view it project the browser,

* note - use node latest version

## Features covered

* Created custom UI components for the app using React for reusability.
* Displayed a list of movies sorted in descending order of popularity.
* Shown the movie title, image, and a short description related to the movie in each information card.
* Loaded a total of 20 movies for each year.
* Rendered, by default, the list of movies from the year 2012.
* Implemented smooth scrolling behavior.
* Implemented movies fetch API integration.
* Implemented genre filter.
* Implemented search functionality.

## Features not covered

* Unable to show cast and director fields on the UI, as they are not present in the API fields.