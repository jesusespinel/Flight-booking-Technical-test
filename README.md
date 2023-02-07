Flight Reservation Application with React
This application is designed to allow users to search and book flights using the Indatum Flights API, built using React and JavaScript.

Features
A search bar with fields for origin city, destination city, departure date, number of passengers, and a search button.
A list of flights that match the search criteria, ordered by lowest price and displaying flight details.
Filtering options for flights by price and hour, and ordering options for price and hour.
A pop-up window for purchasing flights, allowing for currency conversion and calculation of IndatumMiles earned.
Saving of flight details in the local storage under the key "indatum-flights-reservation".

Requirements
Basic knowledge of HTML, CSS, React, and JavaScript
An API key for the Indatum Flights API
An API for currency conversion

Start the Application
Clone the repository to the  machine
git clone https://github.com/jesusespinel/flight-reservation-react
Navigate to the directory

cd flight-reservation-react
Install the necessary packages

npm install
Start the application
npm start
The application will start running at http://localhost:3000. 
Once the application is running, enter the desired origin city, destination city, departure date, and number of passengers in the search bar and click the search button. 
The list of flights matching the criteria will be displayed, allowing for further filtering and ordering options.
To purchase a flight, click the purchase button for that flight to view the pop-up window.
