import { calculateLength } from '../../src/client/js/helper';
import {describe, test} from "@jest/globals";

describe("Testing helper functions", () => {
   test("Testing the calculateLength() function", () => {
      expect(calculateLength('2019-01-01', '2020-01-01')).toEqual(365);
   });
});