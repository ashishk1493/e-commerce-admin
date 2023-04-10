// export default AnqDataTable
import React from 'react';
import ReactDOM from 'react-dom';
import MUIDataTable from 'mui-datatables';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoIcon from '@mui/icons-material/Info';
import RestoreIcon from '@mui/icons-material/Restore';
import MessageIcon from '@mui/icons-material/Message';
import PublicIcon from '@mui/icons-material/Public';
import classes from 'styles/anqTable.module.css';
// import DeleteModel from "../../../components/Bulk/Model/DeleteModel";
import { CircularProgress, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnqTableSearchWithDebuger from 'src/components/comman/Search/AnqTableSearchWithDebuger';
import CommonDeleteModel from '../CommonDeleteModel';
import { PAnotifyError, PAnotifySuccess } from 'src/utils/tostMessage';
import { ToastContainer } from 'react-toastify';
//
const RootTableWraper = styled('div')(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none',
  },
}));

class PADataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      value: null,
      tableMeta: null,
      updateValue: null,
      selectedobjRow: {},
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  customBodyRenderOfAction = (action, value, tableMeta, updateValue) => {
    let objRow = this.props.data[tableMeta.rowIndex];
    return (
      <div>
        {action && action.public && (
          <PublicIcon
            className={classes.icons}
            onClick={() => {
              action.public(objRow);
            }}
          />
        )}
        {action && action.reopen && (
          <RestoreIcon
            className={classes.icons}
            onClick={() => {
              action.reopen(objRow);
            }}
          />
        )}
        {action && action.message && (
          <MessageIcon
            className={classes.icons}
            onClick={() => {
              action.message(objRow);
            }}
          />
        )}
        {action && action.info && (
          <InfoIcon
            className={classes.icons}
            onClick={() => {
              action.info(objRow);
            }}
          />
        )}
        {action && action.download && (
          <ArrowCircleDownIcon
            className={classes.icons}
            onClick={() => {
              action.download(objRow);
            }}
          />
        )}
        {action && action.edit && (
          <EditOutlinedIcon
            className={classes.icons}
            onClick={() => {
              action.edit(objRow);
            }}
          />
        )}
        {action && action.delete && (
          <DeleteOutlineOutlinedIcon
            className={classes.icons}
            onClick={() => {
              // action.delete(objRow);
              this.setState({ openDelete: true, selectedobjRow: objRow });
            }}
          />
        )}
        {action && action.view && (
          <RemoveRedEyeOutlinedIcon
            className={classes.icons}
            onClick={() => {
              action.view(objRow);
            }}
          />
        )}
      </div>
    );
  };

  componentDidMount() {
    if (this.props.action) {
      let objAction = {
        name: 'Action',
        options: {
          filter: false,
          setCellProps: () => ({
            align: 'right',
          }),
          setCellHeaderProps: () => {
            return { style: { display: 'flex', justifyContent: 'flex-end' } };
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return this.customBodyRenderOfAction(this.props.action, value, tableMeta, updateValue);
          },
        },
      };
      this.setState({
        columns: [...this.state.columns, objAction],
      });
    }
  }

  handleChangePage = (event, newPage) => {
    // this.props.setObjPagination({ ...this.props.objPagination, page: newPage });
    this.props.setPage(newPage);
  };

  handleChangeRowsPerPage = (event) => {
    // this.props.setObjPagination({ ...this.props.objPagination, page: 0, size: parseInt(event.target.value, 10) });
    this.props.setRowsPerPage(event.target.value);
  };

  handleDelete = async (dataObj) => {
    var result = await this.props.action.delete(dataObj.id);
    if (result.data.success == 'true') {
      PAnotifySuccess(result.data.message);
      this.setState({ openDelete: false, selectedobjRow: {} });
      this.props.onLoad();
    } else {
      PAnotifyError(result.data.message);
    }
  };

  render() {
    console.log(this.props.objPagination, 'this.props.objPagination');
    return (
      <>
        {this.props.onSearch && <AnqTableSearchWithDebuger onSearch={this.props.onSearch} />}

        <RootTableWraper>
          <MUIDataTable
            {...this.props}
            // title={this.props.title}
            data={this.props.loading ? [] : this.props.data}
            columns={this.state.columns}
            options={{
              ...this.props.options,
              textLabels: {
                body: {
                  noMatch: this.props.loading ? <CircularProgress /> : 'Sorry, there is no matching data to display',
                },
              },
            }}
          />
        </RootTableWraper>
        {this.props.totalRecord > 0 && (
          <TablePagination
            component="div"
            // count={this.props.objPagination.count}
            count={this.props.totalRecord}
            // page={this.props.objPagination.page}
            page={this.props.page}
            // rowsPerPage={this.props.objPagination.size}
            rowsPerPage={this.props.rowsPerPage}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        )}
        <CommonDeleteModel
          open={this.state.openDelete}
          handleClose={() => this.setState({ openDelete: false, selectedobjRow: {} })}
          selectedobjRow={this.state.selectedobjRow}
          onSubmit={this.handleDelete}
        />
      </>
    );
  }
}

export default PADataTable;
