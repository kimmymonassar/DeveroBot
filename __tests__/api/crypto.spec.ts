import getCoronaStats from '../../src/api/getCoronaStats';

const randomCountry = (): string => {
  const countryArray = ['sweden', 'norway', 'brazil', 'south africa', 'france'];
  return countryArray[Math.floor(Math.random() * countryArray.length)];
};

describe('Get latest corona stats by country', () => {
  test('should return specified countrys latest corona data', async () => {
    const result = await getCoronaStats(randomCountry());
    expect(result).toBeTruthy();
  });
});
