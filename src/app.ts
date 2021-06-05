import express from 'express'
import Controller from './interface/controller.interface'
import constants from '../settings.json'
import helmet from 'helmet'
import cors from 'cors'
import { logresp } from './middleware/logger'
import { CorsOptions } from 'cors'
import compression from 'compression'


var corsopts: CorsOptions;
if (process.env.NODE_ENV?.trim() === "production") {
    corsopts = {
        origin: process.env.ALLOWED_HOSTS,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST"]
    }
} else {
    corsopts = {
        origin: constants.allowedhost,
        optionsSuccessStatus: 200,
        methods: ["GET", "POST"]
    }
}

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();
        // this.connectDatabase();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
    }


    /* Initialize all the controllers */
    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }

    private initializeMiddleware() {
        // FUnction to initialize the common middlewares
        this.app.use(helmet());
        this.app.use(cors(corsopts));
        this.app.use(compression());
        this.app.use(logresp);
        
    }


    public listen() {
        this.app.listen(constants.port, () => {
            console.log("Server started working on port ", constants.port);
        });
    }


    // private connectDatabase() {
    //     const connectString = `mongodb://${constants.dbuser}:${constants.dbpass}@${constants.dbpath}/training`;
    //     const connection = mongoose.connect(connectString, {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     });

    //     connection.catch((err) => {
    //         console.log("Error in connecting to database", err);
    //         process.exit(1);
    //     })
    // }
}

export default App;