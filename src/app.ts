import express from 'express'
import Controller from './interface/controller.interface'
import constants from '../settings.json'
import helmet from 'helmet'
import cors from 'cors'
import { logresp } from './middleware/logger.middleware'
import { CorsOptions } from 'cors'
import compression from 'compression'
import errorMiddleware from './middleware/error.middleware'
import HttpException from './exceptions/http.exception'


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
        this.initializeErrorHandling();
    }


    /* Initialize all the controllers */
    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
            this.app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
                var error = new HttpException(404, "This url is not correct")
                next(error)
            })
        })
    }

    private initializeMiddleware() {
        // FUnction to initialize the common middlewares
        this.app.use(helmet());
        this.app.use(cors(corsopts));
        this.app.use(compression());
        this.app.use(logresp);
        
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    public listen() {
        this.app.listen(constants.port, () => {
            console.log("Server started working on port ", constants.port);
        });
    }
}

export default App;