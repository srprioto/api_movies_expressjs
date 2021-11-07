const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies'); // lista de peliculas

describe('services - movies', function() { // describe los services y recibe una funcion callback
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo': MongoLibMock // reemplazamos la libreria mongo por MongoLibMock
    });

    const moviesService = new MoviesServices(); // instancia de MoviesServices()

    describe('when getMovies method is called', async function() {
        // comprobamos que el metodo es una libreria y añadimos una funcion callback
        it('should call the getall MongoLib method', async function() { 
            await moviesService.getMovies({});
            assert.strictEqual(getAllStub.called, true); // verifica si la libreria es llamada
        });

        it('should return an array of movies', async function() {
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            assert.deepEqual(result, expected);
        });
    });
});