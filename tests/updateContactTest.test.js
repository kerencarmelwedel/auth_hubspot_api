import { assert, expect } from 'chai';
import { createContact } from '../createContact.js';
import { getRandomContactData } from '../utils.js';
import { updateHubSpotContact } from '../updateContact.js';

describe('Update a contact', function () {
    it('should update a contact successfully', async function () {
        // Create contact
        const contact_data = getRandomContactData('outlook.com')
        const createContactResponse = await createContact(contact_data);

        assert.isTrue(createContactResponse.ok);
        const createContactResponseBody = await createContactResponse.json();
        const contactId = createContactResponseBody.id;

        // Update the contact
        const updatedContactData = getRandomContactData('gmail.com')
        const updateResponse = await updateHubSpotContact(contactId, updatedContactData);
        assert.isTrue(updateResponse.ok);

        const updateContactResponse = await updateResponse.json()
        // Verify that the contact has updated;
        expect(updateContactResponse.properties.firstname).to.equal(updatedContactData.firstname);
        expect(updateContactResponse.properties.lastname).to.equal(updatedContactData.lastname);
        expect(updateContactResponse.properties.email).to.equal(updatedContactData.email);

    });

    it('should fail when the email is incorrect', async () => {
        // Create contact
        const contact_data = getRandomContactData('outlook.com')
        const createAnotherContactResponse = await createContact(contact_data);
        const createContactResBody = await createAnotherContactResponse.json();
        const contactId = createContactResBody.id;

        // Update the contact
        const updatedBadEmail = getRandomContactData('@@@')
        const updateResponse = await updateHubSpotContact(contactId, updatedBadEmail);
        const responseBody = await updateResponse.json();

        // Assert that the response status is 400 (Bad Request)
        assert.equal(updateResponse.status, 400, 'Bad Request');
        expect(responseBody.message).to.include('INVALID_EMAIL');
    });

    it('should fail after updating two same ids', async () => {
        // Create contact 1
        const contact1_data = getRandomContactData('outlook.com')
        const createContact1Response = await createContact(contact1_data);
        const createContact1ResBody = await createContact1Response.json();
        const contact1Id = createContact1ResBody.id;

        // Create contact 2
        const contact2_data = getRandomContactData('outlook.com')
        const createContact2Response = await createContact(contact2_data);
        const createContact2ResBody = await createContact2Response.json();
        const contact2Id = createContact2ResBody.id;

        // Update contact2 with contact1's email
        const contact1Email = createContact1ResBody.properties.email;
        contact2_data.email = contact1Email
        const updateResponse = await updateHubSpotContact(contact2Id, contact2_data);
        const responseBody = await updateResponse.json();

        // Assert that the response status is 409 (Bad Request) and read the failed message 
        assert.equal(updateResponse.status, 409, 'Bad Request');
        expect(responseBody.message).to.include(`A contact with the email '${contact1Email}' already exists. Existing ID: ${contact1Id}`);
    });
});