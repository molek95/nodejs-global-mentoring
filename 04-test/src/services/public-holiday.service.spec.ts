import axios from "axios";
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from "./public-holidays.service";

const PUBLIC_HOLIDAY_MOCK = {
  date: "2023-01-01",
  localName: "Neujahr",
  name: "New Year's Day",
  countryCode: "AT",
  fixed: true,
  global: true,
  counties: null,
  launchYear: null,
  type: "Public",
};

const mockHelpers = require("../helpers");

//Unit Tests
describe("#getListOfPublicHolidays", () => {
  it("should return a list of public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: [PUBLIC_HOLIDAY_MOCK] })
      );
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest
      .spyOn(mockHelpers, "shortenPublicHoliday")
      .mockReturnValue(PUBLIC_HOLIDAY_MOCK);

    const result = await getListOfPublicHolidays(2023, "AT");
    expect(result).toEqual([PUBLIC_HOLIDAY_MOCK]);
  });

  it("should return an empty array if API call fails", async () => {
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest.spyOn(axios, "get").mockImplementation(() => {
      throw new Error("Error");
    });

    const result = await getListOfPublicHolidays(2023, "AT");
    expect(result).toEqual([]);
  });
});

describe("#checkIfTodayIsPublicHoliday", () => {
  it("should return true if today is a public holiday", async () => {
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 200 }));

    const result = await checkIfTodayIsPublicHoliday("AT");
    expect(result).toEqual(true);
  });

  it("should return false if today is not a public holiday", async () => {
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ status: 404 }));

    const result = await checkIfTodayIsPublicHoliday("AT");
    expect(result).toEqual(false);
  });

  it("should return false if API call fails", async () => {
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest.spyOn(axios, "get").mockImplementation(() => {
      throw new Error("Error");
    });

    const result = await checkIfTodayIsPublicHoliday("AT");
    expect(result).toEqual(false);
  });
});

describe("#getNextPublicHolidays", () => {
  it("should return a list of public holidays", async () => {
    jest
      .spyOn(axios, "get")
      .mockImplementation(() =>
        Promise.resolve({ data: [PUBLIC_HOLIDAY_MOCK] })
      );
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest
      .spyOn(mockHelpers, "shortenPublicHoliday")
      .mockReturnValue(PUBLIC_HOLIDAY_MOCK);

    const result = await getNextPublicHolidays("AT");
    expect(result).toEqual([PUBLIC_HOLIDAY_MOCK]);
  });

  it("should return an empty array if API call fails", async () => {
    jest.spyOn(mockHelpers, "validateInput").mockReturnValue(true);
    jest.spyOn(axios, "get").mockImplementation(() => {
      throw new Error("Error");
    });

    const result = await getNextPublicHolidays("AT");
    expect(result).toEqual([]);
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
