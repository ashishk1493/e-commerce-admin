import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Grid, MenuItem, TextField } from '@mui/material';
import { PATH_BULK, PATH_DASHBOARD } from '../../routes/paths';
import useSettings from '../../hooks/useSettings';
import Layout from '../../layouts';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// import HeaderBreadcrumbs from '../../components/bulk';
import HeaderBreadcrumbs from '../../components/Bulk/HeaderBreadcrumbs';
import PADataTable from '../../sections/@bulkcomman/tableAnq/PADataTable';
import { capitalCase } from 'change-case';
// import AnqRangeDatePiker from "../../components/Bulk/AnqRangeDatePiker";
import React, { useEffect, useState } from "react";
// import { get_sms_dlr_report_list_slice } from 'src/redux/slices/sms/sms_dlr_report';
import { useSelector } from 'react-redux';
import { dispatch } from 'src/redux/store';
import { get_category_list_slice } from 'src/redux/slices/ecom_category';

// ----------------------------------------------------------------------

categoryList.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const jobStatus = [
    { value: 'View All', label: 'View All' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Partially Finished', label: 'Partially Finished' },
    { value: 'In Process', label: 'In Process' },
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Waiting For Execution', label: 'Waiting For Execution' },
    { value: 'Insufficent Credits', label: 'Insufficent Credits' },
    { value: 'Stopped', label: 'Stopped' },
    { value: 'Deleted', label: 'Deleted' },
];

export default function categoryList() {
    const { themeStretch } = useSettings();
    const { push } = useRouter();
    const [senderId, setSenderId] = useState('')
    const [currency, setCurrency] = useState('View All');
    const { isLoading, category_list } = useSelector((state) => state.ecom_category);

    const [isPagination, setIsPagination] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [objPagination, setObjPagination] = useState({
        size: 5,
        page: 0,
        count: 10,
        search: "",
    })

    const data = [
        { name: "Joe James", totalNumbers: "5", city: "Yonkers", state: "NY" },
        { name: "John Walsh", totalNumbers: "7", city: "Hartford", state: "CT" },
        { name: "Bob Herm", totalNumbers: "9", city: "Tampa", state: "FL" },
        { name: "James Houston", totalNumbers: "3", city: "Dallas", state: "TX" },
    ];

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
        onLoad()
    }, [dispatch, objPagination.count, objPagination.size, objPagination.page, objPagination.search])

    const onSearch = (value) => {
        setObjPagination({ ...objPagination, search: value, page: 0 })
    }

    const onLoad = async () => {
        let res = await dispatch(get_category_list_slice(objPagination))
        console.log(res, "res.totalItems");
        setObjPagination({ ...objPagination, count: res ? res.totalItems : 0 })
        setIsPagination(true)
        setLoading(false)
    }


    const onDateRange = (ranges) => {
        console.log(ranges, "date male che");
    };
    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
    };
    const handleSearch = () => {
        console.log(currency, 'currency')
    }
    console.log(category_list, "category_list");

    return (
        <Page title="category List | BULK SMS PLANS">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="category List"
                    links={[
                        { name: 'Home', href: '/' },
                        { name: capitalCase('category List') },
                    ]}
                    action={[
                        <NextLink href={'/category/addcategory'} passHref>
                            <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />}>
                                New category
                            </Button>
                        </NextLink>
                    ]}
                />
                <Card>
                    {/* Table */}
                    <PADataTable
                        // title={"category List"}
                        columns={[
                            {
                                label: "category", name: "name", options: {
                                    customBodyRender: (value, tableMeta, updateValue) => {
                                        let tmpValue = tableMeta
                                        console.log(tmpValue, "valuevalue");

                                        console.log(value, "valuevalue");
                                        return (
                                            <div>
                                                {value}
                                            </div>
                                        )
                                    }
                                }
                            },
                            // { label: "category", name: "name" },
                            { label: "Create At", name: "createdAt" },
                            { label: "Status", name: "status" },
                        ]}
                        data={category_list}
                        options={options}
                        isPagination={isPagination}
                        setObjPagination={setObjPagination}
                        objPagination={objPagination}
                        onSearch={onSearch}
                        loading={isLoading}
                        action={{
                            delete: (rowData) => {
                                console.log(rowData, "Call delete")
                            }
                        }}
                    />

                </Card>
            </Container>
        </Page >
    );
}