# BeerNotes V2 README

# Create Vite + React Project

    https://vite.dev/
    https://www.geeksforgeeks.org/how-to-set-up-a-vite-project/

NOTE: app name must be lowercase and alphanumeric ( underscore"\_" ALLOWED but NO "-" dashes)

    npm create vite@latest beernotes_v2_frontend -- --template react-ts

# Run Vite + React Project

    - npm run dev
    - Local: http://localhost:5173/

# BeerNotes V2 Backend APIs

NOTE: frontend currently uses axios fo backend calls: npm install axios
Do the following Google search: use a vite react ts project with a java backend

# Styling

NOTE: react bootstrap has been installed: npm install bootstrap-react bootstrap

# Testing Librairies

    vitest: npm install -D vitest
    React Testing Library: npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom

# Backend APIs

LIST of Available backend APIs
1. GET http://localhost:8080/api/beernotes/beerlist - Retrieves a list of beer notes.
2. POST http://localhost:8080/api/beernotes/saveBeer - Saves a new beer note.
3. DELETE http://localhost:8080/api/beernotes/deleteBeer/{beerName}- Deletes a beer note by beer name.
4. PUT http://localhost:8080/api/beernotes/updateBeerNote/{beerName} - Updates a beer note by beer name.
5. DELETE http://localhost:8080/api/beernotes/deleteBeerById/{id}- Deletes a beer note by id. Note: Id is that present in backend Db


# Key points

1. Form Submission

   - Upon submission A form requires a " Handler method"
     onSubmit on <Form>:

   The onSubmit event is triggered when the form is submitted (e.g., when the user clicks the submit button or presses Enter).
   The handleFormSubmit function is called, and e.preventDefault() prevents the default page reload.
   Submit Button with type="submit":

   The button must have type="submit" to trigger the form's onSubmit event.
   Custom Logic in handleFormSubmit:

   Add your custom logic inside the handleFormSubmit function, such as sending the form data to an API or performing validation.

2. Form validation and empty field submission prevention message

   - useState<string | null>(null)

   initializes a state variable that can hold either a string or null

   - {error && ...}:

   Ex: {error && <p className="text-danger">{error}</p>}

   - If error is null, nothing is rendered.
   - If error contains a string, it renders the <p> element with the error message.

3. What is e.preventDefault() ?

   By default, submitting a form in HTML causes the browser to reload the page.
   Calling e.preventDefault() prevents this default behavior, allowing you to handle the form submission in JavaScript (e.g., validating the form, sending data to an API).

   Key Properties of e
Here are some useful properties and methods of the e object:

Property/Method	Description
e.preventDefault()	-> Prevents the default behavior of the form submission (e.g., page reload).
e.target -> Refers to the element that triggered the event (in this case, the <form>).
e.currentTarget ->	Refers to the element to which the event handler is attached.
e.type -> The type of the event (e.g., "submit").

# Dynamic Table Updating

To dynamically refresh the table when a new beer is added, you can use a combination of state management and event-driven updates. Here's how you can achieve this:

1. Lift State Up: Move the beerNotes state to a parent component (e.g., App.tsx) so that both the BeerCapButtonForm and BeerNoteTable components can share and update the same state.

2. Pass a Callback: Pass a callback function from the parent component to BeerCapButtonForm that updates the beerNotes state when a new beer is added.

3. Update State Dynamically: When a new beer is successfully added via the form, update the beerNotes state in the parent component. This will automatically re-render the BeerNoteTable component with the new data.

# Maintenance
1. Updating vite
     - npm outdated
     - npm update 
     - npm update vite  ( updates the Vite package in your project)
     - npm install vite@latest @vitejs/plugin-react@latest --save-dev  (migrate to new version)
     - npm update eslint eslint-plugin-react-hooks eslint-plugin-react-refresh typescript

2. Updating vitest
     - $ npm install vitest@latest -D
