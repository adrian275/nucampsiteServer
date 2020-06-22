const express = require('express');
const bodyParser = require('body-parser');
const Favorite = require('../models/favorite.js');
const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id }) //return user favorite
    .populate('user')
    .populate('campsites')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user : req.user._id })
    .then(favorite => {
        if (favorite) {
            for (var campsite in req.body) {
                const documentNoFavorite = !favorite.campsites.includes(campsite._id);
                if (documentNoFavorite) {
                   favorite.campsites.push(campsite._id);
                }
            }
        favorite.save()
        .then(favorite => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        })
        .catch(err => next(err));
        } else {
            Favorite.create({ user: req.user._id }, [{ campsites: req.body }] )
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne( { user : req.user._id } )
    .then(favorite => {
        if (favorite) {
            favorite.remove()
            .then( favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorite);
        }
    })
    .catch(err => next(err));
})


favoriteRouter.route('/:favoriteId')
.options(cors.corsWithOptions, authenticate.verifyUser, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.favoriteId}`);
})
.put(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.favoriteId}`);
})
.post(cors.corsWithOptions, (req, res, next) => {
    Favorite.findOne({ user : req.user._id })
    .then(favorite => {
        if (favorite) {
            const favoritedId = req.params.campsiteId;
            const currentFavorites = favorite.campsites;
                if (currentFavorites.includes(favoritedId)) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.send('This campsite is already a favorite');
                } else {
                    currentFavorites.push(favoritedId)
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'applications/json');
                    res.json(favorite)
                })
                .catch(err => next(err));
                }
        } else {
            Favorite.create({ user: req.user._id, campsites: [req.params.campsiteId] })
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    //Favorite.findByIdAndDelete(req.params.favoriteId)
    Favorite.findOne( { user : req.user._id } )
    .then(favorite => {
      if (favorite) {
        const favoritedId = req.params.campsiteId;
        const currentFavorites = favorites.campsites;
        const index = currentFavorites.indexOf(favoritedId);
        if      (index > -1) {
            currentFavorites.splice(index, 1);
            favorite.save()
            .then(favorite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'applications/json');
                res.json(favorite)
            })
            .catch(err => next(err));
        }
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      }
    })
    .catch(err => next(err));
});

module.exports = favoriteRouter;