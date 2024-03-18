import { validateInput, shortenPublicHoliday } from "./helpers";

describe("#validateInput", () => {
  it("should throw an error if country is not supported", () => {
    expect(() => validateInput({ country: "XX" })).toThrowError(
      "Country provided is not supported, received: XX"
    );
  });

  it("should throw an error if year is not the current", () => {
    expect(() => validateInput({ year: 2019 })).toThrowError(
      "Year provided not the current, received: 2019"
    );
  });

  it("should return true if country and year are valid", () => {
    expect(validateInput({ year: 2024, country: "DE" })).toEqual(true);
  });
});

describe("#shortenPublicHoliday", () => {
  it("should return a shortened public holiday", () => {
    expect(
      shortenPublicHoliday({
        date: "2023-01-01",
        localName: "Neujahr",
        name: "New Year's Day",
        countryCode: "AT",
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: ["Public"],
      })
    ).toEqual({
      name: "New Year's Day",
      localName: "Neujahr",
      date: "2023-01-01",
    });
  });
});
