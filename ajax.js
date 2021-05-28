'use strict'
header('Access-Control-Allow-Origin: *');
$(document).ready( function(){
    mostrarL();
    actualizar();
    eliminarLibro();
    insertarLibro();
    $("#cargarCRUD").click(function(e){
        $("body").load("https://manuelmayorgadev.com/CRUD-AJAX-API-REST/connection.php");
    });
} );

var mostrarL = function(){
    var table = $("#libraryTable").DataTable({
        "scrollCollapse": true,
        "scrollY": '60vh',
        "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        "destroy":true,
        "ajax":{
            "type":"GET",
            "datatype": "JSON",
            "url": "https://manuelmayorgadev.com/CRUD-AJAX-API-REST/mostrarLibros.php"
        },
        "columns":[
            {"data":"CLAVE_AUTOR"},
            {"data":"NOMBRE"},
            {"data":"APELLIDOS"},
            {"data":"CLAVE_EDITORIAL"},
            {"data":"EDITORIAL"},
            {"data":"CLAVE_LIBRO"},
            {"data":"LIBRO"},
            {"defaultContent":"<button type='button' class='editar btn btn-outline-success me-2 btn-sm' data-mdb-toggle='modal' data-mdb-target='#EditarModal'>Editar</button><button type='button' class='eliminar btn btn-outline-danger btn-sm'data-mdb-toggle='modal' data-mdb-target='#EliminarModal'>Eliminar</button>"}
        ]
    });
    getLibros("#libraryTable tbody", table);
    getIdEliminar("#libraryTable tbody", table);  
}
var getLibros = function(tbody, table){//Extrae datos de libros y los pone en formulario modal
    $(tbody).on("click", "button.editar", function(){
        var data = table.row( $(this).parents("tr") ).data(); 
        var idLibro = $("#IdLEd").val(data.CLAVE_LIBRO ),
            tituloLibro = $("#tituloLEd").val(data.LIBRO ),
            editorialLibro = $("#editorialLEd").val(data.CLAVE_EDITORIAL ),
            autorLibro = $("#autorLEd").val(data.CLAVE_AUTOR );   
    });
}
var limpiar = function(){ //Limpia formulario agregar libro
    $('#IdLEd').val("");
    $('#tituloLEd').val("");
    $('#editorialLEd').val("");
    $('#autorLEd').val("");
}
var getIdEliminar = function(tbody, table){//Extrae id libro para eliminar
    $(tbody).on("click", "button.eliminar", function(){
        var data = table.row($(this).parents("tr")).data();
        var idLibro = $("#IdLibroEliminar").val(data.CLAVE_LIBRO);
    });
}
var actualizar = function(){
    $("#btn-Editar").on("click", function(e){
        e.preventDefault();//Evita que modal recargue pagina
        var frmArr = $("#formularioEditar").serializeArray();//Extrae datos fomrulario
        var frm = JSON.stringify(frmArr);//Convierte datos a JSON
        console.log(frm);
        $.ajax({
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            url: "https://manuelmayorgadev.com/CRUD-AJAX-API-REST/actualizarLibro.php",
            data: (frm),
            success:function(){
                $("#EditarModal").modal('hide');//Cierra modal
                mostrarL();
            }
        });
    });
}
var eliminarLibro = function(){
    $("#btnEliminarLibro").on("click", function(){
        var idLibro = $("#IdLibroEliminar").val();
        $.ajax({
            type: "DELETE",
            contentType: "application/json; charset=utf-8",
            url: "https://manuelmayorgadev.com/CRUD-AJAX-API-REST/eliminarLibro.php",
            data: idLibro,
            success:function(r){
                console.log(idLibro);
                //$("#IdLibro").trigger("reset");
                mostrarL();
                $("#EliminarModal").modal('hide');
                //$("formEditar").validate().resetForm();
            }
        });
    });
}
var insertarLibro = function(){
    $("#insLibro").click(function(e){
        e.preventDefault();
        var frm = $("#formularioInsertar").serialize();
        $.ajax({
            type: "POST",
            url: "https://manuelmayorgadev.com/CRUD-AJAX-API-REST/agregarLibro.php",
            data: frm,
            success:function(r){
                $("#formularioInsertar").trigger("reset");
                $("#InsertarModal").modal('hide');
                mostrarL();
            }
        });
    });
}