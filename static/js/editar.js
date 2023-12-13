const SERVER_URL = "http://127.0.0.1:8000";
const CONTACTS_ENDPOINT = "/contactos";

// Obtener el parámetro de la URL
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

checarStatus();

async function checarStatus() {
    const respuestaServidor = await fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    try {
        if (respuestaServidor.status === 200) {
            // Llama a la función para obtener y mostrar el registro
            getContactById(email);
        } else if (respuestaServidor.status === 401) {
            window.location.href = "/login";
            return alert("Token inválido");
        } else {
            manejarRespuestaError(respuestaServidor.status, respuestaServidor.statusText);
        }
    } catch (error) {
        console.error("Error", error);
        document.getElementById("statusMessage").innerHTML = "Error checando el estado del servidor";
    }
}

function getContactById(email) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    const request = new XMLHttpRequest();
    request.open('GET', `${SERVER_URL}${CONTACTS_ENDPOINT}/${email}`);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);

            console.log(contacto);
            const emailInput = document.getElementById("emailInput");
            const nombreInput = document.getElementById("nombreInput");
            const telefonoInput = document.getElementById("telefonoInput");

            emailInput.value = contacto.email;
            nombreInput.value = contacto.nombre;
            telefonoInput.value = contacto.telefono;
        } else {
            manejarRespuestaError(request.status, request.statusText);
        }
    };

    request.onerror = (error) => {
        console.error('Error de red o CORS:', error);
    };

    request.send();
}

function updateData(email, nombre, telefono) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    var request = new XMLHttpRequest();
    var url = `${SERVER_URL}${CONTACTS_ENDPOINT}/${email}`;
    var data = {
        email: email,
        nombre: nombre,
        telefono: telefono
    };

    request.open('PUT', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert(request.responseText);
                window.location.href = '/inicio';
            } else {
                manejarRespuestaError(request.status, request.statusText);
            }
        }
    };

    request.send(JSON.stringify(data));
}

function manejarRespuestaError(status, statusText) {
    console.error(`Error: ${status} - ${statusText}`);
}
