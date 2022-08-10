import React, { useContext } from "react";
import AppContext from "../../context";
import Button from "../Button/Button";
import "./FilterEntries.css";

const FilterEntries: React.FC = () => {
  const {
    filterApplied,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    filterEntriesByDate,
    handleClearFilter,
  } = useContext(AppContext);

  const applyFilter = () => {
    filterEntriesByDate(fromDate, toDate);
  };

  return (
    <div className="FilterEntries">
      <span>From: </span>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <span>To: </span>
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />
      {filterApplied && (
        <span className="clear-filter" onClick={() => handleClearFilter()}>
          Clear
        </span>
      )}
      <Button
        variant="primary"
        disabled={!fromDate || !toDate}
        size="small"
        label="Filter by dates"
        handleClick={() => applyFilter()}
      />
    </div>
  );
};

export default FilterEntries;
