'use strict';

import Mongoose from '../models/init-mongoose';
import Multer from 'multer';
import { Readable } from 'stream';

const ObjectId = Mongoose.Types.ObjectId;

export default class ProductController {

    static async getAudio (req, res, next) {
        try {
            let trackId = null;
            try {
                trackId = new ObjectId(req.params.id);
            } catch (e) {
                return res.status(400).json({ message: 'Invalid trackId' })
            }
            res.set('content-type', 'audio/mp3');
            res.set('accept-ranges', 'bytes');
            let bucket = new Mongoose.mongo.GridFSBucket(Mongoose.connection.db, { bucketName: 'tracks' });
            let downloadStream = bucket.openDownloadStream(trackId);
            downloadStream.on('data', chunk => {
                res.write(chunk);
            });
            downloadStream.on('error', () => {
                res.sendStatus(404);
            });
            downloadStream.on('end', () => {
                res.end();
            });
        } catch (e) {
            return next(e);
        }
    }

    static async uploadAudio (req, res, next) {
        try {
            const storage = Multer.memoryStorage();
            const upload = Multer({ storage, limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 } });
            upload.single('track')(req, res, err => {
                if (err) {
                    console.log('Upload single err: ', err);
                }
                const trackName = req.body.name;
                if (!trackName) {
                    res.status(400).json({ message: 'Require field' });
                }
                // Convert buffer to Readable Stream
                const readableTrackStream = new Readable();
                readableTrackStream.push(req.file.buffer);
                readableTrackStream.push(null);
                const bucket = new Mongoose.mongo.GridFSBucket(Mongoose.connection.db, { bucketName: 'tracks' });
                const uploadStream = bucket.openUploadStream(trackName);
                const id = uploadStream.id;
                console.log({id});
                readableTrackStream.pipe(uploadStream);
                uploadStream.on('error', (err) => {
                    console.log({err});
                    return res.status(500).json({ message: 'Error uploading file.' });
                });
                uploadStream.on('finish', () => {
                    return res.status(201).json({ message: 'File uploaded. ID: ' + id })
                });
            });
        } catch (e) {
            return next(e);
        }
    }
}