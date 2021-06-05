import fs from 'fs'
import path from 'path'
import morgan, { TokenIndexer } from 'morgan'
import http from 'http'

export const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"));

export const logresp = morgan(':res[header] :status', {
    stream: accessLogStream
})