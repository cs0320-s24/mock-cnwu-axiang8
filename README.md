> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

This project is called "mock". We are building an application that can process and search Real Estate data. The team members of this project are Austin Xiang (axiang8) and Calvin Wu (cnwu). The total time it took to complete this project was around 15 hours.

GitHub repository: https://github.com/cs0320-s24/mock-cnwu-axiang8.git

# Design Choices

The App.tsx component is the highest level, which contains the user interface, such as the header displayed when opening the application, and the Login button. LoginButton.tsx contains an interface that makes the prop for the export function LoginButton. The interface contains a boolean isLoggedIn, a function intended to update the state of isLoggedIn. The login button function handles the logic between the Login and Sign Out button, based on whether the user is logged in or not.

Most of the actual load_file/search/view/mode logic is contained in the CommandSystem component and in the CommandProcessor class. CommandSystem has an interface called CommandRegistry that maps commands as strings to the respective functions that needs to be called when the command is inputted by the user. There is also an interface called REPLFunction, which allows the developer to create new functions if needed, as long as it implements this interface (which takes in an array of strings and returns a String or JSX.Element) and is added to the CommandRegistry.

The load_file, view, and search commands utilized the mocked data stored in mockedJson.ts in the data folder as we are currently just developing the front-end of the application. view() and search() call on the renderTable() function to return an neatly formatted HTML table, instead of an array of strings.

In the REPLInput component, there is an interface called REPLInputProps that takes in a function that represents the command, and is passed into export function REPLInput. REPLInput manages the logic for commands being inputted into the command box, and calls the function in REPLInputProps that is passed in from the prop. (more on this later...)

In the REPLHistory component, there is an interface that contains a StateAction array (StateAction being a export type that can either be a String or JSX.Element), and goes through all the StateAction outputs (what the functions have returned) in the array and returns them.

The props for REPLInput and REPLHistory are both actually passed in in the REPL component, which is where the dependency injection comes in. In REPL, an instance of the CommandProcessor class (in the CommandSystem component) is created, which calls processCommand (currently this would just call either mode, load_file, search, or view). This instance of CommandProcessor is used in the function passed into REPLInput, and the output of calling its processCommand() is what is added onto the REPLHistory map.

In the styles folder, we have CSS files which specifies the presentation for the App (header), index (the button), and main (what the functions return).

# Errors/Bugs

We do not have any known errors or bugs.

# Tests

We have two testing files, one for unit tests and one for integration tests. For unit tests in Basic.spec.ts, we have the following tests: seeing login button when page loads, not seeing the command box until logged in, typing into command box changes its text, when page loads a button appears. Aside from user interface tests, we test for user experience/functionality: the mode command switchs from default brief to verbose, and calling it once again switches back to brief, incorrect usage of mode gives an error. For load_file, we test correct loading of file in both brief and verbose, loading incorrect file path. For view, we test viewing after correctly loading and viewing without loading. For search, we test searching without loading, searching for a valid column but invalid value, searching with an invalid column, searching data with one row, and searching data with one column.

For integration testing in App.spec.ts, we test a sequence of load file1 -> load file2 -> view, load file1 -> search -> load file2 -> search, and load file1 -> view -> search -> load file2 -> view -> search.

# How to

To run these tests, the Playwright tests extension must be installed, and the tests can be run by right clicking on the test folder and selecting the option to run all the tests.

# Collaboration

We did not seek outside collaboration.
