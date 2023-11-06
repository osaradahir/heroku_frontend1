function getAll(){
    var request = new XMLHttpRequest;
    //request.open('GET',"http://127.0.0.1:8000/contactos");
    request.open('GET',"https://backendapi-b8813c2df8d9.herokuapp.com");
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);
        console.log("response: " + response);
        console.log("json: " + json);
        console.log("status_code: " + request.status);

        console.log("Email: " + json[0]["email"]);
        console.log("Nombre: " + json[0]["nombre"]);
        console.log("Telefono: " + json[0]["telefono"]);

        const tbody_contactos = document.getElementById("tbody_contactos");
    
        var tr = document.createElement("tr");
        var td_email = document.createElement("td");
        var td_nombre = document.createElement("td");
        var td_telefono = document.createElement("td");

        td_email.innerHTML = json[1]["email"];
        td_nombre.innerHTML = json[1]["nombre"];
        td_telefono.innerHTML = json[1]["telefono"];

        tr.appendChild(td_email);
        tr.appendChild(td_nombre);
        tr.appendChild(td_telefono);

        tbody_contactos.appendChild(tr);

    };
};

function getContactByEmail(email) {
    var request = new XMLHttpRequest();
    //request.open('GET', "http://127.0.0.1:8000/contactos");
    request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com");
    request.send();

    request.onload = function (e) {
        if (request.status === 200) {
            const response = request.responseText;
            const json = JSON.parse(response);

            for (let i = 0; i < json.length; i++) {
                if (json[i].email === email) {
                    const tbody_contactos = document.getElementById("tbody_contactos");
                    tbody_contactos.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos.

                    var tr = document.createElement("tr");
                    var td_email = document.createElement("td");
                    var td_nombre = document.createElement("td");
                    var td_telefono = document.createElement("td");

                    td_email.innerHTML = json[i].email;
                    td_nombre.innerHTML = json[i].nombre;
                    td_telefono.innerHTML = json[i].telefono;

                    tr.appendChild(td_email);
                    tr.appendChild(td_nombre);
                    tr.appendChild(td_telefono);

                    tbody_contactos.appendChild(tr);

                    return; // Terminamos la búsqueda después de encontrar el primer contacto.
                }
            }

            console.log("Contacto no encontrado para el correo electrónico: " + email);
        } else {
            console.log("Error al cargar los datos. Código de estado: " + request.status);
        }
    };
}

