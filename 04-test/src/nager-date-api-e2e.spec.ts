import request from "supertest";
import { AVAILABLE_COUNTRIES_MOCK, NAGER_DATE_API } from "./mock/app.consts";

describe("Nager Date API", () => {
  describe("#CountryInfo", () => {
    it("should return 200 and correct country info", async () => {
      const countryCode = "HU";
      const { status, body } = await request(NAGER_DATE_API).get(
        `/CountryInfo/${countryCode}`
      );

      expect(status).toEqual(200);
      expect(body.commonName).toEqual("Hungary");
      expect(body.countryCode).toEqual("HU");
    });

    it("should return 404 if country is not found", async () => {
      const countryCode = "HUN1234";
      const { status } = await request(NAGER_DATE_API).get(
        `/CountryInfo/${countryCode}`
      );
      expect(status).toEqual(404);
    });
  });

  describe("#AvailableCountries", () => {
    it("should return 200 with available countries", async () => {
      const { status, body } = await request(NAGER_DATE_API).get(
        "/AvailableCountries"
      );
      expect(status).toEqual(200);
      expect(body).toEqual(AVAILABLE_COUNTRIES_MOCK);
    });
  });
});
