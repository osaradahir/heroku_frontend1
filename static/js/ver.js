async function checkServerStatus() {
    try {
        const response = await fetch('http://127.0.0.1:8000', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });

        if (response.status === 401) {
            window.location.href = "/login";
        }

        if (response.ok) {
            const data = await response.json();
            document.getElementById('statusMessage').innerText = `Server response: ${data.message}`;
        } else {
            const errorData = await response.json();
            console.error('Error checking server status:', errorData);
            document.getElementById('statusMessage').innerText = `Error: ${errorData.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Error checking server status';
    }
}

async function getContacto() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    var request = new XMLHttpRequest();
    request.open('GET', "http://127.0.0.1:8000/contactos/" + encodeURIComponent(email));
    // request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos/" + encodeURIComponent(email));
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);

            const tbody_contactos = document.getElementById("tbody_contactos");

            if (contacto) {
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
                console.error("No se encontró el contacto");
            }
        } else if (request.status === 403) {
            console.error('Not authenticated. Redirecting to login page.');
            window.location.href = '/login';
        } else {
            handleErrorResponse(request.status, request.statusText);
        }
    };
}

document.addEventListener('DOMContentLoaded', checkServerStatus);
