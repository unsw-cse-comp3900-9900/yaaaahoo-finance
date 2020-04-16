import React from "react";
import MaterialTable from "material-table";
import { Paper } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function createData(portfolios, companyData) {
    const symbol = companyData.symbol;
    const rows = [];
    portfolios.forEach((portfolio) => {
      if (!portfolio.holdings) return;
      for (let holding of Object.values(portfolio.holdings)) {
        if (holding.symbol === symbol) {
          const totalGain =
            (companyData.latestPrice - holding.costPerUnit) *
            holding.numberOfUnits;
          const totalPerc = companyData.latestPrice / holding.costPerUnit;
          const daysGain = companyData.change * holding.numberOfUnits;
          const daysPerc = companyData.changePercent * holding.numberOfUnits;
          rows.push({
            portfolio: portfolio.name,
            daysGain,
            daysPerc,
            totalGain,
            totalPerc,
          });
          break;
        }
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
          { title: "Days Gain (%)", field: "daysGainPerc", type: "numeric" },
          { title: "Total Gain", field: "totalGain", type: "numeric" },
          { title: "Total Gain (%)", field: "totalGainPerc", type: "numeric" },
        ]}
        data={[
          {
            portfolio: "My Portfolio",
            daysGain: 12,
            daysGainPerc: 11,
            totalGain: 12,
            totalGainPerc: 11,
          },
          {
            portfolio: "Second Portfolio",
            daysGain: "",
            daysGainPerc: "",
            totalGain: "",
            totalGainPerc: "",
          },
        ]}
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
