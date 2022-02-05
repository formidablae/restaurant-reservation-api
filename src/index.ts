import * as http from 'http';
import { app } from './app';
import { DatabaseService } from './app/services/DatabaseService';

if (!process.env.ALREADY_SET) {
    require('dotenv').config();
    process.env.ALREADY_SET = 'true';
}

DatabaseService.getConnection().then(() => {
    const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
    server.on('listening', async () => {
        console.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
    });
    console.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
})
