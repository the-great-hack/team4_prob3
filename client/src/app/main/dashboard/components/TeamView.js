import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper
} from "@material-ui/core";

function TeamView(props) {
  const { teams } = props;
  console.log(teams);
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">Teams</Typography>
      </div>

      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-no-wrap">Name</TableCell>
              <TableCell className="whitespace-no-wrap">Address</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams &&
              teams.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-no-wrap">
                    {item.name}
                  </TableCell>

                  <TableCell className="whitespace-no-wrap">
                    {item.delivery_address}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default TeamView;
