const SERVER_URL = "http://127.0.0.1:8000";
const CONTACTS_ENDPOINT = "/contactos";

async function getAll() {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    try {
        const serverStatusResponse = await checkServerStatus();

        if (serverStatusResponse.status === 200) {
            const contactsResponse = await fetchContacts(token);

            if (contactsResponse.status === 200) {
                handleContactsResponse(await contactsResponse.json());
            } else {
                handleErrorResponse(contactsResponse.status, contactsResponse.statusText);
            }
        } else if (serverStatusResponse.status === 401) {
            window.location.href = "/login";
            alert("Token Invalido");
        } else {
            handleErrorResponse(serverStatusResponse.status, serverStatusResponse.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Error checking server status';
    }
}

async function fetchContacts(token) {
    try {
        const response = await fetch(`${SERVER_URL}${CONTACTS_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
}

function checkServerStatus() {
    return fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });
}

function handleContactsResponse(json) {
    const tbody_contactos = document.getElementById("tbody_contactos");
    tbody_contactos.innerHTML = "";

    for (const contacto of json) {
        const tr = document.createElement("tr");
        tr.appendChild(createTableCell(contacto["email"]));
        tr.appendChild(createTableCell(contacto["nombre"]));
        tr.appendChild(createTableCell(contacto["telefono"]));
        tr.appendChild(createOptionsCell(contacto["email"]));

        tbody_contactos.appendChild(tr);
    }
}

function createTableCell(value) {
    const td = document.createElement("td");
    td.textContent = value;
    return td;
}

function createOptionsCell(email) {
    const td = document.createElement("td");
    td.innerHTML = `<a href='/ver?email=${email}'>Ver</a> <a href='/actualizar?email=${email}'>Editar</a> <a href='/borrar?email=${email}'>Borrar</a>`;
    return td;
}

function handleErrorResponse(status, statusText) {
    console.error(`Error: ${status} - ${statusText}`);
}

document.addEventListener('DOMContentLoaded', () => {
    getAll();
});if (contactsResponse.status === 200) {
           


// Obtén el parámetro 'id' de la URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
checarStatus();

async function checarStatus(){
    respuestaServidor = await fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    try{

        if (respuestaServidor.status === 200){
            // Llama a la función para obtener y mostrar el registro
            getContactById(email);


        } else if (respuestaServidor.status === 401){
            window.location.href = "/";
            return alert("Token invalido");
        } else {
            manejarRespuestaError(respuestaServidorStatus.status, respuestaServidorStatus.statusText);
        }
    } catch (error) {
        console.error("Error", error);
        document.getElementById("statusMessage").innerHTML = "Error checando el estado del servidor";
    }
}
}
