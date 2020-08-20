/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import moment from 'moment';
import { lighten, fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import Switch from '@material-ui/core/Switch';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';

import Tooltip from '@material-ui/core/Tooltip';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FileCopy from '@material-ui/icons/FileCopy';
import Archive from '@material-ui/icons/Archive';
import Unarchive from '@material-ui/icons/Unarchive';

import CachedIcon from '@material-ui/icons/Cached';

import CircularProgress from '@material-ui/core/CircularProgress';

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
  {
    id: '',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    minWidth: '200px',
    width: '80%',
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
    minWidth: '55px',
    flexGrow: '1',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
    },
    marginLeft: 0,
  },
  numLinks: {
    fontSize: '1rem',
  },
  archivedSwitch: {
    minWidth: '175px',
    marginLeft: theme.spacing(2),
    display: 'flex',
  },
  archivedSwitchLabel: {
    overflow: 'hidden',
    fontSize: '1rem',
    lineHeight: 2.4,
  },
  reloadButton: {
    marginLeft: theme.spacing(5),
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    numLinks,
    onChangeSearch,
    searchValue,
    archived,
    onArchiveChange,
    reloadLinks,
    loading,
  } = props;

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
        <Typography className={classes.numLinks}>{numLinks} Links</Typography>
      </div>
      <div className={classes.archivedSwitch}>
        <Switch
          checked={archived}
          onChange={onArchiveChange}
          color="primary"
          inputProps={{ 'aria-label': 'Archived table selector' }}
        />
        {archived ? (
          <Typography className={classes.archivedSwitchLabel}>
            Archived
          </Typography>
        ) : (
          <Typography className={classes.archivedSwitchLabel}>
            Not Archived
          </Typography>
        )}
      </div>
      <div className={classes.reloadButton}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Tooltip title="Refresh now">
            <IconButton onClick={reloadLinks} size="medium">
              <CachedIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numLinks: PropTypes.number.isRequired,
  onChangeSearch: PropTypes.func,
  loading: PropTypes.bool,
  searchValue: PropTypes.string,
  archived: PropTypes.bool,
  onArchiveChange: PropTypes.func,
  reloadLinks: PropTypes.func,
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
    maxWidth: '100%',
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
    maxWidth: '15vw',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tableCellCopy: {
    maxWidth: '25vw',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    zIndex: '999',
  },
  tableCellNumeric: {
    maxWidth: '5vw',
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

export default function EnhancedTable({
  tableData,
  onChangeSelected,
  archived,
  onArchiveChange,
  onArchive,
  reloadLinks,
  loading,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [selected, setSelected] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(tableData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { enqueueSnackbar } = useSnackbar();

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
    onChangeSelected(newSelectedData);
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
    onChangeSelected: PropTypes.func,
    archived: PropTypes.bool,
    onArchiveChange: PropTypes.func,
    onArchive: PropTypes.func,
    reloadLinks: PropTypes.func,
    loading: PropTypes.bool,
  };

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
                  {`${row.domain.uri}/${row.shortLink}`}
                  <CopyToClipboard
                    text={`${row.domain.uri}/${row.shortLink}`}
                    onCopy={() =>
                      enqueueSnackbar('Copied link', {
                        variant: 'success',
                      })
                    }
                  >
                    <IconButton
                      aria-label="copy"
                      onClick={e => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                      }}
                    >
                      <FileCopy />
                    </IconButton>
                  </CopyToClipboard>
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                  className={classes.tableCellNumeric}
                >
                  {row.numClicks ? row.numClicks.toString() : '0'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.lastClick
                    ? moment(row.lastClick.createdAt).format('YYYY-M-D h:mma')
                    : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.createdAt
                    ? moment(row.createdAt).format('YYYY-M-D h:mma')
                    : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton
                    aria-label="archive"
                    onClick={e => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onArchive(row._id);
                    }}
                  >
                    {!row.archived ? <Archive /> : <Unarchive />}
                  </IconButton>
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
                <TableCell className={classes.tableCellCopy}>
                  {`${row.domain.uri}/${row.shortLink}`}
                  <CopyToClipboard
                    text={`${row.domain.uri}/${row.shortLink}`}
                    onCopy={() =>
                      enqueueSnackbar('Copied link', {
                        variant: 'success',
                      })
                    }
                  >
                    <IconButton
                      aria-label="copy"
                      onClick={e => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                      }}
                    >
                      <FileCopy />
                    </IconButton>
                  </CopyToClipboard>
                </TableCell>
                <TableCell align="center" className={classes.tableCellNumeric}>
                  {row.numClicks ? row.numClicks.toString() : '0'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.lastClick
                    ? moment(row.lastClick.createdAt).format('YYYY-M-D h:mma')
                    : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  {row.createdAt
                    ? moment(row.createdAt).format('YYYY-M-D h:mma')
                    : 'N/A'}
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <IconButton
                    aria-label="archive"
                    onClick={e => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      onArchive(row._id);
                    }}
                  >
                    {!row.archived ? <Archive /> : <Unarchive />}
                  </IconButton>
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numLinks={tableData.length}
          onChangeSearch={handleSearch}
          searchValue={searchValue}
          archived={archived}
          onArchiveChange={onArchiveChange}
          reloadLinks={reloadLinks}
          loading={loading}
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
