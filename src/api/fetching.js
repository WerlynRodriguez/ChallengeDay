export const url = 'https://dummyjson.com/'
export const endpoints = {
    login: 'auth/login',
    register: 'users/add',
    reservas: 'auth/todos'
}

async function validateError(response) {
    const res = await response.json();
    if (res["message"] != null) throw new Error(res["message"]);
    return res;
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

    return validateError(response);
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

    return validateError(response);
}

/** Fetch the reservations for the user artesano
 * @param {String} token - The token of the user
 * @param {Number} limit - The limit of the reservations to fetch
 * @param {Number} skip - The skip of the reservations to fetch (pagination)
 * @param {Object} signal - The signal for the fetch
 * @returns The response from the server */
export const fetchReservas = async (token, signal, limit = 10, skip = 0) => {
    const response = await fetch(`${url}${endpoints.reservas}?limit=${limit}&skip=${skip}&filter=completed:false`, {
        ...signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    return validateError(response);
}

/** Update the reservation completed status
 * @param {String} token - The token of the user
 * @param {String} id - The id of the reservation
 * @param {Boolean} completed - The completed status
 * @returns The response from the server */
export const updateReserva = async (token, id, completed) => {
    const response = await fetch(`${url}${endpoints.reservas}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            completed: completed
        })
    })

    return validateError(response);
}

/** Delete the reservation
 * @param {String} token - The token of the user
 * @param {String} id - The id of the reservation
 * @returns The response from the server */
export const deleteReserva = async (token, id) => {
    const response = await fetch(`${url}${endpoints.reservas}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    return validateError(response);
}