import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

function server(params, port = 3000) {
    let app = express(params);

    app.use(cors());
    app.use(bodyParser.json());

    app.listen(port, function () {
        console.log(`Start server on port ${port}!`);
    });

    return app;
}


export default server;