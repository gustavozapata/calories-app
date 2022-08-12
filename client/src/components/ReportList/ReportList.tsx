import React, { useEffect, useState } from "react";
import { Food } from "../../@types/food";
import {
  getDatesForWeek,
  groupEntriesByUser,
  filterEntriesByWeek,
  calcAverage,
} from "../../utils";
import "./ReportList.css";

export interface ReportListProps {
  entries: Array<Food>;
}

interface ReportData {
  user: string;
  recentEntries: number;
  recentAvgCalories: number;
  lastEntries: number;
  lastAvgCalories: number;
}

interface ReportEntries {
  user: string;
  entries: Food[];
  lastEntriesArray: Food[];
}

const ReportList: React.FC<ReportListProps> = ({ entries }) => {
  const [reportData, setReportData] = useState<Array<ReportData>>([]);
  const [reportGroups] = useState([
    {
      week: "Most recent week",
      dates: getDatesForWeek(1),
    },
    {
      week: "Last week",
      dates: getDatesForWeek(2),
    },
  ]);

  useEffect(() => {
    const entriesByUser = groupEntriesByUser(entries);
    const entriesByRecentWeek = filterEntriesByWeek(entriesByUser, 1);
    const entriesByLastWeek = filterEntriesByWeek(entriesByUser, 2);

    let combineEntries: ReportEntries[] = [];
    entriesByRecentWeek.forEach((recentEntry) => {
      entriesByLastWeek.forEach((lastEntry) => {
        if (recentEntry.user === lastEntry.user) {
          combineEntries.push({
            ...recentEntry,
            lastEntriesArray: lastEntry.entries,
          });
        }
      });
    });

    let reports = combineEntries.map((report) => {
      return {
        user: report.user,
        recentEntries: report.entries.length,
        recentAvgCalories:
          report.entries.length > 0 ? calcAverage(report.entries) : 0,

        lastEntries: report.lastEntriesArray.length,
        lastAvgCalories:
          report.lastEntriesArray.length > 0
            ? calcAverage(report.lastEntriesArray)
            : 0,
      };
    });
    setReportData(reports);
  }, [entries]);

  return (
    <div className="ReportList FoodEntries">
      {entries.length > 0 ? (
        <table>
          <thead>
            <tr className="weeks-header">
              <th></th>
              {reportGroups.map((group) => (
                <th key={group.week} colSpan={2}>
                  {group.week}
                  <br />
                  <span>{group.dates}</span>
                </th>
              ))}
            </tr>
            <tr>
              <th>User</th>
              <th>Entries</th>
              <th>Avg. Calories</th>
              <th>Entries</th>
              <th>Avg. Calories</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((entry) => (
              <tr key={entry.user}>
                <td>{entry.user}</td>
                <td>{entry.recentEntries}</td>
                <td>
                  {entry.recentAvgCalories.toFixed(2).replace(/\.00$/, "")}
                </td>
                <td>{entry.lastEntries}</td>
                <td>{entry.lastAvgCalories.toFixed(2).replace(/\.00$/, "")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-entries">No results found</p>
      )}
    </div>
  );
};

export default ReportList;
