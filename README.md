# Jupiter Toys

Technical assessment of test automation.

## Installation

- Clone the repo from https://github.com/sebastianlealj10/jupyter_toys
- Ensure you have node installed globally in your pc, the recommended node version is >=14. Install the dependencies in the project folder using the next npm command.
```bash
npm install
```
## Run the tests

To open the tests you can use the next script

```bash
npm run cypress:open
```

To run it from command line you can use

```bash
npm run cypress:run
```
This will run the tests on Chrome by default.

## Considerations

- This project just have one dependency to cypress.
- The test suits are gruped by page, so each file in the e2e folder represents the test for one page of the application, if a great amount of tests are written for the same page, it is possible to create folder for the page and group the tests for that particual page in files using a particular sorting.
- This project does not use Cucumber (BDD) to write the tests, tests are written on Jasmine syntaxis. The describe specifies a group of specs like a test suite and each it is a particular spec. https://jasmine.github.io/tutorials/your_first_suite 
- This project runs over Chrome by default.
- This project runs from Command Line using the command specified before with the next output, if you want to run this test framework from a CI/CD system, you will need to setup the environment with node, npm and a chrome navigator, after that you can use the command to run the tests.

```bash
====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  contact_page.cy.js                       00:16        2        2        -        -        - │
  ├────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ ✔  shop_page.cy.js                          00:06        2        2        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:23        4        4        -        -        -  
```
- For the next sprint, a story can be created to add a data provider to the tests to test different kinds of toys in a different sorting. Instead of passing this array:

```javascript
validate_total(['Fluffy Bunny', 'Stuffed Frog', 'Valentine Bear']);
```
A complete data provider can create other arrays of toys and change the toys that are added to the cart. As the test does not depend on the sorting of the toys if they are sorting differently the tests should keep working well.

## Notes

This solution is oriented to the best practices for Cypress, using javascript functions and cypress commands, a different solution over Webdriver.io/Selenium using page object model will be provided.

## Questions
1. What other possible scenarios would you suggest for testing the Jupiter Toys application? <br />
 On the contact page, some additional negative test cases can be added, for example using special characters in the Forename and message fields and using an invalid email format in the email text field. <br />
For the shop page, assertions over the empty cart button need to be added and over the remove item button as well. Additional tests over the quantity textbox can be added and the checkout page needs to be tested.
Finally, the test suite should make assertions over the login feature.
2.	Jupiter Toys is expected to grow and expand its offering into books, tech, and modern art. We are expecting the of tests will grow to a very large number. <br />
2.1	What approaches could you used to reduce overall execution time? <br />
The best approach to reduce the overall execution time is using light and specific functions for each test just like test case 4 which takes just 6 seconds to finish, using the headless mode helps to reduce the overall time of execution too, and keep it the tests simple and accurate with each business flow.
2.2	How will your framework cater for this? <br />
The framework is going to be built keeping the same code standards like using light and custom javascript functions, running in headless mode, and keep the tests simple and brief. <br />
3.	Describe when to use a BDD approach to automation and when NOT to use BDD. <br />
I would use BDD when the stakeholders are sending the use cases or business flows in BDD language, so it is important to keep the tests using the same language to check that everything is being tested as expected, however, the stakeholders usually do not use that specific language so adding an extra BDD layer does not come any benefit and on the contrary it will make the framework more complex and slowly, in this case, I recommended to use a simple test format like Jasmine syntaxis and add a good reporter to inform the results across the stakeholders
