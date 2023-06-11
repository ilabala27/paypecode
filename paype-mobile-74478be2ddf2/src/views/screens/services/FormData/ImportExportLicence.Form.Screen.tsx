import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet, Text } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { Selection } from '@views/components/functional/Selection';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { hs, ws } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { canPushNorPop } from '@utilis/methods/array.method';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';
import { authourisedsignatory, states } from '@models/static/adminSlice.static';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "Pan_no_firm", "name_as_per_pan", "date_of_birth", "busi_name",
        "busi_add", "busi_state", "district", "pin_code", "nature_of_concern", "bank_acc_no", "holder_name", "bank_name", "branch_name", "ifsc", "cin",
        "name_of_app", "designation", "app_add", "app_mobile", "app_email", "app_pan", "auth_name", "auth_pan", "auth_dob", "father_name", "street_name",
        "area_name", "state", "mob_no", "aadhar_no", "signatory"

    ])
    const [form, setForm] = useState({
        customer_name: '', customer_name_error: '',
        customer_name_validation: [
            { method: "isReq", params: { label: 'Customer Name' } }
        ],
        company_name: '', company_name_error: '',
        company_name_validation: [
            { method: "isString", params: { label: 'Company Name' } }
        ],
        contact_number: '', contact_number_error: '',
        contact_number_validation: [
            { method: "isMobileNo", params: { label: 'Contact Number' } }
        ],
        customer_email: '', customer_email_error: '',
        customer_email_validation: [
            { method: "isEmail", params: { label: 'Customer Email' } }
        ],
        customer_state: [], customer_state_error: '',
        customer_state_validation: [
            { method: "isReq", params: { label: 'Customer State' } }
        ],
        customer_address: '', customer_address_error: '',
        customer_address_validation: [
            { method: "isReq", params: { label: 'Customer Address' } }
        ],
        Pan_no_firm: '', Pan_no_firm_error: '',
        Pan_no_firm_validation: [
            { method: "isPan", params: { label: 'PAN' } }
        ],
        name_as_per_pan: '', name_as_per_pan_error: '',
        name_as_per_pan_validation: [
            { method: "isReq", params: { label: 'Name as per PAN' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        date_of_birth_validation: [
            { method: "isReq", params: { label: 'Date of birth' } }
        ],
        busi_name: '', busi_name_error: '',
        busi_name_validation: [
            { method: "isReq", params: { label: 'Business Name' } }
        ],
        busi_add: '', busi_add_error: '',
        busi_add_validation: [
            { method: "isReq", params: { label: 'Business address' } }
        ],
        busi_state: '', busi_state_error: '',
        busi_state_validation: [
            { method: "isReq", params: { label: 'Business state' } }
        ],
        district: '', district_error: '',
        district_validation: [
            { method: "isReq", params: { label: 'Business District' } }
        ],
        pin_code: '', pin_code_error: '',
        pin_code_validation: [
            { method: "isReq", params: { label: 'PIN code' } }
        ],
        nature_of_concern: '', nature_of_concern_error: '',
        nature_of_concern_validation: [
            { method: "isReq", params: { label: 'Nature of concern' } }
        ],
        bank_acc_no: '', bank_acc_no_error: '',
        bank_acc_no_validation: [
            { method: "isReq", params: { label: 'Bank Account No' } }
        ],
        holder_name: '', holder_name_error: '',
        holder_name_validation: [
            { method: "isReq", params: { label: 'Account holder Name' } }
        ],
        bank_name: '', bank_name_error: '',
        bank_name_validation: [
            { method: "isReq", params: { label: 'Bank Name' } }
        ],
        branch_name: '', branch_name_error: '',
        branch_name_validation: [
            { method: "isReq", params: { label: 'Branch Name' } }
        ],
        ifsc: '', ifsc_error: '',
        ifsc_validation: [
            { method: "isReq", params: { label: 'Ifsc' } }
        ],
        cin: '', cin_error: '',
        cin_validation: [
            { method: "isReq", params: { label: 'CIN' } }
        ],
        name_of_app: '', name_of_app_error: '',
        name_of_app_validation: [
            { method: "isReq", params: { label: 'Applicant name' } }
        ],
        designation: '', designation_error: '',
        designation_validation: [
            { method: "isReq", params: { label: 'Designation' } }
        ],
        app_add: '', app_add_error: '',
        app_add_validation: [
            { method: "isReq", params: { label: 'Applicant address' } }
        ],
        app_mobile: '', app_mobile_error: '',
        app_mobile_validation: [
            { method: "isMobileNo", params: { label: 'Applicant Mobile NO' } }
        ],
        app_email: '', app_email_error: '',
        app_email_validation: [
            { method: "isEmail", params: { label: 'Applicant email' } }
        ],
        app_pan: '', app_pan_error: '',
        app_pan_validation: [
            { method: "isPan", params: { label: 'Applicant PAN' } }
        ],
        auth_name: '', auth_name_error: '',
        auth_name_validation: [
            { method: "isReq", params: { label: 'Auth Name' } }
        ],
        auth_pan: '', auth_pan_error: '',
        auth_pan_validation: [
            { method: "isPan", params: { label: 'Auth PAN' } }
        ],
        auth_dob: '', auth_dob_error: '',
        auth_dob_validation: [
            { method: "isReq", params: { label: 'Auth DOB' } }
        ],
        father_name: '', father_name_error: '',
        father_name_validation: [
            { method: "isReq", params: { label: 'Father Name' } }
        ],
        street_name: '', street_name_error: '',
        street_name_validation: [
            { method: "isReq", params: { label: 'Street Name' } }
        ],
        area_name: '', area_name_error: '',
        area_name_validation: [
            { method: "isReq", params: { label: 'Area Name' } }
        ],
        state: '', state_error: '',
        state_validation: [
            { method: "isReq", params: { label: 'State' } }
        ],
        mob_no: '', mob_no_error: '',
        mob_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile No' } }
        ],
        aadhar_no: '', aadhar_no_error: '',
        aadhar_no_validation: [
            { method: "isAadhar", params: { label: 'Aadhar' } }
        ],
        signatory: [], signatory_error: '',
        signatory_validation: [
            { method: "isReq", params: { label: 'Signatory ' } }
        ],
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const setDataToForm = (key: string, value: any, extraData: any = {}) => {
        setForm({ ...form, ...validateKey(form, key, value), ...extraData })
    }
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error)
            return setForm(validatedForm)
        return true
    }

    const doSubmit = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            console.log(body);

        }
    }

    const renderLeadForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Enter Customer Name"}
                        star={true}
                        placeholder={'eg xxxx, xxxx, xxxx'}
                        value={form.customer_name}
                        onChangeText={(text: string) => setDataToForm('customer_name', text)}
                        error={form.customer_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Company Name"}
                        star={false}
                        placeholder={'eg xxxx, xxxx, xxxx'}
                        value={form.company_name}
                        onChangeText={(text: string) => setDataToForm('company_name', text)}
                        error={form.company_name_error}
                        isEditable={isEditable}
                        keyboardType='email-address'
                    />
                    <TextInput
                        label={"Enter Customer Contact number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.contact_number}
                        onChangeText={(text: string) => setDataToForm('contact_number', text)}
                        error={form.contact_number_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"Enter Customer E-mail"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.customer_email}
                        onChangeText={(text: string) => setDataToForm('customer_email', text)}
                        error={form.customer_email_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"state"}
                        label={"Select State"}
                        star={true}
                        placeholder={'Pick State from options'}
                        options={states}
                        values={form.customer_state}
                        onAction={({ item, index }) => setDataToForm('customer_state', canPushNorPop([], item, 'name'))}
                        error={form.customer_state_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Customer Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.customer_address}
                        onChangeText={(text: string) => setDataToForm('customer_address', text)}
                        error={form.customer_address_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderRequirementsDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"PAN NO"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.Pan_no_firm}
                        onChangeText={(text: string) => setDataToForm('Pan_no_firm', text)}
                        error={form.Pan_no_firm_error}
                        isEditable={isEditable}
                        maxLength={10}
                    />
                    <TextInput
                        label={"Name as per PAN"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_as_per_pan}
                        onChangeText={(text: string) => setDataToForm('name_as_per_pan', text)}
                        error={form.name_as_per_pan_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.date_of_birth}
                        onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                        error={form.date_of_birth_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Entity/Business Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_name}
                        onChangeText={(text: string) => setDataToForm('busi_name', text)}
                        error={form.busi_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Entity/Business Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_add}
                        onChangeText={(text: string) => setDataToForm('busi_add', text)}
                        error={form.busi_add_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"State"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_state}
                        onChangeText={(text: string) => setDataToForm('busi_state', text)}
                        error={form.busi_state_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"District"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.district}
                        onChangeText={(text: string) => setDataToForm('district', text)}
                        error={form.district_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PIN Code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pin_code}
                        onChangeText={(text: string) => setDataToForm('pin_code', text)}
                        error={form.pin_code_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Nature of Concern"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.nature_of_concern}
                        onChangeText={(text: string) => setDataToForm('nature_of_concern', text)}
                        error={form.nature_of_concern_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Bank A/C NO"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.bank_acc_no}
                        onChangeText={(text: string) => setDataToForm('bank_acc_no', text)}
                        error={form.bank_acc_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"A/C Holder Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.holder_name}
                        onChangeText={(text: string) => setDataToForm('holder_name', text)}
                        error={form.holder_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Bank Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.bank_name}
                        onChangeText={(text: string) => setDataToForm('bank_name', text)}
                        error={form.bank_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Branch Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.branch_name}
                        onChangeText={(text: string) => setDataToForm('branch_name', text)}
                        error={form.branch_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"IFSC Code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.ifsc}
                        onChangeText={(text: string) => setDataToForm('ifsc', text)}
                        error={form.ifsc_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"CIN"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.cin}
                        onChangeText={(text: string) => setDataToForm('cin', text)}
                        error={form.cin_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    const renderApplicantDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Name of the Applicant"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_app}
                        onChangeText={(text: string) => setDataToForm('name_of_app', text)}
                        error={form.name_of_app_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Designation"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.designation}
                        onChangeText={(text: string) => setDataToForm('designation', text)}
                        error={form.designation_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Applicant Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_add}
                        onChangeText={(text: string) => setDataToForm('app_add', text)}
                        error={form.app_add_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Applicant Mobile"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_mobile}
                        onChangeText={(text: string) => setDataToForm('app_mobile', text)}
                        error={form.app_mobile_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"Applicant email"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_email}
                        onChangeText={(text: string) => setDataToForm('app_email', text)}
                        error={form.app_email_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PAN"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_pan}
                        onChangeText={(text: string) => setDataToForm('app_pan', text)}
                        error={form.app_pan_error}
                        isEditable={isEditable}
                        maxLength={10}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    const renderSignatoryDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Selection
                        _key={"signatory"}
                        label={"Select Authourised signatory type"}
                        star={true}
                        placeholder={'Pick Signatory from options'}
                        options={authourisedsignatory}
                        values={form.signatory}
                        onAction={({ item, index }) => setDataToForm('signatory', canPushNorPop([], item, 'name'))}
                        error={form.signatory_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name as per Pan"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.auth_name}
                        onChangeText={(text: string) => setDataToForm('auth_name', text)}
                        error={form.auth_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PAN"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.auth_pan}
                        onChangeText={(text: string) => setDataToForm('auth_pan', text)}
                        error={form.auth_pan_error}
                        isEditable={isEditable}
                        maxLength={10}
                    />
                    <TextInput
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg DD/MM/YYYY'}
                        value={form.auth_dob}
                        onChangeText={(text: string) => setDataToForm('auth_dob', text)}
                        error={form.auth_dob_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Father Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.father_name}
                        onChangeText={(text: string) => setDataToForm('father_name', text)}
                        error={form.father_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Road/Street/Lane/Post Office"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.street_name}
                        onChangeText={(text: string) => setDataToForm('street_name', text)}
                        error={form.street_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Area/Locality/Taluk"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.area_name}
                        onChangeText={(text: string) => setDataToForm('area_name', text)}
                        error={form.area_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"State/Union territory"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.state}
                        onChangeText={(text: string) => setDataToForm('state2', text)}
                        error={form.state_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Town/City/District"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.district}
                        onChangeText={(text: string) => setDataToForm('district', text)}
                        error={form.district_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Mobile No"}
                        star={true}
                        placeholder={'Flat/Door/Room/Block'}
                        value={form.mob_no}
                        onChangeText={(text: string) => setDataToForm('mob_no', text)}
                        error={form.mob_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"Aadhar Number"}
                        star={true}
                        placeholder={'e.g xxxx xxxx xxxx'}
                        value={form.aadhar_no}
                        onChangeText={(text: string) => setDataToForm('aadhar_no', text)}
                        error={form.aadhar_no_error}
                        isEditable={isEditable}
                        keyboardType='numeric'
                        maxLength={14}
                    />
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                DOCS To Be  Uploaded Are
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                1.Cancel Cheque

                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.PAN Card of the Firm
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                3.Aadhar Card(Applicant)
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                4.GST Certificate(If any)
                            </Text>
                        </View>
                    </View>
                    <Button style={{ backgroundColor: colors.GREEN, marginTop: 10 }}
                        label={'UPLOAD DOCUMENT'}
                    //onPress={doSubmit}
                    />
                    <Button style={{ marginTop: 20 }}
                        label={'SUBMIT'}
                        onPress={doSubmit}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
    const renderScene = ({ route }: any) => {
        switch (route.key) {
            case 'lead':
                return renderLeadForm()
            case 'requirements':
                return renderRequirementsDetailsForm()
            case 'applicant':
                return renderApplicantDetailsForm()
            case 'signatory':
                return renderSignatoryDetailsForm()
            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "IMPORT EXPORT LICENCE" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "requirements", title: "Requirements", index: 1 },
                    { key: "applicant", title: "ApplicantDetails", index: 2 },
                    { key: "signatory", title: "Signatory Details", index: 3 },
                ]}
                renderScene={renderScene}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    despbox: {
        height: 30,
        width: '100%',
        paddingHorizontal: ws(8),
        // backgroundColor: 'blue',
        flexDirection: 'row'
    },
    Container: {
        backgroundColor: colors.S_BG,
        borderRadius: hs(16),
        marginVertical: hs(8),
        marginHorizontal: ws(8),
        paddingVertical: hs(16),
        paddingHorizontal: ws(8)
    },
    Containertitle: {
        paddingTop: hs(10),
        paddingLeft: hs(10),
        marginBottom: hs(10),
        fontSize: hs(15),
        textAlign: 'center',
        color: colors.BLUE,
    },
    desptext: {
        width: '100%',
        color: colors.S_TEXT_COLOR,
        fontSize: 15,
    },
});