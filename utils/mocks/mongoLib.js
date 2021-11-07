const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies'); // determina si las propiedades fueron llamadas o no

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock); // llama la coleccion y resuelve con los mocks de las peliculas

const tagQuery = { tags: { $in: ['Drama'] } }; // prueba con el tag de peliculas de drama
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama')); // resuelve y devuelve filtrando peliculas de drama

const createStub = sinon.stub().resolves(moviesMock[0].id); // devuelve el id de la primera pelicula

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query); // devuelve coleccion
    }

    create(collection, data) {
        return createStub(collection, data); // retorna datos creados
    }
}

module.exports = {
    getAllStub,
    createStub,
    MongoLibMock
};