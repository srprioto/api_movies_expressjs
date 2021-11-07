const express = require('express');
const MoviesService = require('../services/movies');

const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies');

const validationHandler = require('../utils/middleware/validationHandler');

// utilidad de cache
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {

    const router = express.Router();
    app.use("/api/movies", router);

    const moviesService = new MoviesService();

    // get
    router.get("/", async function(req, res, next){

        // añadimos la prueba de cache
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

        // throw new Error('Error getting movies **** ');

        const { tags } = req.query;

        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            });
        } catch (error) {
            next(error);
        }
    });

    // get solo
    router.get("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next){

        // añadimos la prueba de cache
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);

        const { movieId } = req.params;

        try {
            const movies = await moviesService.getMovie({ movieId });
            res.status(200).json({
                data: movies,
                message: 'movies retrieved'
            });
        } catch (error) {
            next(error);
        }

    });


    // post
    router.post("/", validationHandler(createMovieSchema), async function(req, res, next){

        const { body: movie } = req;

        try {
            const createMovieId = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createMovieId,
                message: 'movies create'
            });
        } catch (error) {
            next(error);
        }
    });

    // update
    router.put(
        "/:movieId", 
        validationHandler({ movieId: movieIdSchema }, 'params'), 
        validationHandler(updateMovieSchema), 
        async function(req, res, next){

        const { movieId } = req.params;
        const { body: movie } = req;

        try {
            const updateMovieId = await moviesService.updateMovie({ 
                movieId,
                movie
             });
            res.status(200).json({
                data: updateMovieId,
                message: 'movies updated'
            });
        } catch (error) {
            next(error);
        }
    });

    // delete
    router.delete("/:movieId", validationHandler({ movieId: movieIdSchema }, 'params'), async function(req, res, next){

        const { movieId } = req.params;

        try {
            const deleteMovieId = await moviesService.deleteMovie({ movieId });
            res.status(200).json({
                data: deleteMovieId,
                message: 'movies deleted'
            });
        } catch (error) {
            next(error);
        }
    });



    // router.patch("/:movieId", async function(req,res,next) {
	// 	const {movieId} = req.params;
	// 	const {body: movie} = req;		
	// 	try {
	// 		const updatedMovieId = await moviesService.partialUpdateMovie({movieId,movie});

	// 		res.status(200).json({
	// 			data:updatedMovieId,
	// 			message: "movie updated partially"
	// 		});
	// 	}
	// 	catch(error) {
	// 		next(error);
	// 	}
	// });


}

module.exports = moviesApi;