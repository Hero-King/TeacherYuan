import axios, { AxiosConfig } from './index';

describe('axios', () => {
  test('axios request', async () => {
    const config: AxiosConfig = {
      url: 'http://127.0.0.1:5500/package.json',
      method: 'GET',
    };
    const res = await axios.request(config);
    expect(res).toBeTruthy();
  });

  test('axios create', async () => {
    const ins = axios.create({
      baseURL: 'http://127.0.0.1:5500',
      url: '/error',
    });
    const res = await ins.request({
      url: '/package.json',
    });
    expect(res).toBeTruthy();
  });
});
