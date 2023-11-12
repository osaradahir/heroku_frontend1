function insertContactPost(nombre, email, telefono) {
    console.log("Enviando solicitud POST...");

    var request = new XMLHttpRequest();
    //request.open('POST', 'http://127.0.0.1:8000/contactos');
    request.open('POST', 'https://backendapi-b8813c2df8d9.herokuapp.com/contactos');
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    const nuevoContacto = {
        nombre: nombre,
        email: email,
        telefono: telefono
    };
    request.onload = function () {
        console.log("status_code: " + request.status);
        if (request.status == 200) {
            const data = JSON.parse(request.responseText);
            alert("Contacto ingresado:\nNombre: " + data.nombre + "\nEmail: " + data.email + "\nTeléfono: " + data.telefono);
            window.location.href = "/";
        } else {
            console.error('Error:', request.status, request.statusText);
        }
    };

    request.send(JSON.stringify(nuevoContacto));
}
