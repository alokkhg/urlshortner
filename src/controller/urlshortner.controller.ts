import Controller from "../interface/controller.interface"
import express, { NextFunction } from 'express'
import crypto from 'crypto'
import urlmodel from '../models/urldata.model'

class UrlShortnerController implements Controller {

    public path = "/url";
    public router = express.Router();
    public baseurl = "http://alk/"

    constructor() {

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.geturlshortener);
    }

    private geturlshortener = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            if ("name" in req.query) {
                if (typeof req.query.name === "string") {
                    var originalUrl: string = req.query["name"]
                    if (urlmodel.getData(originalUrl) != null) {
                        res.status(200).send(urlmodel.getData(originalUrl))
                    } else {
                        // add the data in the dictionary with generating the shorturl
                        const shorturl = this.getRandomValue(5);
                        const finalUrl = this.baseurl + shorturl
                        if (urlmodel.addData(originalUrl, finalUrl) === true) {
                            res.status(201).send(finalUrl)
                        }
                    }
                }
            }
        } catch (error) {
            next(error)
        }

    }

    private random = (size: number) => {
        var buf = Buffer.allocUnsafe(size);
        // Fill the buffer with random value
        crypto.randomFill(buf, (err, buf) => {
            if (err) throw err;
        })
        return buf
    }


    private urlAlphabet(): string {
        return 'abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    }



    private getRandomValue(size: number): string {
        let id = '';
        var buff = this.random(size);
        while (size--) {
            id += this.urlAlphabet()[buff[size] & 59]
        }
        return id;
    }

}

export default UrlShortnerController;