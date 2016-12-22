import server from './src/core/server';
import mongoose from  'mongoose';
import {Todo} from './models';
import apiroute from './routes/main';

let app = server({}, 3003);

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/todos`);

app.get('/', (req, res) => {
    res.send('working');
});

app.use('/api', apiroute);