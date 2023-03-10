"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
exports.productRouter = (0, express_1.Router)({});
let videos = [
    {
        id: 1,
        title: 'Data Structures Easy to Advanced Course',
        author: 'freeCodeCamp',
        canBeDownloaded: false,
        minAgeRestriction: 16,
        createdAt: '2023-03-04T17:11:00.331Z',
        publicationDate: '2023-03-05T17:11:00.331Z',
        availableResolutions: ['P360']
    }, {
        id: 2,
        title: 'Node.js lesson 1',
        author: 'Rolling Scopes',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: '2023-03-04T17:11:00.331Z',
        publicationDate: '2023-03-05T17:11:00.331Z',
        availableResolutions: ['P720']
    }
];
const testDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
const availableResolutions = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
exports.productRouter.get('/', (req, res) => {
    res.status(200).send(videos);
});
//post
exports.productRouter.post('/', (req, res) => {
    const errorsMessages = [];
    let title = req.body.title;
    let author = req.body.author;
    let quality = req.body.availableResolutions;
    //title
    if (!title || typeof title !== 'string' || title.length > 40) {
        errorsMessages.push({
            message: "incorrect value",
            field: "title"
        });
    }
    //author
    if (!author || typeof author !== 'string' || author.length > 20) {
        errorsMessages.push({
            message: "incorrect value",
            field: "author"
        });
    }
    //quality
    if (!quality.every((q) => availableResolutions.includes(q)) && quality.length) {
        errorsMessages.push({ message: "quality undefined", field: "availableResolutions" });
    }
    //response
    if (errorsMessages.length !== 0) {
        res.status(400).send({ errorsMessages });
    }
    else {
        let newVideo = {
            id: +(new Date()),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
            availableResolutions: quality
        };
        res.status(201).send(newVideo);
        videos.push(newVideo);
    }
});
//get by id
exports.productRouter.get('/:videoId', (req, res) => {
    const answer = videos.find(n => n.id === +req.params.videoId);
    if (!answer) {
        res.sendStatus(404);
        return;
    }
    res.send(answer);
});
//put
exports.productRouter.put('/:videoId', (req, res) => {
    const errorsMessages = [];
    //get property
    let title = req.body.title;
    let author = req.body.author;
    let quality = req.body.availableResolutions;
    let age = req.body.minAgeRestriction;
    let date = req.body.publicationDate;
    let optionDownload = req.body.canBeDownloaded;
    //checking property
    //title
    if (!title || typeof title !== 'string' || title.length > 40) {
        errorsMessages.push({
            message: "incorrect value",
            field: "title"
        });
    }
    //author
    if (!author || typeof author !== 'string' || author.length > 20) {
        errorsMessages.push({
            message: "incorrect value",
            field: "author"
        });
    }
    //quality
    if (!quality.every((q) => availableResolutions.includes(q)) && quality.length) {
        errorsMessages.push({ message: "quality undefined", field: "availableResolutions" });
    }
    //age
    if (typeof age !== 'number' || age < 0 || age > 18) {
        errorsMessages.push({
            message: "incorrect age",
            field: "minAgeRestriction"
        });
    }
    //optionDownload
    if (!optionDownload || typeof optionDownload !== 'boolean') {
        errorsMessages.push({
            message: "incorrect value",
            field: "canBeDownloaded"
        });
    }
    //date
    if (!date || typeof date !== "string" || date.length !== 24 || !testDate.test(date)) {
        errorsMessages.push({
            message: "incorrect date",
            field: "publicationDate"
        });
    }
    //!!!!
    if (errorsMessages.length !== 0) {
        res.status(400).send({ errorsMessages });
    }
    const video = videos.find(n => n.id === +req.params.videoId);
    if (!video) {
        res.sendStatus(404);
        return;
    }
    //res
    video.title = title;
    video.author = author;
    video.canBeDownloaded = optionDownload;
    video.minAgeRestriction = age;
    video.publicationDate = date;
    video.availableResolutions = quality;
    res.send(204);
});
//delete by id
exports.productRouter.delete('/:videoId', (req, res) => {
    if (!videos.some(n => n.id === +req.params.videoId)) {
        res.sendStatus(404);
        return;
    }
    else {
        videos = videos.filter(n => n.id !== +req.params.videoId);
        res.sendStatus(204);
        return;
    }
});
exports.productRouter.delete('/all-data', (req, res) => {
    videos = [];
    res.sendStatus(204);
});
