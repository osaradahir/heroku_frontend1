const SERVER_URL = "http://127.0.0.1:8000";

const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');

checarStatus();

async function checarStatus() {
    respuestaServidor = await fetch(`${SERVER_URL}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    });

    try {
        if (respuestaServidor.status === 200) {
            getContactById(email);
        } else if (respuestaServidor.status === 401) {
            window.location.href = "/login";
            return alert("Token inválido");
        } else {
            manejarRespuestaError(respuestaServidorStatus.status, respuestaServidorStatus.statusText);
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
    request.open('GET', "http://127.0.0.1:8000/contactos/" + email);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);
            console.log(contacto);

            const tbody_contactos = document.getElementById("tbody_contactos");
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");

            td_email.innerHTML = contacto["email"];
            td_nombre.innerHTML = contacto["nombre"];
            td_telefono.innerHTML = contacto["telefono"];

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);

            tbody_contactos.appendChild(tr);
        } else {
            handleErrorResponse(request.status, request.statusText);
        }
    };
}

function deleteData(email) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    const request = new XMLHttpRequest();
    request.open('DELETE', "http://127.0.0.1:8000/contactos/" + email, true);
    request.setRequestHeader('Authorization', `Bearer ${token}`);

    request.onload = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("Borrado con éxito");
                window.location.href = '/';
            } else {
                alert("Ocurrió un error");
            }
        }
    };
    request.send(null);
}
