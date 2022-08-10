import React, { useContext } from "react";
import ReportList from "../../components/ReportList/ReportList";
import AppContext from "../../context";
import { dateToString } from "../../utils";
import "./Report.css";

const Report: React.FC = () => {
  const { foodEntries } = useContext(AppContext);

  return (
    <div className="Report">
      <h1>Report</h1>
      <span className="report-date">
        Report as at: {dateToString(new Date())}
      </span>
      <ReportList entries={foodEntries} />
    </div>
  );
};

export default Report;
