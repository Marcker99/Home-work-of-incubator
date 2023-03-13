
import express,{Request,Response} from "express";
import bodyParser from 'body-parser'
import {productRouter} from "./routes/video-routes";


export const app = express()


const middleWere = bodyParser({})
app.use(middleWere)

app.use('/videos',productRouter)
app.use('/testing',productRouter)


