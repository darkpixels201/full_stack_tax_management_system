import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Grid, Icon, PaginationItem, Tab } from "@mui/material";
import { Box, padding, width } from "@mui/system";
import Spacer from "../CustomComponents/Spacer";
import { colors } from "../../utils/Colors";
import CustomText from "../CustomComponents/CustomText";
import { FaTrash } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { RiDeleteBack2Fill } from "react-icons/ri";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 6800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const columns = [
  { id: "name", label: "Name", minWidth: 150 },
  //   { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    // align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "accounttype",
    label: "Account Type",
    minWidth: 120,
    // align: "left",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "sports",
    label: "Sports",
    minWidth: 100,
    // align: "right",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "delete",
    label: "Delete",
    minWidth: 70,
    align: "left",
    // format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", "1324171354", 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

const rows = [
  {
    id: 1,
    name: "Ish",
    email: "ish@gmail.com",
    accounttype: "Athlete",
    sport: "Football",
    skill1: "Ball Control",
    skill2: "Dribble",
    skill3: "LeaderShip",
  },
  {
    id: 1,
    name: "Ahmad",
    email: "ahmd@gmail.com",
    accounttype: "Athlete",
    sport: "BaseBall",
    skill1: "Agility",
    skill2: "Hitting",
    skill3: "Pitching",
  },
  {
    id: 1,
    name: "Ali",
    email: "ali@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Catching",
  },
  {
    id: 1,
    name: "Fahad",
    email: "fahad@gmail.com",
    accounttype: "Coach",
    sport: "Bxing",
    skill1: "Accuracy",
    skill2: "Chin",
    skill3: "Cross",
  },
  {
    id: 1,
    name: "Talha",
    email: "talha@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Spin Bowl",
  },
  {
    id: 1,
    name: "Umair",
    email: "umair@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Cordination",
    skill3: "Running",
  },
  {
    id: 1,
    name: "Ahmad",
    email: "ahmd@gmail.com",
    accounttype: "Manager",
    sport: "BaseBall",
    skill1: "",
    skill2: "",
    skill3: "",
  },
  {
    id: 1,
    name: "pakistan",
    email: "Zaid@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Catching",
  },
  {
    id: 1,
    name: "pakistan",
    email: "Zaid@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Catching",
  },
  {
    id: 1,
    name: "pakistan",
    email: "Zaid@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Catching",
  },
  {
    id: 1,
    name: "pakistan",
    email: "Zaid@gmail.com",
    accounttype: "Athlete",
    sport: "Cricket",
    skill1: "Right Arm Fast",
    skill2: "Running",
    skill3: "Catching",
  },
];

const DashboardTable = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 2398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 4800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4200,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 3100,
      amt: 2100,
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 10, paddingLeft: 3, paddingRight: 3 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 8 }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={5.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              overflow: "hidden",
              borderRadius: 2,
              boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
            }}
          >
            <TableContainer sx={{ maxHeight: 540 }}>
              <Table>
                <TableHead>
                  <div style={{ padding: 20 }}>
                    <CustomText
                      title="Market Overview"
                      fontSize={15}
                      fontFamily={"medium"}
                    />
                  </div>
                </TableHead>
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        <CustomText
                          title={column.label}
                          fontSize={15}
                          color={colors.grey6}
                          fontFamily={"medium"}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row.name} fontSize={14} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row.email} fontSize={14} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row.accounttype} fontSize={14} />
                          </TableCell>
                          <TableCell
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <CustomText title={row.sport} fontSize={14} />
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderColor: colors.grey, borderWidth: 0.5 }}
                          >
                            <div
                              style={{
                                height: 22,
                                width: 22,
                                marginLeft: 10,
                                backgroundColor: "rgba(255, 51, 102, 0.05)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                cursor: "pointer",
                              }}
                            >
                              <FaTrash color={colors.red} />
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              //   rowsPerPageOptions={false}
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={2.5}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            style={{
              height: 600,
              width: "95%",
              backgroundColor: colors.white,
              borderRadius: 10,
              boxShadow: "0px 0px 8px -2px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "auto", padding: 18, paddingTop: 20 }}>
              <CustomText
                title={"Sales Total"}
                fontSize={15}
                fontFamily={"medium"}
              />
              <Spacer height={20} />
              <CustomText title={"$971883"} fontSize={45} fontFamily={"bold"} />
              <Spacer height={20} />
              <CustomText
                title={
                  "The French Revolution constituted for the conscience of the dominant aristocratic class a fall from innocence, and upturning of the natural chain"
                }
                color={colors.textGrey}
                fontSize={15}
              />
              {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  width={10}
                  height={20}
                  data={data}
                  margin={{
                    left: 0,
                    bottom: 0,
                  }}
                  style={{
                    display: "flex",
                  }}
                  barSize={40}
                >
                  <Bar dataKey="uv" fill="#6303ED" />
                </BarChart>
              </ResponsiveContainer> */}
            </div>
            {/* <Spacer height={245} /> */}
            {/* <div style={{width:"100%", height:"60%", backgroundColor:"red", display:"flex",  alignItems:"flex-end"}} > */}
            <ResponsiveContainer width="100%" height="20%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  left: 0,
                  bottom: 0,
                }}
              >
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="none"
                  fill={colors.lightGreen}
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="none"
                  fill={colors.grey4}
                />
              </AreaChart>
            </ResponsiveContainer>
            {/* </div> */}
          </Box>
        </Grid>
      </Grid>
      <Spacer height={100} />
    </Box>
  );
};

export default DashboardTable;

//   <Grid
//           item
//           xs={12}
//           md={8}
//           sx={{ overflow: "auto", whiteSpace: "nowrap" }}
//         >

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Dessert (100g serving)</TableCell>
//                   <TableCell align="right">Calories</TableCell>
//                   <TableCell align="right">Fat&nbsp;(g)</TableCell>
//                   <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//                   <TableCell align="right">Protein&nbsp;(g)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow
//                     key={row.name}
//                     sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//                   >
//                     <TableCell component="th" scope="row">
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
