 ## Project Description
 
Note: Site does not work with CORS enabled in the browser  

The application is a platform for watching educational videos videos. Application built with: React.js, Redux and Ant design.

The main page displays a list of courses with detailed information and a course preview image. The page looks like below:

[![courses img](https://github.com/Osokin-Sanya/genesis-tech-task/raw/main/docs/courses-img.png?raw=true)](https://github.com/Osokin-Sanya/genesis-tech-task/blob/main/docs/courses-img.png?raw=true)

Clicking on a course will redirect you to the page with the lessons for that course. An example page is shown below:

[![course img](https://github.com/Osokin-Sanya/genesis-tech-task/raw/main/docs/course-img.png?raw=true)](https://github.com/Osokin-Sanya/genesis-tech-task/blob/main/docs/course-img.png?raw=true)

### [](https://github.com/Osokin-Sanya/genesis-tech-task#available-scripts)Available Scripts

#### [](https://github.com/Osokin-Sanya/genesis-tech-task#npm-start)`npm start`

#### [](https://github.com/Osokin-Sanya/genesis-tech-task#npm-run-build)`npm run build`

`api/index.js`- this code exports two asynchronous functions: fetchCourses and fetchCourse. The function fetchCourse sends a GET request to the server at the address specified in the endpoints.courseById function, with an authorization header containing a JWT token. 

If the request is successful, the function returns an array containing the received data and a null value. If the request fails, the function returns an array containing a null value and an error object. The *BASE_API* variable contains the base URL for the API, and the endpoints variable contains the API endpoints used in the fetchCourses and fetchCourse functions. 

The *updateJWT* function sends a GET request to the server at the address specified in the endpoints.auth variable, and retrieves a JWT token. The function then saves the token in local storage and returns it. If the request fails, the function returns a null value. 

The *getJWT* function checks if there is a JWT token in local storage, and if it exists and has not expired, returns it. If the token does not exist or has expired, the function calls the updateJWT function to retrieve a new token and returns it. The functions isTokenExpired and Storage are also imported from the `../utils.js` module, which are used to check and store the JWT token, respectively.

`CourseList.jsx`. This code is a React component that displays a list of courses. It uses the Ant Design library to display list items and pagination. The component retrieves course data from the Redux repository using the useSelector hook and sends an action to get the current course data when you click on the course using the useDispatch hook. The component also uses the useNavigate hook from React Router to navigate to the course page when the course is clicked. The list items display the course title, description, number of lessons, rating, and skills. Skills are displayed as tags using the Tag component from Ant Design. The component also displays a preview image for each course.

`Course.jsx`. This code is a React component that displays a course with its lessons and a video player for each lesson. It uses the Ant Design library for the layout and menu components. The component fetches the course data from the Redux store using the useSelector hook and dispatches an action to fetch the data if it's not already available. 

It also uses the useParams hook from React Router to get the current course ID from the URL. The component has two useEffect hooks: one to fetch the course data when the component mounts, and another to set the current lesson ID to the first lesson in the course if it's not already set. The component renders a layout with a sidebar menu for the lessons and a content area for the video player. It uses the Menu component from Ant Design to display the lessons and sets the current lesson ID when a lesson is clicked.

The current lesson is then displayed in the content area, along with its title and a video player component. If the lesson is locked, a message is displayed instead of the video player. Overall, this code is a well-structured and organized React component that effectively displays a course with its lessons and video player.

`VideoPlayer.jsx` . This is a component that renders a video player using the Hls.js library. It takes a lesson object as a prop, which contains a link to the video and its duration. The component uses a video element and a ref to it, as well as a ref to the Hls.js instance. It also uses state to keep track of the current time and whether the video is playing or not. The component has several useEffect hooks that handle loading the video and cleaning up after it's done. It also has event handlers for playing, pausing, changing the volume, rewinding the video, and handling keyboard events. It also has a handler for saving the video progress to local storage. 

The component renders the video element, as well as a set of controls for playing, pausing, changing the volume, rewinding the video, and entering/exiting picture-in-picture mode. It also renders a progress bar that shows the current time and allows the user to rewind the video by clicking on it.

## Available Scripts

### `yarn dev`

### `yarn build`
