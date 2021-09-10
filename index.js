var firebaseConfig = {
    apiKey: "AIzaSyDaCyJl0QfYDpNpu7RvIC1nZD30hZmBpd8",
  authDomain: "mi-aplicacion-ee80b.firebaseapp.com",
  databaseURL: "https://mi-aplicacion-ee80b-default-rtdb.firebaseio.com",
  projectId: "mi-aplicacion-ee80b",
  storageBucket: "mi-aplicacion-ee80b.appspot.com",
  messagingSenderId: "480138131936",
  appId: "1:480138131936:web:2fa975a84852fbba235385",
  measurementId: "G-XL1GP5NFSG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var idg = document.getElementById("Input1").value;
    var gaName = document.getElementById("Input2").value;
    var gadev = document.getElementById("Input3").value;
    var gaclass = document.getElementById("Input4").value;

    //validaciones
    if (idg.length > 0) {
        //creo un objeto que guarda los datos
        var game = {
            idg, //matricula:id
            gaName,
            gadev,
            gaclass,
        }

        //console.log(alumno);

        firebase.database().ref('Videojuegos/' + idg).update(game).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Videojuegos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(game){
    
    if(game!=null){
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
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = game.idg;
        cell2.innerHTML = game.gaName; 
        cell3.innerHTML = game.gadev;
        cell4.innerHTML = game.gaclass; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${game.idg})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+game.idg+')">Modificar</button>';
    }
}

function deleteR(idg){
    firebase.database().ref('Videojuegos/' + idg).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(idg){
    var ref = firebase.database().ref('Videojuegos/' + idg);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(game){
    if(game!=null)
    {
        document.getElementById("Input1").value=game.idg;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=game.gaName;
        document.getElementById("Input3").value=game.gadev;
        document.getElementById("Input4").value=game.gaclass;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Videojuegos");
    ref.orderByChild("carrera").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(game){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = game.idg;
    cell2.innerHTML = game.gaName; 
    cell3.innerHTML = game.gadev;
    cell4.innerHTML = game.gaclass; 
   
}