import {createServer} from 'http';
import {app} from './app';
import {sequelize} from './sequelize';

const port =  3000;

(async () => {
    await sequelize.sync({force: true});

    createServer(app)
        .listen(
            port,
            () => console.info(`Server running on port ${port}`)
        );
})();
