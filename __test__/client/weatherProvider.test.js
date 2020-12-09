import { getWeather } from '../../src/client/js/weatherProvider';
import {describe, test} from "@jest/globals";

describe("Testing the Weatherbit API", () => {
   test("Testing the getWeather() function", () => {
      return getWeather('1', '1', '2020-01-01')
         .then(info => {expect(info.minTemp).toEqual(24.8)})
   });
});