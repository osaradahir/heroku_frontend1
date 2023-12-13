const SERVER_URL = "http://127.0.0.1:8000";

function handleErrorResponse(status, statusText) {
    console.error(`Error: ${status} - ${statusText}`);
}

async function getContactById(email) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        console.error('Token not found. Redirecting to login page.');
        window.location.href = '/login';
        return;
    }

    try {
        const response = await fetch(`${SERVER_URL}/contactos/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const contacto = await response.json();

            // Inserta una nueva fila para mostrar los detalles
            const tbody_contactos = document.getElementById("tbody_contactos");
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${contacto.email}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.telefono}</td>
            `;
            tbody_contactos.innerHTML = "";  // Limpiar la tabla antes de agregar el resultado
            tbody_contactos.appendChild(tr);
        } else if (response.status === 404) {
            alert("Contacto no encontrado");
        } else {
            handleErrorResponse(response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Error fetching contact details';
    }
}

async function searchContact() {
    const emailInput = document.getElementById("emailInput");
    const email = emailInput.value.trim();

    if (email === "") {
        alert("Por favor, ingrese un correo electrónico");
        return;
    }

    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            console.error('Token not found. Redirecting to login page.');
            window.location.href = '/login';
            return;
        }

        const response = await fetch(`${SERVER_URL}/contactos/${email}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const contacto = await response.json();

            // Limpiar la tabla antes de agregar el resultado de la búsqueda
            const tbody_contactos = document.getElementById("tbody_contactos");
            tbody_contactos.innerHTML = "";

            // Inserta una fila para mostrar los detalles
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${contacto.email}</td>
                <td>${contacto.nombre}</td>
                <td>${contacto.telefono}</td>
            `;
            tbody_contactos.appendChild(tr);
        } else if (response.status === 404) {
            alert("Contacto no encontrado");
        } else {
            handleErrorResponse(response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('statusMessage').innerText = 'Error searching contact';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Puedes agregar alguna inicialización si es necesario
});
