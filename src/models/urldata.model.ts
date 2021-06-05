import Urldata from '../interface/urlmodel.interface'

class UrlModelData {
    
    data:Urldata = {}

    constructor() {
        // Create a dictionary in which we will push the changes
        this.data = {}
    }

    public addData = (key:string, value:string) => {
        if (key in this.data) {
            console.log("key already exists")
            return false;
        } else {
            this.data[key] = value
            return true;
        }
    }

    public getData = (key:string) => {
        if (key in this.data) {
            return this.data[key]
        }
        return null;
    }

    private savefile = async (filename:string) => {

    }
}

// This is to make this class singleton
export default (new UrlModelData());