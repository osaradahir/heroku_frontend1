function getAll() {
    var request = new XMLHttpRequest();
    //request.open('GET', "http://127.0.0.1:8000/contactos");
    request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos");
    request.send();

    request.onload = (e) => {
        const response = request.responseText;
        const json = JSON.parse(response);

        console.log("response: " + response);
        console.log("json: " + json);
        console.log("status_code: " + request.status);

        const tbody_contactos = document.getElementById("tbody_contactos");

        tbody_contactos.innerHTML = "";

        json.forEach(contacto => {
            var tr = document.createElement("tr");
            var td_email = document.createElement("td");
            var td_nombre = document.createElement("td");
            var td_telefono = document.createElement("td");
            var td_opciones = document.createElement("td");

            td_email.innerHTML = contacto["email"];
            td_nombre.innerHTML = contacto["nombre"];
            td_telefono.innerHTML = contacto["telefono"];

            var btnVer = document.createElement("button");
            btnVer.innerHTML = "Ver";
            btnVer.onclick = function() {
                window.location.href = "/ver?email=" + encodeURIComponent(contacto["email"]);
            };

            var btnActualizar = document.createElement("button");
            btnActualizar.innerHTML = "Actualizar";
            btnActualizar.onclick = function() {
                window.location.href = "/actualizar?email=" + encodeURIComponent(contacto["email"]);
            };

            var btnBorrar = document.createElement("button");
            btnBorrar.innerHTML = "Borrar";
            btnBorrar.onclick = function() {
                window.location.href = "/borrar?email=" + encodeURIComponent(contacto["email"]);
            };

            td_opciones.appendChild(btnVer);
            td_opciones.appendChild(btnActualizar);
            td_opciones.appendChild(btnBorrar);

            tr.appendChild(td_email);
            tr.appendChild(td_nombre);
            tr.appendChild(td_telefono);
            tr.appendChild(td_opciones);

            tbody_contactos.appendChild(tr);
        });
    };
}


function getContactByEmail(email) {
    var request = new XMLHttpRequest();
    //request.open('GET', "http://127.0.0.1:8000/contactos");
    request.open('GET', "https://backendapi-b8813c2df8d9.herokuapp.com/contactos");
    request.send();

    request.onload = function (e) {
        if (request.status === 200) {
            const response = request.responseText;
            const json = JSON.parse(response);

            for (let i = 0; i < json.length; i++) {
                if (json[i].email === email) {
                    const tbody_contactos = document.getElementById("tbody_contactos");
                    tbody_contactos.innerHTML = ''; 

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

                    return;
                }
            }

            console.log("Contacto no encontrado para el correo electrónico: " + email);
        } else {
            console.log("Error al cargar los datos. Código de estado: " + request.status);
        }
    };
}

