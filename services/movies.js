// const { moviesMock } = require('../utils/mocks/movies');
const MongoLib = require('../lib/mongo');

class MoviesService {

    constructor(props) {
        
        this.collection = 'movies';
        this.mongoDB = new MongoLib();

    }

    async getMovies({ tags }) {

        const query = tags && { tags: {$in: tags} };

        const movies = await this.mongoDB.getAll(this.collection, query);
        return movies || [];
    }

    async getMovie({ movieId }) {
        const movie = await this.mongoDB.get(this.collection, movieId);
        return movie || {};
        
    }

    async createMovie({ movie }) {
        const createMovieId = this.mongoDB.create(this.collection, movie);
        return createMovieId;
    }

    async updateMovie({ movieId, movie } = {}) {
        const updatedMovieId = this.mongoDB.update(this.collection, movieId, movie);
        return updatedMovieId;
    }

    async deleteMovie({ movieId }){
        const deleteMovieId = this.mongoDB.delete(this.collection, movieId);
        return deleteMovieId;
    }



    // async partialUpdateMovie() {
	// 	const updatedMovieId = await Promise.resolve(moviesMock[0].id);
	// 	return updatedMovieId;
	// }

}

module.exports = MoviesService;