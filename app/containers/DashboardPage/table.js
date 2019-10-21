/* eslint-disable react/no-array-index-key */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { lighten, fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FileCopy from '@material-ui/icons/FileCopy';

function sum(array, prop) {
  let total = 0;
  for (let i = 0, _len = array.length; i < _len; i += 1) {
    total += array[i][prop];
  }
  return total;
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL',
  },
  {
    id: 'pageTitle',
    numeric: false,
    disablePadding: false,
    label: 'Page Title',
  },
  {
    id: 'shortLink',
    numeric: false,
    disablePadding: false,
    label: 'Generated Link',
  },
  {
    id: 'numClicks',
    numeric: false,
    disablePadding: false,
    label: 'Clicks (#)',
  },
  {
    id: 'lastClick',
    numeric: false,
    disablePadding: false,
    label: 'Last Click',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={
              headCell.id === 'numClicks'
                ? classes.tableCellNumeric
                : classes.tableCell
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
      '&:focus': {
        width: 250,
      },
    },
  },
  toolbarInfo: {
    marginLeft: theme.spacing(7),
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numLinks, onChangeSearch, searchValue } = props;

  return (
    <Toolbar className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChangeSearch}
          value={searchValue}
        />
      </div>
      <div className={classes.toolbarInfo}>
        <Typography>{numLinks} Links</Typography>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numLinks: PropTypes.number.isRequired,
  onChangeSearch: PropTypes.func,
  searchValue: PropTypes.string,
};

const EnhancedTableGraphs = props => {
  const { classes, selectedData, filteredData } = props;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  let referrerChart;
  let popLocationChart;

  const handleMouseEnter = o => {
    const { dataKey } = o;
    console.log(dataKey);
  };

  const handleMouseLeave = o => {
    const { dataKey } = o;
    console.log(dataKey);
  };

  const renderLegend = p => {
    const { payload } = p;

    return (
      <ul>
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{
              margin: '5px',
            }}
          >
            <div
              style={{
                backgroundColor: entry.color,
                height: '5px',
                width: '5px',
              }}
            />
            {entry.payload.payload._id ? entry.payload.payload._id : 'N/A'}
          </li>
        ))}
      </ul>
    );
  };

  if (selectedData[0]) {
    referrerChart = (
      <PieChart width={250} height={225} className={classes.chart}>
        <Pie
          data={selectedData[0].referrer}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
          paddingAngle={5}
          dataKey="count"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {value}
              </text>
            );
          }}
          labelLine={false}
        >
          {selectedData[0].referrer.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          content={renderLegend}
        />
      </PieChart>
    );
    popLocationChart = (
      <PieChart width={250} height={225} className={classes.chart}>
        <Pie
          data={selectedData[0].popLocation}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
          paddingAngle={5}
          dataKey="count"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {value}
              </text>
            );
          }}
          labelLine={false}
        >
          {selectedData[0].popLocation.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          content={renderLegend}
        />
      </PieChart>
    );
  } else if (filteredData[0]) {
    referrerChart = (
      <PieChart width={250} height={225} className={classes.chart}>
        <Pie
          data={filteredData[0].referrer}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
          paddingAngle={5}
          dataKey="count"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {value}
              </text>
            );
          }}
          labelLine={false}
        >
          {filteredData[0].referrer.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          content={renderLegend}
        />
      </PieChart>
    );
    popLocationChart = (
      <PieChart width={250} height={225} className={classes.chart}>
        <Pie
          data={filteredData[0].popLocation}
          innerRadius={40}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
          paddingAngle={5}
          dataKey="count"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const RADIAN = Math.PI / 180;
            // eslint-disable-next-line
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {value}
              </text>
            );
          }}
          labelLine={false}
        >
          {filteredData[0].popLocation.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          content={renderLegend}
        />
      </PieChart>
    );
  }

  return (
    <div>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item>{referrerChart}</Grid>
        <Grid item>{popLocationChart}</Grid>
      </Grid>
    </div>
  );
};

EnhancedTableGraphs.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedData: PropTypes.array,
  filteredData: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  statPaper: {
    maxWidth: 200,
    margin: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  chart: {
    margin: theme.spacing(3),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableCell: {
    maxWidth: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableCellCopy: {
    maxWidth: '100px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    zIndex: '999',
  },
  tableCellNumeric: {
    maxWidth: '5px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardTitle: {
    fontSize: 23,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  cardInfo: {
    fontSize: 20,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function EnhancedTable({ tableData }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [selected, setSelected] = React.useState([]);
  const [selectedData, setSelectedData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(tableData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleClick(event, name, obj) {
    // TODO: Make it open up graphics/charts for that specific link
    let newSelected = [];
    let newSelectedData = [];

    newSelected = newSelected.concat(newSelected, name);
    newSelectedData = newSelectedData.concat(newSelectedData, obj);

    setSelected(newSelected);
    setSelectedData(newSelectedData);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleSearch(event) {
    setPage(0);
    let filteredDatas = [];
    filteredDatas = tableData.filter(e => {
      const matchItems = Object.values(e);
      let retVal = false;
      matchItems.forEach(ed => {
        const regex = new RegExp(event.target.value, 'gi');
        if (typeof ed === 'string' && !retVal) {
          retVal = ed.match(regex);
        }
      });
      return retVal;
    });
    setFilteredData(filteredDatas);
    setSearchValue(event.target.value);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  EnhancedTable.propTypes = {
    tableData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  };

  const baseUrl = 'http://localhost:3001/';

  let emptyRows;
  let genRows;
  let tablePagination;

  if (filteredData === undefined || filteredData.length === 0) {
    emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, tableData.length - page * rowsPerPage);
    genRows = (
      <TableBody>
        {stableSort(tableData, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.shortLink);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={event => handleClick(event, row.shortLink, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.shortLink}
                selected={isItemSelected}
              >
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="default"
                >
                  {row.url}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.pageTitle ? row.pageTitle : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCellCopy}>
                  {`${baseUrl}${row.shortLink}`}
                  <CopyToClipboard
                    text={`${baseUrl}${row.shortLink}`}
                    onClick={event => event.stopPropagation()}
                  >
                    <IconButton aria-label="copy">
                      <FileCopy />
                    </IconButton>
                  </CopyToClipboard>
                </TableCell>
                <TableCell align="center" className={classes.tableCellNumeric}>
                  {row.numClicks.toString() ? row.numClicks.toString() : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.lastClick ? row.lastClick.createdAt : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.createdAt ? row.createdAt : 'N/A'}
                </TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
    tablePagination = (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );
  } else {
    emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);
    genRows = (
      <TableBody>
        {stableSort(filteredData, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.shortLink);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                onClick={event => handleClick(event, row.shortLink, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.shortLink}
                selected={isItemSelected}
              >
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="default"
                >
                  {row.url}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.pageTitle ? row.pageTitle : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {`${baseUrl}${row.shortLink}`}
                  <CopyToClipboard text={`${baseUrl}${row.shortLink}`}>
                    <IconButton aria-label="copy">
                      <FileCopy />
                    </IconButton>
                  </CopyToClipboard>
                </TableCell>
                <TableCell align="center" className={classes.tableCellNumeric}>
                  {row.numClicks.toString() ? row.numClicks.toString() : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.lastClick ? row.lastClick.createdAt : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.createdAt ? row.createdAt : 'N/A'}
                </TableCell>
              </TableRow>
            );
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
    );
    tablePagination = (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    );
  }
  const totalClicks =
    filteredData === []
      ? sum(filteredData, 'numClicks')
      : sum(tableData, 'numClicks');
  const totalLinks =
    filteredData === [] ? filteredData.length : tableData.length;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <EnhancedTableGraphs
              selectedData={selectedData}
              filteredData={filteredData}
              classes={classes}
            />
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Paper className={classes.statPaper}>
              <Typography className={classes.cardTitle} variant="h1">
                Total Links
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                className={classes.cardInfo}
              >
                {totalLinks}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Paper className={classes.statPaper}>
              <Typography className={classes.cardTitle} variant="h1">
                Total Clicks
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                className={classes.cardInfo}
              >
                {totalClicks}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numLinks={tableData.length}
          onChangeSearch={handleSearch}
          searchValue={searchValue}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
            />
            {genRows}
          </Table>
        </div>
        {tablePagination}
      </Paper>
    </div>
  );
}
