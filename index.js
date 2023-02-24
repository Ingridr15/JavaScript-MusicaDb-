var firebaseConfig = {
    apiKey: "AIzaSyAm4Xv8TwhvEpfjnRB9wdaYBqCYGttS1WI",
    authDomain: "musicadb-c5709.firebaseapp.com",
    databaseURL: "https://musicadb-c5709-default-rtdb.firebaseio.com",
    projectId: "musicadb-c5709",
    storageBucket: "musicadb-c5709.appspot.com",
    messagingSenderId: "803458286782",
    appId: "1:803458286782:web:2213034cf1f4f049d94aef",
    measurementId: "G-B6M4Y4X4FF"
};
// Initializar Firebase
firebase.initializeApp(firebaseConfig);

function resetFields() {
    document.getElementById("Input1").value = '';
    document.getElementById("Input2").value = '';
    document.getElementById("Input3").value = '';
    document.getElementById("Input4").value = 'selecciona';
    document.getElementById("Input5").value = '';
    document.getElementById("Input6").value = '';
    document.getElementById("Input7").value = '';
}

function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var titulo = document.getElementById("Input2").value;
    var artista = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;
    var album = document.getElementById("Input5").value;
    var duracion = document.getElementById("Input6").value;
    var año = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var cancion = {
            id,
            titulo,
            artista,
            genero,
            album,
            duracion,
            año,
        }

        firebase.database().ref('Canciones/' + id).update(cancion).then(() => {
            resetFields();
        }).then(() => {
            read();
        });

        swal("Listo!", "Agregado correctamente", "success");
    }
    else {
        swal("Error", "Llena todos los campos", "warning");
    }

    document.getElementById("Input1").disabled = false;
}

function read() {
    document.getElementById("Table1").innerHTML = '';
    var ref = firebase.database().ref('Canciones');
    ref.on("child_added", function (snapshot) {
        printRow(snapshot.val());
    });
}

function printRow(cancion) {

    if (cancion != null) {
        var table = document.getElementById("Table1");
        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);
        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = cancion.id;
        cell2.innerHTML = cancion.titulo;
        cell3.innerHTML = cancion.artista;
        cell4.innerHTML = cancion.genero;
        cell5.innerHTML = cancion.album;
        cell6.innerHTML = cancion.duracion;
        cell7.innerHTML = cancion.año;
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${cancion.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + cancion.id + ')">Modificar</button>';
    }
}

function deleteR(id) {
    firebase.database().ref('Canciones/' + id).set(null).then(() => {
        read();
    }).then(() => {
        swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id) {
    var ref = firebase.database().ref('Canciones/' + id);
    ref.on('value', function (snapshot) {
        updateR(snapshot.val());
    });
}

function updateR(cancion) {
    if (cancion != null) {
        document.getElementById("Input1").value = cancion.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value = cancion.titulo;
        document.getElementById("Input3").value = cancion.artista;
        document.getElementById("Input4").value = cancion.genero;
        document.getElementById("Input5").value = cancion.album;
        document.getElementById("Input6").value = cancion.duracion;
        document.getElementById("Input7").value = cancion.año;
    }
}

//Para consulta de generos
function readQ() {
    document.getElementById("Table2").innerHTML = '';
    var c = document.getElementById("Input8").value;
    var ref = firebase.database().ref("Canciones");
    ref.orderByChild("genero").equalTo(c).on("child_added", function (snapshot) {
        printRowQ(snapshot.val());
    });

}

function printRowQ(alumno) {

    var table = document.getElementById("Table2");
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);
    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.titulo;
    cell3.innerHTML = alumno.artista;
    cell4.innerHTML = alumno.genero;
    cell5.innerHTML = alumno.album;
    cell6.innerHTML = alumno.duracion;
    cell7.innerHTML = alumno.año;
}