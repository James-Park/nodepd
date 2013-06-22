// ===================================
// `tail -f` in Node.js and WebSockets
// ===================================
//
// Usage:
// 
// git clone git://gist.github.com/718035.git tail.js
// cd tail.js
// git submodule update --init
//
// node server.js /path/to/your.log
//
// Connect with browser and watch changes in the logfile
//
//

// require.paths.unshift('./lib/socket-io/lib/',
//                      './lib/socket.io-node/lib/');

var http    = require('http');
var io      = require('socket.io');
var url     = require("url");
var fs      = require('fs');
var path    = require('path');

var spawn = require('child_process').spawn;
var viewFileName = "";

//var filename = process.argv[2];
//if (!filename) return util.puts("Usage: node <server.js> <filename>");

// -- Node.js Server ----------------------------------------------------------

server = http.createServer(function(request, response){
  
  /*
  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile(__dirname + '/index.html', function(err, data){
  	res.write(data, 'utf8');
  	res.end();
  });
  */
  
  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  var contentTypesByExtension = {
    '.html': "text/html",
    '.css':  "text/css",
    '.js':   "text/javascript"
  };  
  
  if (request.url.indexOf("/file=") > -1) {
    viewFileName = request.url.substring(6);
    filename = process.cwd();   
  } else if (request.url == "/") {
    viewFileName = "";
  }
  
  console.log("filename : " + filename);

  path.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';
    
    // viewFileName = request.query['file'];
    
    //console.log("request.search:" + request.search);
    //console.log("request.url:" + request.url);
    
    //if (request.url == '/upload' && request.method.toLowerCase() == 'get') { 
    /*
    if (request.url == '/upload') { 
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write("upload");
      response.end();
      return; 
    }
    */

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {        
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }
      
      // viewFileName = "log.txt";

      var headers = {};
      var contentType = contentTypesByExtension[path.extname(file)];
      if (contentType) headers["Content-Type"] = contentType;
      response.writeHead(200, headers);
      response.write(file, "binary");
      response.end();
    });  
    
  });  
  
  /*
 if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(sys.inspect({fields: fields, files: files}));
    });
    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  */
})
server.listen(8000);

// -- Setup Socket.IO ---------------------------------------------------------

var io = io.listen(server);


io.on('connection', function(client){
  console.log('Client connected');
  
  path.exists(path.join(process.cwd(), viewFileName), function(exists) {
    var tail = spawn("tail", ["-f", viewFileName]);
    client.send(viewFileName);
  
    tail.stdout.on("data", function (data) {
      console.log(data.toString('utf-8'))
      client.send(data.toString('utf-8'))
    }); 
  });
});

console.log('Server running at http://127.0.0.1:8000/, connect with a browser to see tail output');
