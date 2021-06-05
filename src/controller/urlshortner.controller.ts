import Controller from "../interface/controller.interface"
import express from 'express'
import crypto from 'crypto'

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

    private geturlshortener = async (req: express.Request, res: express.Response) => {
        const tSize: number = 5;
        // console.log(this);
        let tempstr = this.getRandomValue(tSize);
        var finalurl:string = this.baseurl+tempstr
        res.status(200).send(finalurl)
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