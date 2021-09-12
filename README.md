# Time Log!

I created this project to practice my skills on MERN Stack, and this is my first project using MERN Stack. This project is just simple with the purpose of tracking your break time at work. I made this minimalistic wherein only essential elements are displayed, making the app very easy to use and user-friendly. The working hours and break time per day are currently hardcoded to make it more minimalistic for me. Still, of course, I will soon implement a customization feature for multiple users using this app.

Deployed in Heroku with this URL: https://time-log-17.herokuapp.com/
(The deployed URL has a hardcoded break time of 1 minute to test the app's functionality.)


## Frontend

I used React.js for the frontend because I find it easier to render the output after each button click utilizing this framework. I used functional components as it's easier to read. Hooks (useState and useEffect) and conditional rendering is used for this app.

I used Material-UI components for the icon and the buttons with animation when clicked. I created the TimeBox component as it's being reused after clicking the 'Start Working' button and the 'Done Working' button. I used HTML and CSS for the rest of the elements and Flexbox for the layout.


## Backend

I used Node.js and its Express.js framework for the server and MongoDB as the database and Mongoose to create the model. I used Get, Post, and Patch requests for this app.
You can check the HTTP request and response in Google Chrome by right click, select 'Inspect' to open the developer tools, then select the 'Network' tab. The responses are also logged in the 'Console' tab.

### Get Request

The get request for the home page fetches the build folder created during the deployment.
The get request for path '/time-log/data' fetches the data from the MongoDB database.
React renders the fetched data to the frontend using Axios to retain your data or progress after refreshing the browser or visiting the site on another device. However, the data for that day is only rendered for that day.

### Post Request

The post request is triggered at the start of the day, meaning a fresh new document is created in the MongoDB database. The collection in the database is designed to have only one collection per day.

### Patch Request

I used patch request to update the document in the database, which was created using post request at the start of the day.
The patch request triggers after clicking the buttons.


## Connecting Frontend and Backend

In package.json, the start script is set to run the server.js file of the backend using Node.js; this will trigger the get request for the home page that fetches the build folder created during the deployment through the "heroku-postbuild" in package.json. Axios is used in the frontend to make HTTP requests.


## Usage

### `Start Working` Button

When you click the 'Start Working' button, the app will show the time you should stop working, given the working hours for the day. The working hours for this app are hardcoded to 10 hours (inclusive of 1-hour lunchtime). Based on Pomodoro, the break time should be about 175 minutes for 9 working hours per day and is also hardcoded.

After clicking this button, there is no turning back for the day as there is no reset button as I intended this app to be minimalistic as possible, but I will add a reset button feature soon. You will encounter this button the next day as I designed the reset on the next day.

### `Take a Break` & `Resume Working` Button

When you click the 'Take a Break' button, the 'Remaining Break Time' will be adjusted and lessen according to the duration of your break time. After clicking the 'Resume Working' button, you will see your remaining break time output.

When the 'Remaining Break Time' becomes negative, the app will adjust the 'Stop working' time as an offset.

### `Done Working` Button

When you click the 'Done Working' button, it will show your overtime and outstanding overtime. The outstanding overtime is the summation of all overtime in the database. Negative overtime means undertime.

**A bug where the outstanding overtime is not rendered immediately. The workaround for this is to refresh the browser. This issue is to be resolved.**
