import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Grid, MenuItem, TextField } from '@mui/material';
import { PATH_BULK, PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/Bulk/HeaderBreadcrumbs';
import PADataTable from '../../sections/@bulkcomman/tableAnq/PADataTable';
import { capitalCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { delete_category_service } from 'services/ecom_category.service';
import { ToastContainer } from 'react-toastify';
import { get_category_list_slice } from 'src/redux/slices/ecom_category';
import moment from 'moment';

// ----------------------------------------------------------------------

CategoryList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function CategoryList() {
  const { themeStretch } = useSettings();
  const { push } = useRouter();
  const [senderId, setSenderId] = useState('');
  const [currency, setCurrency] = useState('View All');
  const { isLoading, category_list } = useSelector((state) => state.ecom_category);
  const [lstCategory, setLstCategory] = useState([])
  const [isPagination, setIsPagination] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRecord, setTotalRecord] = useState(0);
  const [search, setSearch] = React.useState('');

  const [objPagination, setObjPagination] = useState({
    size: 5,
    page: 0,
    count: 10,
    search: '',
  });

  const options = {
    download: false,
    filter: false,
    viewColumns: false,
    print: false,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: false,
    pagination: false,
    search: false,
  };

  useEffect(() => {
    let lstTmp = category_list.map((obj) => {
      return {
        ...obj,
        status: obj.status ? "Active" : "Inactive"
        // objPName: {
        //   name: obj.name,
        //   image: obj.images[0],
        // }
      }
    })
    setLstCategory(lstTmp)
  }, [category_list])
  useEffect(() => {
    onLoad();
  }, [search, rowsPerPage, page]);

  const onSearch = (value) => {
    setSearch(value);
  };

  const onLoad = async () => {
    let res = await dispatch(get_category_list_slice(rowsPerPage, page, search));
    setTotalRecord(res?.totalItems || 0);
  };

  const onDateRange = (ranges) => {
    console.log(ranges, 'date male che');
  };

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleSearch = () => {
    console.log(currency, 'currency');
  };

  const handleDeleteCategory = async (id) => {
    let res = await delete_category_service(id);
    return res;
  };

  const handelEdit = async (objCategory) => {
    console.log(objCategory.id, "call thay gyu che");
    push(`/category/edit/${objCategory.id}`);
  };
  console.log(category_list, "category_list");

  let imageAndNameShow = (index) => {
    let objTmp = category_list[index]
    console.log(category_list, "djdjj");
    return (
      'Thay che'
    )
  }
  return (
    <Page title="Category List | BULK SMS PLANS">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Category List"
          links={[{ name: 'Home', href: '/' }, { name: capitalCase('Category List') }]}
          action={[
            <NextLink href={'/category/addCategory'} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Category
              </Button>
            </NextLink>,
          ]}
        />
        <Card>
          <PADataTable
            columns={[
              {
                label: 'Category',
                name: 'name',
              },
              {
                label: 'Create At',
                name: 'createdAt',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    let tmpValue = moment(value).format('LLL');
                    return <div>{tmpValue}</div>;
                  },
                },
              },
              { label: 'Status', name: 'status' },
            ]}
            data={lstCategory}
            options={options}
            action={{
              delete: (id) => handleDeleteCategory(id),
              edit: (objCategory) => handelEdit(objCategory),
            }}

            isPagination={isPagination}
            setObjPagination={setObjPagination}
            objPagination={objPagination}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setSearch={setSearch}
            search={search}
            totalRecord={totalRecord}
            onSearch={onSearch}
            loading={isLoading}
            setOpenDeleteModal={setOpenDeleteModal}
            openDeleteModal={openDeleteModal}
            deleteApiUrl="/admin/delete-category"
            onLoad={onLoad}
          />
        </Card>
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          autoClose={false}
          newestOnTop={true}
          closeOnClick={false}
          draggable={false}
          rtl={false}
        />
      </Container>
    </Page>
  );
}