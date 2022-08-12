import { Food } from "../@types/food";

export const groupEntriesByUser = (entries: Food[]) => {
  const groups: {
    user: string;
    entries: Food[];
  }[] = [];
  entries.forEach((entry) => {
    if (!groups.find((group) => group.user === entry.user?.name)) {
      groups.push({
        user: entry.user?.name as string,
        entries: [entry],
      });
    } else {
      groups
        .find((group) => group.user === entry.user?.name)
        ?.entries.push(entry);
    }
  });
  return groups;
};

export const filterEntriesByWeek = (
  entriesByUser: { user: string; entries: Food[] }[],
  weekPast: number
) => {
  return entriesByUser.map((el) => ({
    ...el,
    entries: el.entries.filter((entry) => isBetweenDates(entry, weekPast)),
  }));
};

export const getDatesForWeek = (weekPast: number) => {
  const fromDate = new Date();
  const toDate = new Date();
  const from = fromDate.setDate(fromDate.getDate() - weekPast * 7);
  const to =
    weekPast === 1
      ? toDate
      : toDate.setDate(toDate.getDate() - weekPast * 7 + 7);
  return (
    new Date(from).toLocaleDateString() +
    " - " +
    new Date(to).toLocaleDateString()
  );
};

export const isBetweenDates = (entry: Food, weekPast: number) => {
  const dateTo = new Date();
  const dateFrom = new Date();
  const from = new Date(dateFrom.setDate(dateFrom.getDate() - weekPast * 7));
  const to =
    weekPast === 1
      ? dateTo
      : new Date(dateTo.setDate(dateTo.getDate() - weekPast * 7 + 7));
  const entryDate = new Date(entry.date);
  return (
    entryDate.getTime() >= from.getTime() && entryDate.getTime() <= to.getTime()
  );
};

export const groupEntriesByDay = (entries: Food[]) => {
  const groupedEntries = entries.reduce((acc: any, entry: Food) => {
    const date = entry.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});
  return groupedEntries;
};

export const dateToString = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const renderDate = (date: string, slice: number) => {
  let newDate = new Date(date);
  if (slice === 16) {
    newDate.setTime(
      newDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
    );
    return newDate.toISOString().slice(0, slice);
  }
  newDate.setTime(
    newDate.getTime() + new Date().getTimezoneOffset() * 60 * 1000
  );
  return newDate.toLocaleString().slice(0, slice);
};

export const calcAverage = (arr: Food[]) => {
  return (
    arr.reduce((acc: number, entry: any) => {
      return acc + entry.calories;
    }, 0) / arr.length
  );
};
