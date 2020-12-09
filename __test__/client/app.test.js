import { handleSubmit} from '../../src/client/js/app';
import {describe, test} from "@jest/globals";

describe("Testing the submit functionality", () => {
   test("Testing the handleSubmit() function", () => {
      expect(handleSubmit).toBeDefined();
   });
});