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
import { get_order_list_slice } from 'src/redux/slices/ecom_order';
import { delete_order_service } from 'services/ecom_order.service';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

OrderList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function OrderList() {
  const { themeStretch } = useSettings();
  const { push } = useRouter();
  const [senderId, setSenderId] = useState('');
  const [currency, setCurrency] = useState('View All');
  const { isLoading, order_list } = useSelector((state) => state.ecom_order);
  const [lstOrder, setLstOrder] = useState([])
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
    let lstTmp = order_list.map((obj) => {
      return {
        ...obj,
      }
    })
    console.log(lstTmp, "lstTmplstTmp");
    setLstOrder(lstTmp)
  }, [order_list])
  useEffect(() => {
    onLoad();
  }, [search, rowsPerPage, page]);

  const onSearch = (value) => {
    setSearch(value);
  };

  const onLoad = async () => {
    let res = await dispatch(get_order_list_slice(rowsPerPage, page, search));
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

  const handleDeleteOrder = async (id) => {
    let res = await delete_order_service(id);
    return res;
  };

  const handelEdit = async (objOrder) => {
    console.log(objOrder.id, "call thay gyu che");
    push(`/order/edit/${objOrder.id}`);
  };
  console.log(order_list, "order_list");

  let imageAndNameShow = (index) => {
    let objTmp = order_list[index]
    console.log(order_list, "djdjj");
    return (
      'Thay che'
    )
  }
  return (
    <Page title="Order List | BULK SMS PLANS">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Order List"
          links={[{ name: 'Home', href: '/' }, { name: capitalCase('Order List') }]}
        // action={[
        //   <NextLink href={'/Order/addOrder'} passHref>
        //     <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
        //       New Order
        //     </Button>
        //   </NextLink>,
        // ]}
        />
        <Card>
          <PADataTable
            columns={[
              { label: 'invoice_no', name: 'invoice_no' },
              { label: 'order_total', name: 'order_total' },
              { label: 'payment_method', name: 'payment_method' },
              { label: 'status', name: 'status' },
              { label: 'createdAt', name: 'createdAt' },
            ]}
            data={lstOrder}
            options={options}
            // action={{
            //   delete: (id) => handleDeleteOrder(id),
            //   edit: (objOrder) => handelEdit(objOrder),
            // }}

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
            deleteApiUrl="/admin/delete-new-order"
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