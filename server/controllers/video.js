const { validationResult } = require('express-validator');
const User = require('../models/User');
const Video = require('../models/Video');

const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId);
        if (!video) return res.status(400).send({
            success: false,
            message: "Video doesn't exist",
        })
        res.status(200).send(video);

    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const addVideo = async (req, res) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                success: false,
                errors: validationErrors.array()[0].msg
            });
        }

        const video = new Video({ userId: req.user.userId, ...req.body });
        await video.save();

        res.status(200).send({
            success: true,
            message: "Video uploaded successfully",
            video
        })

    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const updateVideo = async (req, res) => {
    try {

        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send({
            success: true,
            message: "Video doesn't exist",
        });

        if (video.userId === req.user.userId) {

            const video = await Video.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            res.status(200).send({
                success: true,
                message: "Video updated successfully",
                video
            })

        } else {
            res.status(401).send({
                success: false,
                message: "You can only update your videos",
            })
        }
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const deleteVideo = async (req, res) => {

    try {
        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).send({
            success: true,
            message: "Video doesn't exist",
        });

        if (video.userId === req.user.userId) {

            await Video.findByIdAndDelete(req.params.id);

            res.status(200).send({
                success: true,
                message: "Video deleted successfully"
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: "You can only delete your videos",
            })
        }
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const addview = async (req, res) => {
    try {
        const video = await Video.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "View increased",
            video
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const getByTag = async (req, res) => {
    try {
        const { tags } = req.query;  

        const tagsArray = Array.isArray(tags) ? tags : [tags]; 

        const videos = await Video.find({
            tags: { $in: tagsArray }
        }).limit(30);

        console.log(videos);

        res.status(200).send({
            success: true,
            message: "Videos fetched for tags",
            videos
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })

    }
}


const random = async (req, res) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
        res.status(200).send({
            success: true,
            videos
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}


const trending = async (req, res) => {
    try {
        const videos = await Video.find().sort({ views: -1 });

        res.status(200).send({
            success: true,
            videos
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })

    }
}


const search = async (req, res) => {
    try {
        const { q } = req.query;
        const videos = await Video.find({
            title: { $regex: q, $options: 'i' },
        }).limit(30);

        res.status(200).send({
            success: true,
            videos
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })

    }
}


const subscriptions = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        usersubsc = user.subscribedusers;

        const list = await Promise.all(usersubsc.map(async (channelId) => {
            return await Video.find({ userId: channelId });
        }));

        if (list.length) {
            const videos = list.flat().sort((a, b) => b.createdAt - a.createdAt);
            res.status(200).send({
                success: true,
                videos
            })
        }
        else {
            res.status(200).send({
                success: false,
                message: "You have not Subscribed any Channel"
            })
        }

    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })

    }
}

const addlikes = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likes: req.user.userId },
                $pull: { dislikes: req.user.userId }
            },
        );
        res.status(200).send({
            success: true,
            message: 'You liked a video',
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })
    }
}

const addDislikes = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { dislikes: req.user.userId },
                $pull: { likes: req.user.userId }
            }
        )

        res.status(200).send({
            success: true,
            message: 'You disliked a video'
        })
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).send({
            success: false,
            message,
        })

    }
}

module.exports = {
    getVideo, updateVideo, deleteVideo, addVideo, getByTag, search, subscriptions, trending, random, addview, addlikes, addDislikes
};