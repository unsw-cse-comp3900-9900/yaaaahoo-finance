import React from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function createData(portfolios, companyData) {
    const symbol = companyData.symbol;
    const rows = [];
    portfolios.forEach((portfolio) => {
      let portfolioRecorded = false;
      if (!portfolio.holdings) return;
      for (let holding of Object.values(portfolio.holdings)) {
        if (holding.symbol === symbol) {
          const totalGain = ((companyData.latestPrice - holding.costPerUnit) * holding.numberOfUnits)
              .toLocaleString(navigator.language, {minimumFractionDigits: 2});
          const totalPerc = ((companyData.latestPrice - holding.costPerUnit) / holding.costPerUnit * 100)
              .toLocaleString(navigator.language, {minimumFractionDigits: 2});
          const daysGain = (companyData.change * holding.numberOfUnits)
              .toLocaleString(navigator.language, {minimumFractionDigits: 2});
          const daysPerc = (companyData.changePercent)
              .toLocaleString(navigator.language, {minimumFractionDigits: 2});
          rows.push({
            portfolio: portfolio.name,
            daysGain,
            daysPerc,
            totalGain,
            totalPerc,
          });
          portfolioRecorded = true;
          break;
        }
      }
      if (portfolioRecorded === false) {
        rows.push({
            portfolio: portfolio.name,
            daysGain: "",
            daysPerc: "",
            totalGain: "",
            totalPerc: "",
          });
      }
    });
    return rows;
  }

const Holdings = ({ portfolios, companyData }) => {
  return (
    <TableContainer component={Paper}>
      <MaterialTable
        title="Portfolios Table"
        columns={[
          { title: "Portfolio", field: "portfolio" },
          { title: "Days Gain", field: "daysGain", type: "numeric" },
          { title: "Days Gain (%)", field: "daysPerc", type: "numeric" },
          { title: "Total Gain", field: "totalGain", type: "numeric" },
          { title: "Total Gain (%)", field: "totalPerc", type: "numeric" },
        ]}
        data={createData(portfolios, companyData)}
        actions={[
          (rowData) => ({
            icon: () => <AddCircleIcon />,
            tooltip: "Add to portfolio",
            onClick: (event) => alert("SAVE!!"),
            hidden: rowData.daysGain !== "",
          }),
        ]}
        options={{
          actionsColumnIndex: -1,
          paging: false,
          search: false,
          showTitle: false,
        }}
        localization={{
          header: {
            actions: "",
          },
        }}
      />
    </TableContainer>
  );
};

export default Holdings;
