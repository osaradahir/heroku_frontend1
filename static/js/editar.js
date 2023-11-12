function cargarContacto() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    var request = new XMLHttpRequest();
    //request.open('GET', "http://127.0.0.1:8000/contactos/" + encodeURIComponent(email));
    request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos/" + encodeURIComponent(email));
    request.send();

    request.onload = (e) => {
        if (request.status === 200) {
            const response = request.responseText;
            const contacto = JSON.parse(response);

            console.log("response: " + response);
            console.log("contacto:", contacto);
            console.log("status_code: " + request.status);

            document.getElementById("nombreInput").value = contacto.nombre;
            document.getElementById("emailInput").value = contacto.email;
            document.getElementById("telefonoInput").value = contacto.telefono;
        } else {
            console.error("Error al cargar el contacto.");
        }
    };
}

function putContacto() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const nombreActualizado = document.getElementById("nombreInput").value;
    const emailActualizado = document.getElementById("emailInput").value;
    const telefonoActualizado = document.getElementById("telefonoInput").value;

    var request = new XMLHttpRequest();
    //request.open('PUT', "http://127.0.0.1:8000/contactos/" + encodeURIComponent(email));
    request.open('PUT', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos/" + encodeURIComponent(email));
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const datosActualizados = {
        nombre: nombreActualizado,
        email: emailActualizado,
        telefono: telefonoActualizado
    };

    request.send(JSON.stringify(datosActualizados));

    request.onload = (e) => {
        console.log("status_code: " + request.status);

        if (request.status === 200) {
            console.log("Contacto actualizado correctamente.");
            window.location.href = "/";
        } else {
            console.error("Error al actualizar el contacto.");
        }
    };
}
