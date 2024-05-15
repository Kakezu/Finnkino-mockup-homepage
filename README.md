# Finnkino Mockup Home Page In Mobile View

This is a Mockup page utilizing React in Google IDX and Finnkino's API from [Finnkino XML](https://www.finnkino.fi/xml/) to show its theaters and different movies available. Work in progress. For the best experience, please use mobile view in developer tools since this is planned and developed only for that for the time being.

Link to Demo: [https://finnkinomockup.netlify.app/](https://finnkino-mockup.netlify.app/)

## Current  Features
- Able to choose from dropdown menus the theater, date, and the movie in Finnkino's current selection, all by fetching them through API.
- Able to see movie posters through horizontal scrolling. Unfortunately Finnkino does not offer XML data for the most popular so I have put all the available movies in it.

## Possible Future Features
- Language change to Swedish and English.
- Pressing "Etsi näytökset" would bring the movies below according to search criteria in dropdown menus.
- Implementing hamburger side menu.


## Installation

  
Use these steps to run the demo application on your local machine:

 1. Make sure you have React Framework installed.
 2. Either clone this repository to your local machine or download the .zip in this page.
 3. Install the project dependencies: **npm install** OR  separately:
 
- npm i axios
- npm i antd
- npm i --save @iconscout/react-unicons
 
 5. Start the development server: **npm run dev**
