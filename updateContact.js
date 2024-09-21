import dotenv from 'dotenv';
dotenv.config();
export async function updateHubSpotContact(contactId, data) {
    return fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
        },
        body: JSON.stringify({ "properties": data })
    });
}


