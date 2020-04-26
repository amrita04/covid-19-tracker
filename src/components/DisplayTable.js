import React from "react";
import "../styles/DisplayTable.css";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const DisplayTable = ({ tableData, isDarkMode }) => {
  const { items, requestSort, sortConfig } = useSortableData(tableData);
  const lightText = {
    color: isDarkMode && "rgba(255,255,255,.75)",
  };
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <table>
      {/* <caption>Products</caption> */}
      <thead>
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort("name")}
              className={getClassNamesFor("name")}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("confirmed")}
              className={getClassNamesFor("confirmed")}
            >
              Confirmed
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("active")}
              className={getClassNamesFor("active")}
            >
              Active
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("discharged")}
              className={getClassNamesFor("discharged")}
            >
              Recovered
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("deaths")}
              className={getClassNamesFor("deaths")}
            >
              Deceased
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td style={lightText}>{item.name}</td>
            <td style={lightText}>{item.confirmed}</td>
            <td style={lightText}>{item.active}</td>
            <td style={lightText}>{item.discharged}</td>
            <td style={lightText}>{item.deaths}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;