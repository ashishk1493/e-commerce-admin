// export default AnqDataTable
import React from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import InfoIcon from '@mui/icons-material/Info';
import RestoreIcon from '@mui/icons-material/Restore';
import MessageIcon from '@mui/icons-material/Message';
import PublicIcon from '@mui/icons-material/Public';
import classes from 'styles/anqTable.module.css'
// import DeleteModel from "../../../components/Bulk/Model/DeleteModel";
import { CircularProgress, TablePagination } from "@mui/material";
import { styled } from '@mui/material/styles'
import AnqTableSearchWithDebuger from "src/components/comman/Search/AnqTableSearchWithDebuger";
import Table from 'src/theme/overrides/Table.js'
import DeleteModel from "../DeleteModel";
// 
const RootTableWraper = styled('div')(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: 'none'
  },
  '& .css-15wwp11-MuiTableHead-root': {
    background: "#8080800a"
  },
}))
class PADataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.props.columns,
      openDelete: false,
      value: null,
      tableMeta: null,
      updateValue: null,
      selectedobjRow: {}
    };
  }

  customBodyRenderOfAction = (action, value, tableMeta, updateValue) => {
    let objRow = this.props.data[tableMeta.rowIndex]
    return (
      <div>
        {action && action.public && <PublicIcon className={classes.icons} onClick={() => { action.public(objRow) }} />}
        {action && action.reopen && <RestoreIcon className={classes.icons} onClick={() => { action.reopen(objRow) }} />}
        {action && action.message && <MessageIcon className={classes.icons} onClick={() => { action.message(objRow) }} />}
        {action && action.info && <InfoIcon className={classes.icons} onClick={() => { action.info(objRow) }} />}
        {action && action.download && <ArrowCircleDownIcon className={classes.icons} onClick={() => { action.download(objRow) }} />}
        {action && action.edit && <EditOutlinedIcon className={classes.icons} onClick={() => { action.edit(objRow) }} />}
        {action && action.delete && <DeleteOutlineOutlinedIcon className={classes.icons} onClick={() => {
          this.setState({ openDelete: true, selectedobjRow: objRow })
        }}
        />}
        {action && action.view && <RemoveRedEyeOutlinedIcon className={classes.icons} onClick={() => { action.view(objRow) }} />}
      </div>
    )
  }

  componentDidMount() {
    if (this.props.action) {
      let objAction = {
        name: "Action",
        options: {
          filter: false,
          setCellProps: () => ({
            align: "right"
          }),
          setCellHeaderProps: () => {
            return { style: { display: "flex", justifyContent: "flex-end" } }
          },
          customBodyRender: (value, tableMeta, updateValue) => {
            return (this.customBodyRenderOfAction(this.props.action, value, tableMeta, updateValue));
          }
        }
      }
      this.setState({
        columns: [...this.state.columns, objAction]
      });
    }
  }

  handleChangePage = (event, newPage) => {
    this.props.setObjPagination({ ...this.props.objPagination, page: (newPage) })
  };

  handleChangeRowsPerPage = (event) => {
    this.props.setObjPagination({ ...this.props.objPagination, page: 0, size: parseInt(event.target.value, 10) })
  };

  render() {
    console.log(this.props.objPagination, "this.props.objPagination");
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
                  noMatch: this.props.loading ?
                    <CircularProgress /> :
                    'Sorry, there is no matching data to display',
                }
              }
            }}
          />
        </RootTableWraper>
        {this.props?.isPagination &&
          <TablePagination
            component="div"
            count={this.props?.objPagination?.count}
            page={this.props?.objPagination?.page}
            rowsPerPage={this.props?.objPagination?.size}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        }
        <DeleteModel
          open={this.state.openDelete}
          handleClose={() => this.setState({ openDelete: false, selectedobjRow: {} })}
          onSubmit={this.props.action ? this.props.action.delete : this.props.action}
          tableMeta={this.state.tableMeta}
          updateValue={this.state.updateValue}
          value={this.state.value}
          selectedobjRow={this.state.selectedobjRow}
        />
      </>
    );

  }
}

export default PADataTable;