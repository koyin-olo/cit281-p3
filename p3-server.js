const fs = require('fs');
const fastify = require("fastify")();
const { coinCount } = require('./p3-module.js');

//GET route for index.html
fastify.get("/", (request, reply)=> {
	fs.readFile(`${__dirname}/index.html`, (err, data) => {
		if (err) {
            reply
			    .code(500)
			    .header('Content-Type', 'text/html')
		        .send('<h1>Error processing request</h1>');
		} else {
            reply
			    .code(200)
			    .header('Content-Type', 'text/html')
			    .send(data);
		}
	});
});


//GET route of /coin
fastify.get("/coin", (request, reply) => {
    const {denom = 0, count = 0} = request.query;
    let coinValue = coinCount({denom, count});
    reply
        .code(200)
        .header("Content-Type",'text/html')
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`)
})

//GET route of /coins pt 2
fastify.get("/coins", (request, reply) => {
    const {option} = request.query;
    let coinValue;
    const coins = [{denom: 25, count: 2},{denom: 1, count: 7}];
    switch (option) {
        case "1":
            coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
            break;
        case "2":
            coinValue = coinCount(...coins);
            break;
        default:
          coinValue = 0;
      };
      console.log(coinValue);
    reply
        .code(200)
        .header("Content-Type",'text/html')
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`)
})


//Fastify listen section
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Server listening on ${address}`);
});