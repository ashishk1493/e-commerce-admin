import { capitalCase } from 'change-case';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_BULK, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/Bulk/HeaderBreadcrumbs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/user/account';

// ----------------------------------------------------------------------

FormCover.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function FormCover(props) {
  const { pageTitle, breadcomeTitle, breadcomeLinks } = props
  const { themeStretch } = useSettings();
  const { currentTab, onChangeTab } = useTabs('general');

  return (
    <Page title={pageTitle}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={breadcomeTitle}
          links={breadcomeLinks}
        // links={[
        //   { name: 'Home', href: PATH_DASHBOARD.root },
        //   { name: 'Send Compose SMS' },
        // ]}
        />
        {props.children}
      </Container>
      <ToastContainer />

    </Page>
  );
}
