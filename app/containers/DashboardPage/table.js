/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, fade, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

function createData(
  url,
  pageTitle,
  createdAt,
  type,
  creatorId,
  numClicks,
  popLocation,
  referrer,
  lastClick,
) {
  return {
    url,
    pageTitle,
    createdAt,
    type,
    creatorId,
    numClicks,
    popLocation,
    referrer,
    lastClick,
  };
}

const rows = [
  createData(
    'http://facebook.com',
    'Google',
    '12/21/1995',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
  createData(
    'http://google.com',
    'Google',
    '12/20/1994',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
  createData(
    'http://typeracer.com',
    'Google',
    '12/31/1995',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
  createData(
    'http://jackc.com',
    'Google',
    '12/21/1993',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
  createData(
    'http://ubuntu.com',
    'Google',
    '2/21/1995',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
  createData(
    'http://njit.com',
    'Google',
    '1/21/1995',
    'Website',
    'George Stafford',
    12,
    'New Jersey',
    'Social Media',
    '10/1/2019 9:29PM EST',
  ),
];

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
    disablePadding: true,
    label: 'URL',
  },
  {
    id: 'pageTitle',
    numeric: false,
    disablePadding: false,
    label: 'Page Title',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Created',
  },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  {
    id: 'creatorId',
    numeric: false,
    disablePadding: false,
    label: 'Creator Name',
  },
  {
    id: 'numClicks',
    numeric: true,
    disablePadding: false,
    label: 'Clicks (#)',
  },
  {
    id: 'popLocation',
    numeric: false,
    disablePadding: false,
    label: 'Most Popular User Location',
  },
  {
    id: 'referrer',
    numeric: false,
    disablePadding: false,
    label: 'Most Popular User Location',
  },
  {
    id: 'lastClick',
    numeric: false,
    disablePadding: false,
    label: 'Last Click',
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all links' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
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
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected, onChangeSearch, searchValue } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
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
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onChangeSearch: PropTypes.func,
  searchValue: PropTypes.string,
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
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [selected, setSelected] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState([]);
  const [data] = React.useState(rows);
  const [filteredData, setFilteredData] = React.useState(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  function handleClick(event, name) {
    // TODO: Make it open up graphics/charts for that specific link
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function handleSearch(event) {
    let filteredDatas = [];
    filteredDatas = data.filter(e => {
      const matchItems = Object.values(e);
      let retVal = false;
      matchItems.forEach(ed => {
        const regex = new RegExp(event.target.value, 'gi');
        if (typeof ed === 'string' && !retVal) {
          retVal = ed.match(regex);
        }
      });
      console.log(retVal);
      return retVal;
    });
    console.log(filteredDatas);
    setFilteredData(filteredDatas);
    setSearchValue(event.target.value);
  }

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
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
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredData.length}
            />
            <TableBody>
              {stableSort(filteredData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.url);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.url)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.url}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.url}
                      </TableCell>
                      <TableCell>{row.pageTitle}</TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.creatorId}</TableCell>
                      <TableCell align="right">{row.numClicks}</TableCell>
                      <TableCell>{row.popLocation}</TableCell>
                      <TableCell>{row.referrer}</TableCell>
                      <TableCell>{row.lastClick}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
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
      </Paper>
    </div>
  );
}
