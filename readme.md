# Testing Hubspot API

The following tests were created using **Mocha JS** for testing contact creation and update functionality in hubspot.

## CreateContact

- <span style="color:green">✔</span> should successfully create a new contact with valid details
- <span style="color:green">✔</span> should fail if the email format is incorrect
- <span style="color:green">✔</span> should create a new contact and verify it via a GET request

## Update a contact

- <span style="color:green">✔</span> should update a contact successfully
- <span style="color:green">✔</span> should fail when the email is incorrect
- <span style="color:green">✔</span> should fail after updating two same ids
