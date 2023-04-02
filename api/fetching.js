export const url = 'https://dummyjson.com/'
export const endpoints = {
    login: 'auth/login',
    register: 'users/add',
}

/** Fetch the login
 * @param {String} username - The username
 * @param {String} password - The password
 * @returns The response from the server */
export const fetchLogin = async (username, password) => {
    const response = await fetch(url.concat(endpoints.login), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    const res = await response.json();
    // Check if the response has an error message
    if (res["message"] != null) throw new Error(res["message"]);

    return res;
}

/** Fetch the register
 * @param {String} firstName - The first name
 * @param {String} lastName - The last name
 * @param {Number} age - The age
 * @returns The response from the server */
export const fetchRegister = async (firstName, lastName, age) => {
    const response = await fetch(url.concat(endpoints.register), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            age: age
        })
    })

    return response.json();
}