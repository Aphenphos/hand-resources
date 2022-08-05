const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('gets all song', async () => {
    const resp = await request(app).get('/songs');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual([ 
      {
        id: '1',
        name: 'Song',
        rating: 'bad'
      },
      {
        id: '2',
        name: 'Dong',
        rating: 'great'
      },
      {
        id: '3',
        name: 'Gong',
        rating: 'amazing'
      }
    ]);
  });
  it('gets specific song', async () => {
    const resp = await request(app).get('/songs/2');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: '2',
      name: 'Dong',
      rating: 'great'
    });
  });
  it('makes new song', async () => {
    const newSong = {
      name: 'Long',
      rating: 'horrible'
    };
    const resp = await request(app).post('/songs').send(newSong);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      ...newSong
    });
  });
  it('updates a song', async () => {
    const resp = await request(app).put('/songs/1').send({
      name: 'Shmong',
    });
    console.log(resp.body);
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Shmong');
  });
  it('deletes a song', async () => {
    const resp = await request(app).delete('/songs/1');
    expect(resp.status).toBe(200);

    const songResp = await request(app).get('/songs/1');
    expect(songResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});
