import dotenv from 'dotenv';
dotenv.config();
export async function createContact(contactData) {
    const requestBody = { "properties": contactData }
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
        },
        body: JSON.stringify(requestBody)
    });
    return response;
}
