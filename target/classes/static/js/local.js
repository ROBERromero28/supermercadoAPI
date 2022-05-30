function listar(){

    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/products",settings)
    .then(response => response.json())
    .then(function(data){
            var productos = '';
            for(const producto of data){
                productos += '<tr>'+
                '<th scope="row">'+producto.id+'</th>'+
                '<td>'+producto.nombre+'</td>'+
                '<td>'+'$'+producto.precio+'</td>'+
                '<td>'+producto.marca+'</td>'+
                '<td>'+
                  '<button type="button" class="btn btn-outline-danger" onclick="eliminaProducto(\''+producto.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                  '<a href="#" onclick="verModificarProducto(\''+producto.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                  '<a href="#" onclick="verProducto(\''+producto.id+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = productos;

    })
}

function verAgregar(){
    var s="api/products";
     var cadena= '<form action="" method="post" id="myForm">'+
                    ' <label  for="nombre">nombre</label>'+
                     '<input type="text" name="nombre" id="nombre" required> <br>'+
                     '<label  for="precio">precio</label>'+
                    ' <input type="text" name="precio" id="precio" required><br>'+
                     '<label  for="marca">marca</label>'+
                    ' <input type="text" name="marca" id="marca" required><br>'+
                     '<label  for="peso">peso</label>'+
                   '  <input type="text" name="peso" id="peso" required><br>'+
                    ' <button type="button" onclick="sendData(\''+s+'\')">Registrar</button>'+
                 '</form>';
             document.getElementById("contentModal").innerHTML = cadena;
             var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
             myModal.toggle();
  }

async function sendData(path){
    var myForm = document.getElementById("myForm");
    var nombre=document.getElementById("nombre").value;
    var precio=document.getElementById("precio").value;
    var marca=document.getElementById("marca").value;
    var peso=document.getElementById("peso").value;
    var formData = new FormData(myForm);
    console.log(nombre);
    var jsonData = {};
    if((nombre==="" || precio===""||marca===""||peso==="")){
        alertas("¡Campos vacio!",2)
    }else{
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    alertas(" Se ha registrado el producto exitosamente!",1)
    myForm.reset();
    listar();
        document.getElementById("contentModal").innerHTML = '';
        var myModalEl = document.getElementById('modalUsuario');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
}
}


function eliminaProducto(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas(" Se ha eliminado el usuario exitosamente!",2)
    })
}

function verModificarProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(producto){
            var cadena='';
            if( producto){
                cadena='<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Producto</h1>'+
            '</div>'+
            '<form action="" method="post" id="myForm">'+
                                ' <label  for="nombre">Nombre</label>'+
                                 '<input type="text" name="nombre" id="nombre" value ="'+producto.nombre+'" required> <br>'+
                                 '<label  for="precio">Precio</label>'+
                                ' <input type="text" name="precio" id="precio" value ="'+producto.precio+'" required><br>'+
                                 '<label  for="marca">Marca</label>'+
                                ' <input type="text" name="marca" id="marca" value ="'+producto.marca+'" required><br>'+
                                 '<label  for="peso">Peso</label>'+
                               '  <input type="text" name="peso" id="peso" value ="'+producto.peso+'" required><br>'+
                                ' <button type="button" onclick="modificarProducto(\''+producto.id+'\')">Registrar</button>'+
                             '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();



    })
}

async function modificarProducto(id){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request =  await fetch("api/products/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas(" Se ha modificado el producto exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsuario');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();


}

function verProducto(id){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/products/"+id,settings)
    .then(response => response.json())
    .then(function(producto){
            var cadena='';
            if( producto){
                cadena='<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Producto</h1>'+
            '</div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Nombre: '+producto.nombre+' </li>'+
            '<li class="list-group-item">Precio: $'+producto.precio+'</li>'+
            '<li class="list-group-item">Marca: '+producto.marca+'</li>'+
            '<li class="list-group-item">Peso: '+producto.peso+'</li>'+
          '</ul>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalUsuario'))
            myModal.toggle();

    })
}

function alertas(mensaje,tipo){
    var color="";
    if(tipo==1){//success
        color="success"
    }else{//danger
        color="danger"
    }
    var alerta=
    '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+
    mensaje+
   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
  '</div>'
  document.getElementById("datos").innerHTML = alerta;
  setTimeout(function() {document.getElementById('datos').innerHTML='';},3000);
}

