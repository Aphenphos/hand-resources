const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('gets all games', async () => {
    const resp = await request(app).get('/games');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([ 
      {
        id: '1',
        title: 'Crusher',
        popularity: 'very'
      },
      {
        id: '2',
        title: 'Brusher',
        popularity: 'not at all'
      },
      {
        id: '3',
        title: 'Frusher',
        popularity: 'extremely'
      }
    ]);
  });
  it('gets specific game', async () => {
    const resp = await request(app).get('/games/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      title: 'Brusher',
      popularity: 'not at all'
    });
  });
  it('makes new game', async () => {
    const newGame = {
      title: 'Usher',
      popularity: 'number 1'
    };
    const resp = await request(app).post('/games').send(newGame);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newGame
    });
  });
  it('updates a game', async () => {
    const resp = await request(app).put('/games/2').send({
      title: 'Shmusher',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.title).toBe('Shmusher');
  });
  it('deletes a game', async () => {
    const resp = await request(app).delete('/games/1');
    expect(resp.status).toBe(200);

    const gameResp = await request(app).get('/games/1');
    expect(gameResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
