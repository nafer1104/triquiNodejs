var http = require("http");
var url = require("url");

function iniciar(route,handle) {
  	function onRequest(request, response) {
  		var dataPosteada = "";
    	var pathname = url.parse(request.url).pathname;
    	console.log("Petición para " + pathname +" recidbida.");
    	request.setEncoding("utf8");

    	//resivir la informacion por trozos, esto cuando es muy grande
        request.addListener("data", function(trozoPosteado) {
	          dataPosteada += trozoPosteado;
	          console.log("Recibido trozo POST '" + trozoPosteado + "'.");
	    });

        //Evento que se dispara cuando ya ha resivido toda la informacón
	    request.addListener("end", function() {
	      route(handle, pathname, response, dataPosteada);
	    });
  	}

  	http.createServer(onRequest).listen(8888);
  	console.log("Servidor Iniciado.");
}

exports.iniciar = iniciar;