var stdin = process.openStdin();
var fs = require('fs');

var filename = process.argv[2];

stdin.on('data', function(chunk) { 
   fs.appendFile(filename, chunk, function (err) {
       if (err) throw err;
   });
});
