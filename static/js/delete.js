function getContacto() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    var request = new XMLHttpRequest();
    //request.open('GET', "http://127.0.0.1:8000/contactos/" + encodeURIComponent(email));
    request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos/" + encodeURIComponent(email));
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const contacto = JSON.parse(response);

        console.log("response: " + response);
        console.log("contacto:", contacto);
        console.log("status_code: " + request.status);

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
    };
}

function deleteContacto() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    var request = new XMLHttpRequest();
    //request.open('DELETE', "http://127.0.0.1:8000/contactos/" + encodeURIComponent(email));
    request.open('DELETE', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos/" + encodeURIComponent(email));
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    request.onload = (e) => {
        if (request.status === 200) {
            console.log("Contacto eliminado correctamente.");
            window.location.href = "/";
        } else {
            console.error("Error al eliminar el contacto.");
        }
    };
    request.send();
}
