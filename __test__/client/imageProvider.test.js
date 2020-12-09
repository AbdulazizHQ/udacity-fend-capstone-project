import { getCityImage } from '../../src/client/js/imageProvider';
import {describe, test} from "@jest/globals";

describe("Testing the Pixabay API", () => {
   test("Testing the getCityImage() with no response", () => {
      return getCityImage('qwertyuiop', 'qwertyuiop')
         .then(url => {expect(url).toEqual("https://pixabay.com/get/57e8d1414852a914f1dc846096293e7a1139dfe0544c704f75287fd09e4fc35c_640.jpg")})
   });
});