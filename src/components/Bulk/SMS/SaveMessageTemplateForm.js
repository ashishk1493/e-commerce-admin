// @flow
import * as React from 'react';
import FormCover from "../../comman/FormCover";
import {PATH_DASHBOARD} from "../../../routes/paths";
import FormikCommanNew from "../../comman/FormikCommanNew";
import * as yup from "yup";
import SaveMessageTemplate from "../Model/QuickSmsModel/SaveMessageTemplate";

export function SaveMessageTemplateForm(props) {
    console.log(props.user,'props.user')
    const user = props.user;
    return (
        // <FormCover
        //     pageTitle={"Send Voice Note | BULK Voice PLANS"}
        //     breadcomeTitle={"Send Voice Note"}
        //     breadcomeLinks={[
        //         { name: 'Home', href: PATH_DASHBOARD.root },
        //         { name: 'Send Voice Note' },
        //     ]}
        // >
            <FormikCommanNew
                schema={{
                    template_name: yup.string('Enter your  Voice Type').required('Voice Type is required'),
                    template_id: yup.string('Enter your  Select Sender ID').required('Voice Note ID is required'),
                    template_text: yup.string('Enter your  Schedule Voice Note').required('Schedule Voice Note is required'),
                }}
                initialValuesProps={{
                    template_name: '',
                    template_id: '',
                    template_text: user ? user.message : '',
                }}
                onSubmitProps={values => {
                    console.log("VALUE MALIE GAY", values);
                }}
                Ch={SaveMessageTemplate}
            />
        // </FormCover>
    );
};

export default SaveMessageTemplateForm;