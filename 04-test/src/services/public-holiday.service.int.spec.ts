import {
  checkIfTodayIsPublicHoliday,
  getListOfPublicHolidays,
  getNextPublicHolidays,
} from "./public-holidays.service";

const publicHolidays = [
  {
    date: "2024-01-01",
    localName: "Neujahr",
    name: "New Year's Day",
  },
  {
    date: "2024-01-06",
    localName: "Heilige Drei Könige",
    name: "Epiphany",
  },
  {
    date: "2024-03-08",
    localName: "Internationaler Frauentag",
    name: "International Women's Day",
  },
  {
    date: "2024-03-29",
    localName: "Karfreitag",
    name: "Good Friday",
  },
  {
    date: "2024-03-31",
    localName: "Ostersonntag",
    name: "Easter Sunday",
  },
  {
    date: "2024-04-01",
    localName: "Ostermontag",
    name: "Easter Monday",
  },
  {
    date: "2024-05-01",
    localName: "Tag der Arbeit",
    name: "Labour Day",
  },
  {
    date: "2024-05-09",
    localName: "Christi Himmelfahrt",
    name: "Ascension Day",
  },
  {
    date: "2024-05-19",
    localName: "Pfingstsonntag",
    name: "Pentecost",
  },
  {
    date: "2024-05-20",
    localName: "Pfingstmontag",
    name: "Whit Monday",
  },
  {
    date: "2024-05-30",
    localName: "Fronleichnam",
    name: "Corpus Christi",
  },
  {
    date: "2024-08-15",
    localName: "Mariä Himmelfahrt",
    name: "Assumption Day",
  },
  {
    date: "2024-09-20",
    localName: "Weltkindertag",
    name: "World Children's Day",
  },
  {
    date: "2024-10-03",
    localName: "Tag der Deutschen Einheit",
    name: "German Unity Day",
  },
  {
    date: "2024-10-31",
    localName: "Reformationstag",
    name: "Reformation Day",
  },
  {
    date: "2024-11-01",
    localName: "Allerheiligen",
    name: "All Saints' Day",
  },
  {
    date: "2024-11-20",
    localName: "Buß- und Bettag",
    name: "Repentance and Prayer Day",
  },
  {
    date: "2024-12-25",
    localName: "Erster Weihnachtstag",
    name: "Christmas Day",
  },
  {
    date: "2024-12-26",
    localName: "Zweiter Weihnachtstag",
    name: "St. Stephen's Day",
  },
];

describe("#getListOfPublicHolidays", () => {
  it("should return a list of public holidays", async () => {
    const result = await getListOfPublicHolidays(2024, "DE");
    expect(result).toEqual(publicHolidays);
  });
});

describe("#checkIfTodayIsPublicHoliday", () => {
  it("should return false if today is a public holiday", async () => {
    const result = await checkIfTodayIsPublicHoliday("DE");
    expect(result).toEqual(false);
  });
});
