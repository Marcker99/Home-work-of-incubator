import express,{Request,Response} from "express";
import bodyParser from 'body-parser'
const app = express()
const port= 589
//data
interface Video {
    id: number;
    title: string;
    author: string;
    canBeDownloaded:boolean;
    minAgeRestriction: number|null;
    createdAt: string;
    publicationDate: string;
    availableResolutions: string[]


}
let videos: Video[] = [
    {
        id: 1,
        title: 'Data Structures Easy to Advanced Course',
        author:	'freeCodeCamp',
        canBeDownloaded:true,
        minAgeRestriction: 16,
        createdAt:'2023-03-04T17:11:00.331Z',
        publicationDate:'2023-03-05T17:11:00.331Z',
        availableResolutions: [ 'P360']
},{
        id: 2,
        title: 'Node.js lesson 1',
        author:	'Rolling Scopes',
        canBeDownloaded:true,
        minAgeRestriction: null,
        createdAt: '2023-03-04T17:11:00.331Z',
        publicationDate: '2023-03-05T17:11:00.331Z',
        availableResolutions: [ 'P720']
    }]
const testDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
const availableResolutions: string [] = ['P144','P240','P360','P480','P720','P1080','P1440','P2160'  ]
//middle ware
let middleWere = bodyParser({})
app.use(middleWere)
//Handlers
//delete1
//delete all
app.delete('/testing/all-data', (req:Request,res:Response) => {
    videos = []
    res.sendStatus(204)
})
//get all
app.get('/', (req:Request,res:Response) => {
    res.status(200).send(videos)
})
//post
app.post('/', (req:Request,res:Response) => {
    let title = req.body.title
    let author = req.body.author
    let quality = req.body.availableResolutions.join()
    //title
    if(!title || typeof title !== 'string'.trim() || title.length > 40){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect value",
                    filed: "title error"
                }
            ]})
        return
    }
    //author
    if(!author || typeof author !== 'string'.trim() || author.length > 20){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect value",
                    filed: "author error"
                }
            ]})
        return
    }
    //quality
    if(availableResolutions.indexOf(quality) < 0){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "quality undefined",
                    filed: "incorrect quality"
                }
            ]})
        return
    }
    //response
    let newVideo = {
        id: +(new Date()),
        title: title ,
        author:	author,
        canBeDownloaded:true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
        availableResolutions: [quality]
    }
    res.status(201).send(newVideo)

    videos.push(newVideo)

})

//get by id
app.get('/:videoId', (req:Request,res:Response) => {
    const answer = videos.find(n => n.id === +req.params.videoId);
    if(!answer){
       res.sendStatus(404)
        return
    }
      res.send(answer)

})
//put
app.put('/:videoId', (req:Request,res:Response) => {
    const video = videos.find(n => n.id === +req.params.videoId);
    if(!video){
        res.sendStatus(404)
        return
    }
//get property
    let title = req.body.title
    let author = req.body.author
    let quality = req.body.availableResolutions.join()
    let age = req.body.minAgeRestriction
    let date = req.body.publicationDate
    let optionDownload = req.body.canBeDownloaded
//checking property
    //title
    if(!title || typeof title !== 'string'.trim() || title.length > 40){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect value",
                    filed: "title error"
                }
            ]})
        return
    }
    //author
    if(!author || typeof author !== 'string'.trim() || author.length > 20){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect value",
                    filed: "author error"
                }
            ]})
        return
    }
    //quality
    if(availableResolutions.indexOf(quality) < 0){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "quality undefined",
                    filed: "incorrect quality"
                }
            ]})
        return
    }
    //age
    if(typeof age !== 'number' || age < 0 || age > 18  ){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect age",
                    filed: "minAgeRestriction error"
                }
            ]})
        return
    }
    //optionDownload
    if(!optionDownload || typeof optionDownload !== 'boolean'){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect value",
                    filed: " canBeDownloaded error"
                }
            ]})
        return
    }
    //date
    if(!date || typeof date !== "string" || date.length !== 24 || !testDate.test(date)){
        res.status(400).send({
            errorsMessages: [
                {
                    message: "incorrect date ",
                    filed: "publicationDate error"
                }
            ]})
        return
    }
    //res
        video.title = title
        video.author = author
        video.canBeDownloaded = optionDownload
        video.minAgeRestriction = age
        video.publicationDate = date
        video.availableResolutions[0] = quality
    res.send(204)



})
//delete by id
app.delete('/:videoId', (req:Request,res:Response) => {

    if( !videos.some(n => n.id === +req.params.videoId)){
        res.sendStatus(404)
        return
    }
    else{
        videos = videos.filter(n => n.id !== +req.params.videoId)
        res.sendStatus(204)
        return
    }



})
//listener
app.listen(port,()=>{
    console.log('server was started')
})