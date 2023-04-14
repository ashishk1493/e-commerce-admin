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
import { get_product_list_slice } from 'src/redux/slices/ecom_product';
import { delete_product_service } from 'services/ecom_product.service';
import { ToastContainer } from 'react-toastify';

// ----------------------------------------------------------------------

ProductList.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function ProductList() {
  const { themeStretch } = useSettings();
  const { push } = useRouter();
  const [senderId, setSenderId] = useState('');
  const [currency, setCurrency] = useState('View All');
  const { isLoading, product_list } = useSelector((state) => state.ecom_product);
  const [lstProduct, setLstProduct] = useState([])
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
    let lstTmp = product_list.map((obj) => {
      return {
        ...obj,
        objPName: {
          name: obj.name,
          image: obj.images[0],
        }
      }
    })
    console.log(lstTmp, "lstTmplstTmp");
    setLstProduct(lstTmp)
  }, [product_list])
  useEffect(() => {
    onLoad();
  }, [search, rowsPerPage, page]);

  const onSearch = (value) => {
    setSearch(value);
  };

  const onLoad = async () => {
    let res = await dispatch(get_product_list_slice(rowsPerPage, page, search));
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

  const handleDeleteProduct = async (id) => {
    let res = await delete_product_service(id);
    return res;
  };
  console.log(product_list, "product_list");

  let imageAndNameShow = (index) => {
    let objTmp = product_list[index]
    console.log(product_list, "djdjj");
    return (
      'Thay che'
    )
  }
  return (
    <Page title="Product List | BULK SMS PLANS">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product List"
          links={[{ name: 'Home', href: '/' }, { name: capitalCase('Product List') }]}
          action={[
            <NextLink href={'/product/addProduct'} passHref>
              <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                New Product
              </Button>
            </NextLink>,
          ]}
        />
        <Card>
          <PADataTable
            columns={[
              {
                label: 'Product',
                name: 'objPName',
                options: {
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return <div style={{ display: "flex" }}>
                      <div style={{ minWidth: "50px" }}>
                        <img
                          src={'http://localhost:8080' + value.image}
                          style={{
                            height: "40px",
                            borderRadius: "10px",
                            width: "40px",
                            objectFit: "cover"
                          }}
                          alt={value.name}
                        />
                      </div>
                      <div>
                        {value.name}
                      </div>
                    </div>
                  },
                },
              },
              { label: 'Create At', name: 'createdAt' },
              { label: 'Status', name: 'inventoryType' },
              { label: 'Price', name: 'price' },
            ]}
            data={lstProduct}
            options={options}
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
            deleteApiUrl="/admin/delete-new-product"
            onLoad={onLoad}
            action={{
              delete: (id) => handleDeleteProduct(id),
            }}
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
