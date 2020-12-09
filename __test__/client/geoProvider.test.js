import { getCityInformation } from '../../src/client/js/geoProvider';
import {describe, test} from "@jest/globals";

describe("Testing the Geonames functionality", () => {
   test("Testing the getCityInfomration() function", () => {
      return getCityInformation('Paris')
         .then(info => {expect(info.country).toStrictEqual('France')})
   });
});