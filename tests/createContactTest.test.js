import { assert, expect } from 'chai';
import { createContact } from '../createContact.js';
import { getContactByEmail } from '../getContact.js';
import { getRandomEmail } from '../utils.js';

describe('CreateContact', function () {

    // Test Case: Contact created successfully 
    it('should successfully create a new contact with valid details', async () => {
        const email = getRandomEmail('outlook.com')
        const response = await createContact({
            firstname: 'Jane',
            lastname: 'Doe',
            email: email
        });

        // Ensure the response status is ok (200 or 201)
        assert.isTrue(response.ok, 'Contact creation failed');

        const responseBody = await response.json();
        const contact = responseBody.properties;

        // Assert that contact has the correct firstname and lastname
        expect(contact).to.have.property('firstname').that.equals('Jane');
        expect(contact).to.have.property('lastname').that.equals('Doe');

        // Assert the email is correctly formatted and ends with the correct domain
        expect(contact).to.have.property('email').that.equals(email);
        expect(contact.email).to.match(/@outlook\.com$/, 'Email should end with @outlook.com');
    });

    // Test Case: Fail - invalid email
    it('should fail if the email format is incorrect', async () => {
        const badEmail = getRandomEmail('@@@')
        const response = await createContact({
            firstname: 'Jane',
            lastname: 'Doe',
            email: badEmail
        });

        // Assert that the response status is 400 (Bad Request)
        assert.equal(response.status, 400, 'Expected status 400 for invalid email');

        const responseBody = await response.json();
        expect(responseBody).to.have.property('message');
        expect(responseBody.message).to.include('INVALID_EMAIL');
        expect(responseBody).to.not.have.property('properties');
    });

    it('should create a new contact and verify it via a GET request', async () => {
        const email = getRandomEmail('outlook.com')
        const response = await createContact({
            firstname: 'Jane',
            lastname: 'Doe',
            email: email
        });

        // Ensure the response status is ok (200 or 201)
        assert.isTrue(response.ok, 'Contact creation failed');

        const responseBody = await response.json();
        const contactEmail = responseBody.properties.email;

        // Use GET request to verify the contact creation by email
        const getResponse = await getContactByEmail(contactEmail);

        // Ensure the GET request was successful
        expect(getResponse.ok).to.be.true;
        expect(getResponse.status).to.equal(200);
    });
});