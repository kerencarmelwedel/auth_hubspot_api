
export function getRandomEmail(domain) {
    const randomEmail = Math.random().toString(36).substring(7);
    return randomEmail + '@' + domain;
}

export function getRandomContactData(domain) {

    return {
        firstname: "UpdatedFirstName_" + Math.random().toString(36).substring(7),
        lastname: "UpdatedLastName_" + Math.random().toString(36).substring(7),
        email: getRandomEmail(domain)
    }
}