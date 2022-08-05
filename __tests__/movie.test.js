const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('gets all movies', async () => {
    const resp = await request(app).get('/movies');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([ 
      {
        id: '1',
        title: 'Shmitle',
        imdb: '6'
      },
      {
        id: '2',
        title: 'Bitle',
        imdb: '7'
      },
      {
        id: '3',
        title: 'Kitle',
        imdb: '8'
      }
    ]);
  });
  it('gets specific movie', async () => {
    const resp = await request(app).get('/movies/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      title: 'Bitle',
      imdb: '7'
    });
  });
  it('makes new movie', async () => {
    const newMovie = {
      title: 'Fitle',
      imdb: '1'
    };
    const resp = await request(app).post('/movies').send(newMovie);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newMovie
    });
  });
  it('updates a movie', async () => {
    const resp = await request(app).put('/movies/2').send({
      title: 'Litle',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('Litle');
  });
  it('deletes a movie', async () => {
    const resp = await request(app).delete('/movies/1');
    expect(resp.status).toBe(200);

    const movieResp = await request(app).get('/movies/1');
    expect(movieResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
