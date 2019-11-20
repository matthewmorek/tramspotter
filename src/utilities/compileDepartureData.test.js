import compileDepartureData from './compileDepartureData';
import nearbyStops, {
  stopsWithoutASpecialMessage
} from '../__test__/__fixtures__/nearbyStops';

describe('Utility method compileDepartureData', () => {
  test('It exists', () => {
    expect(compileDepartureData).toBeTruthy();
  });

  test('Returns appropriately shaped data object', async () => {
    let actual = compileDepartureData(nearbyStops);
    expect(actual).toHaveProperty('arrivals.0.carriages', 'Double');
    expect(actual).toHaveProperty('arrivals.0.destination', 'Old Trafford');
    expect(actual).toHaveProperty('arrivals.0.id', expect.any(String));
    expect(actual).toHaveProperty('arrivals.0.status', 'Arrived');
    expect(actual).toHaveProperty('arrivals.0.wait', 0);

    expect(actual).toHaveProperty('arrivals.5.carriages', 'Double');
    expect(actual).toHaveProperty('arrivals.5.destination', 'Altrincham');
    expect(actual).toHaveProperty('arrivals.5.id', expect.any(String));
    expect(actual).toHaveProperty('arrivals.5.status', 'Due');
    expect(actual).toHaveProperty('arrivals.5.wait', 14);

    expect(actual).toHaveProperty('direction', 'Outgoing');
    expect(actual).toHaveProperty('lastUpdated', '2019-09-16T20:19:38Z');
    expect(actual).toHaveProperty('line', 'Altrincham');
    expect(actual).toHaveProperty('messageBoard', expect.any(String));
    expect(actual).toHaveProperty('stationLocation', 'Timperley');
    expect(actual).toHaveProperty('timestamp', expect.any(Number));
  });

  test('Do not return `messageBoard` when there is `<no message>`', () => {
    expect(compileDepartureData(stopsWithoutASpecialMessage)).toEqual(
      expect.not.objectContaining({ ['messageBoard']: expect.any(String) })
    );
  });
});
