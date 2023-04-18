import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Tabs, TextField } from '@mui/material';
// routes
import { PATH_BULK, PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../../_mock';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/Bulk/HeaderBreadcrumbs';

import * as yup from 'yup';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';
// _mock
import { countries } from '../../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { useRouter } from 'next/router';

// sections
import {
    AccountGeneral,
    AccountBilling,
    AccountSocialLinks,
    AccountNotifications,
    AccountChangePassword,
} from '../../../sections/@dashboard/user/account';
import FormCover from 'src/components/comman/FormCover';
import AnqAutocomplete from '../../../components/comman/FormImputs/AnqAutocomplete';
import FormikCommanNew from 'src/components/comman/FormikCommanNew';
import BulkSMSForm from 'src/components/Bulk/BulkSMSForm';
// import { get_list_for_bulk_sms_form_slice, set_add_loading_slice } from 'src/redux/slices/sms/sms_bulk_sms';
import { dispatch } from 'src/redux/store';
import { get_category_list_autocomplete_slice, get_category_list_slice } from 'src/redux/slices/ecom_category';
import { edit_category_service, getbyid_category_service } from 'services/ecom_category.service';
import { anqAddform, anqEditform } from 'src/utils/bulkComman';
import FormDisabledOnLoading from 'src/components/comman/FormDisabledOnLoading';
import EcomCategoryAdd from 'src/components/Bulk/EcomCategoryAdd';
// import { add_sms_bulk_sms } from 'services/sms/sms_bulk_sms.service';
// import { anqAddform } from 'src/utils/bulkComman';

// import FormDemo from '';

// ----------------------------------------------------------------------

addCategory.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
];

export default function addCategory(props) {
    const { pageTitle, breadcomeTitle, breadcomeLinks } = props;
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();
    const { query, pathname, push } = useRouter();

    const { id } = query;
    const { user } = useAuth();

    const [formStateValue, setFormStateValue] = useState({});
    const [loading, setLoading] = useState(false);
    const [objUserDetails, setObjUserDetails] = useState({});
    const redirectOnSuc = () => {
        push('/category/categoryList');
    };
    console.log(id, "query");
    useEffect(() => {
        onLoad();
    }, [dispatch, id]);

    const onLoad = async () => {
        setLoading(true)
        let res = await dispatch(get_category_list_autocomplete_slice());
        let resCategory = await getbyid_category_service(id)
        let objUser = resCategory.data.data
        setObjUserDetails(objUser)
        setLoading(false)
    };

    const UpdateUserSchema = Yup.object().shape({
        sms_type: Yup.string().required('SMS Type is required'),
    });

    const defaultValues = {
        sms_type: formStateValue?.sms_type || '',
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'photoURL',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );
    console.log(objUserDetails.category_id, "objUserDetails.category_id");
    return (
        <FormCover
            pageTitle={'Edit Category'}
            breadcomeTitle={'Edit Category'}
            breadcomeLinks={[{ name: 'Home', href: PATH_DASHBOARD.root }, { name: 'Edit Category' }]}
        > {id && objUserDetails.category_id ?
            <FormikCommanNew
                loading={loading}
                schema={{
                    category_id: yup.string('Enter your category').required('category is required'),
                    // images: yup.string('Enter your images').required('images is required'),
                    name: yup.string('Enter your name').required('name is required'),
                    description: yup.string('Enter your description').required('description is required'),
                    sku: yup.string('Enter your sku').required('sku is required'),
                    price: yup.string('Enter your price').required('price is required'),
                    mrp: yup.string('Enter your mrp').required('mrp is required'),
                    qty: yup.string('Enter your qty').required('qty is required'),
                    // color: yup.string('Enter your color').required('color is required'),
                    // sizes: yup.string('Enter your sizes').required('sizes is required')
                }}
                initialValuesProps={{
                    category_id: objUserDetails.category_id || "",
                    images: objUserDetails.images || [],
                    name: objUserDetails.name || "",
                    description: objUserDetails.description || "",
                    sku: objUserDetails.sku || "",
                    price: objUserDetails.price || "",
                    mrp: objUserDetails.mrp || "",
                    qty: objUserDetails.qty || "",
                    colors: objUserDetails.colors || [],
                    sizes: objUserDetails.sizes || [],
                }}
                onSubmitProps={async (values) => {
                    console.log('VALUE MALIE GAY', values);
                    setLoading(true);
                    let res = await anqEditform(values, id, edit_category_service, redirectOnSuc);
                    setLoading(false);
                }}
                Ch={EcomCategoryAdd}
            />
            :
            <FormDisabledOnLoading />
            }
        </FormCover>
    );
}
