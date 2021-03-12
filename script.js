function submit_pais(){
    el_nom_pais = document.getElementById("nombre-pais")
    nombre_pais = el_nom_pais.value
    el_nom_pais.value = ""

    code = APIgetCode(nombre_pais);
    if (!code){
        alert ("Cógido no encontrado, asegurese de escribirlo correctamente con tildes y eso... " + String.fromCodePoint(128125));
    }

    el_nombre_pais = document.getElementById("pais-titulo");
    var data = "";
    data += "<h2>"+capitalize(nombre_pais);
    data += "<em> (";
    data += code? code:"No encontrado";
    data += ")</em>";
    data += "</h2>"
    el_nombre_pais.innerHTML = data
    var url = "https://flagcdn.com/w80/"+code+".png";  
    el_bandera = document.getElementById("pais-img");
    if (code){
        data = '<img id="bandera" src="' + url + '" alt="' + nombre_pais + '"></img>'
    } else{
        data = "<span style='font-size:60px;'> &#10060; </span>"    
    }
    el_bandera.innerHTML = data;
}

function setAutocompletadoPaises(){
    el = document.getElementById("paises");
    data = ""
    for (let pais of APIgetPaises()){
        data += "<option>" + pais + "</option>";
    }
    el.innerHTML = data;
}

setAutocompletadoPaises();

function capitalize(str){
    return str[0].toUpperCase()+str.slice(1);
}

function APIgetCode(nombre_pais){
    jobj = APIgetJson();
    code = find(jobj, nombre_pais);
    return code
}

function APIgetJson(){
    var req = new XMLHttpRequest();
    req.open("GET", "https://flagcdn.com/es/codes.json", false);
    req.send(null);
    json_text = req.responseText;
    return JSON.parse(json_text);
}

function APIgetPaises(){
    jobj = APIgetJson();
    keys = Object.keys(jobj);
    return keys.reduce((ans, curr) => { return ans.concat(jobj[curr]); }, []);
}

function find(json_obj, element){
    keys = Object.keys(json_obj);
    for (let k of keys){
        if (json_obj[k].toLowerCase().trim() == element.toLowerCase().trim())
            return k; 
    }
    
    return null
}