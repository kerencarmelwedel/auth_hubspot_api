import dotenv from 'dotenv';
dotenv.config();
export async function getContactByEmail(email) {
    const response = await fetch(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    return response;
}