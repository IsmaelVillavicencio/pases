class Inicio{
    constructor(){
        //spinner.style.visibility="hidden";
    }
}

$('#autorizar').mouseover(function(ev) {
    on_mouseover(ev.target.id)
});

$('#autorizar').mouseout(function(ev) {
    on_mouseout(ev.target.id)
});

$('#misPermisos').mouseover(function(ev) {
    on_mouseover(ev.target.id)
});

$('#misPermisos').mouseout(function(ev) {
    on_mouseout(ev.target.id)
});

$('#permisosCabotaje').mouseover(function(ev) {
    on_mouseover(ev.target.id)
});

$('#permisosCabotaje').mouseout(function(ev) {
    on_mouseout(ev.target.id)
});

function on_mouseover(id) {
    $('#title' + id).hide();
    $('#textDialog' + id).show();
}

function on_mouseout(id) {
    $('#textDialog' + id).hide();
    $('#title' + id).show();
}

const ini = new Inicio()