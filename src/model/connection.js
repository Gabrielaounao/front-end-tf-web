const http = require('follow-redirects').http;

const connect = async (route, method = "GET", body = {}) => {
    return await new Promise((resolve, reject) => {
        const data = JSON.stringify(body);

        const options = {
            host: process.env.API,
            path: route + "?format=json",
            method: method,
            headers: {
               'Content-Type': 'application/json',
               'Content-Length': Buffer.byteLength(data)
            }
        }

        const req = http.request(options, (req) => {
            let body = "";

            req.on('data', (chunck) => {
                body += chunck;
            });

            req.on('end', () => {
                resolve(body);
            })
        });
        
        req.on('error', (e) => {
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

module.exports = connect;