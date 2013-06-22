var stdin = process.openStdin();
var fs = require('fs');

stdin.on('data', function(chunk) { 
   fs.appendFile('log.txt', chunk, function (err) {
       if (err) throw err;
   });
});

