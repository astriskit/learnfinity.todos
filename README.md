# About

A simple todo app with feature to add hashtag for easy searching.

## User flows

- Add a todo by writing in the text field and pressing enter/clicking "Go".
- Clear all the todos by clicking on "CLEAR".
- Add hashtags as a part of text while adding todo.
- Find hashtag containing todos by first switching the mode clicking the button having label "Find"; The default mode is "Add".
- Write hashtag(s) using `#{tag}` separated by space and pressing enter/clicking "Go".
- Only tasks with all the tags entered will be shown. Note: "#fault" won't match "$fault,";
- To clear the tags, either change the mode or clean the input-field and hit enter.
- Towards the footer, a summary of todo and finished items is shown.
- Click on the footer buttons, in the summary section to go-to/scroll-to the relevant items.
- Refresh the window/browser-tab to see that the tasks so-far entered persists.
- Works without internet, once loaded on the browser. Uses local-memory.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
