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
import design from '@config/design.config';
import colors from '@config/colors.config';
import { employmentType, states } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name", "contact_number", "customer_email", "customer_state", "customer_address", "applicant_name",
        "father_name", "date_of_birth", "pan_no", "aadhar_no", "applicant_add", "pin_code", "app_email_id", "app_mobile_no",
        "financial_year", "bank_acc_no", "ifsc_code", "busi_turnover", "income_from_business", "nature_of_business", "any_other_income",
        "rental_income", "interest_savings_bank", "lic", "health_insurance", "employment_type"
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
        applicant_name: '', applicant_name_error: '',
        applicant_name_validation: [
            { method: "isReq", params: { label: 'Applicant Name' } }
        ],
        father_name: '', father_name_error: '',
        father_name_validation: [
            { method: "isReq", params: { label: 'Father Name' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        date_of_birth_validation: [
            { method: "isReq", params: { label: 'Date of Birth' } }
        ],
        pan_no: '', pan_no_error: '',
        pan_no_validation: [
            { method: "isPan", params: { label: 'PAN No' } }
        ],
        aadhar_no: '', aadhar_no_error: '',
        aadhar_no_validation: [
            { method: "isAadhar", params: { label: 'Aadhar No' } }
        ],
        applicant_add: '', applicant_add_error: '',
        applicant_add_validation: [
            { method: "isReq", params: { label: 'Applicant Address' } }
        ],
        pin_code: '', pin_code_error: '',
        pin_code_validation: [
            { method: "isReq", params: { label: 'PIN code' } }
        ],
        app_email_id: '', app_email_id_error: '',
        app_email_id_validation: [
            { method: "isEmail", params: { label: 'Applicant email id' } }
        ],
        app_mobile_no: '', app_mobile_no_error: '',
        app_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Applicant Mobile' } }
        ],
        financial_year: '', financial_year_error: '',
        financial_year_validation: [
            { method: "isReq", params: { label: 'Financial Year' } }
        ],
        bank_acc_no: '', bank_acc_no_error: '',
        bank_acc_no_validation: [
            { method: "isReq", params: { label: 'Bank Account NO' } }
        ],
        ifsc_code: '', ifsc_code_error: '',
        ifsc_code_validation: [
            { method: "isReq", params: { label: 'IFSC code' } }
        ],
        busi_turnover: '', busi_turnover_error: '',
        busi_turnover_validation: [
            { method: "isReq", params: { label: 'Business Turnover' } }
        ],
        income_from_business: '', income_from_business_error: '',
        income_from_business_validation: [
            { method: "isReq", params: { label: 'Income from Business' } }
        ],
        nature_of_business: '', nature_of_business_error: '',
        nature_of_business_validation: [
            { method: "isReq", params: { label: 'Nature of Business' } }
        ],
        any_other_income: '', any_other_income_error: '',
        any_other_income_validation: [
            { method: "isReq", params: { label: 'Any other income' } }
        ],
        rental_income: '', rental_income_error: '',
        rental_income_validation: [
            { method: "isReq", params: { label: 'rental income' } }
        ],
        interest_savings_bank: '', interest_savings_bank_error: '',
        interest_savings_bank_validation: [
            { method: "isReq", params: { label: 'Interest on savings bank' } }
        ],
        lic: '', lic_error: '',
        lic_validation: [
            { method: "isReq", params: { label: 'LIC' } }
        ],
        health_insurance: '', health_insurance_error: '',
        health_insurance_validation: [
            { method: "isReq", params: { label: 'Health Insurance' } }
        ],
        employment_type: [], employment_type_error: '',
        employment_type_validation: [
            { method: "isReq", params: { label: 'Employment type' } }
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

    const renderApplicantDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Applicant Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.applicant_name}
                        onChangeText={(text: string) => setDataToForm('applicant_name', text)}
                        error={form.applicant_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Father's Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.father_name}
                        onChangeText={(text: string) => setDataToForm('father_name', text)}
                        error={form.father_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg DD/MM//YYYY'}
                        value={form.date_of_birth}
                        onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                        error={form.date_of_birth_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Pan No"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pan_no}
                        onChangeText={(text: string) => setDataToForm('pan_no', text)}
                        error={form.pan_no_error}
                        isEditable={isEditable}
                        maxLength={10}
                    />
                    <TextInput
                        label={"Aadhar No"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.aadhar_no}
                        onChangeText={(text: string) => setDataToForm('aadhar_no', text)}
                        error={form.aadhar_no_error}
                        isEditable={isEditable}
                        keyboardType='numeric'
                        maxLength={14}
                    />
                    <TextInput
                        label={"Applicant Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.applicant_add}
                        onChangeText={(text: string) => setDataToForm('applicant_add', text)}
                        error={form.applicant_add_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PIN code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pin_code}
                        onChangeText={(text: string) => setDataToForm('pin_code', text)}
                        error={form.pin_code_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Applicant Email id"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_email_id}
                        onChangeText={(text: string) => setDataToForm('app_email_id', text)}
                        error={form.app_email_id_error}
                        isEditable={isEditable}

                    />
                    <TextInput
                        label={"Applicant Mobile No"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.app_mobile_no}
                        onChangeText={(text: string) => setDataToForm('app_mobile_no', text)}
                        error={form.app_mobile_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const rendeOtherDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Financial Year"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.financial_year}
                        onChangeText={(text: string) => setDataToForm('financial_year', text)}
                        error={form.financial_year_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Bank Account No"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.bank_acc_no}
                        onChangeText={(text: string) => setDataToForm('bank_acc_no', text)}
                        error={form.bank_acc_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"IFSC code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.ifsc_code}
                        onChangeText={(text: string) => setDataToForm('ifsc_code', text)}
                        error={form.ifsc_code_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Business Turnover(If Self Employed)"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_turnover}
                        onChangeText={(text: string) => setDataToForm('busi_turnover', text)}
                        error={form.busi_turnover_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Income from Business (Profit)"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.income_from_business}
                        onChangeText={(text: string) => setDataToForm('income_from_business', text)}
                        error={form.income_from_business_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Nature of Business"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.nature_of_business}
                        onChangeText={(text: string) => setDataToForm('nature_of_business', text)}
                        error={form.nature_of_business_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Any other income (if any)"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.any_other_income}
                        onChangeText={(text: string) => setDataToForm('any_other_income', text)}
                        error={form.any_other_income_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Rental Income from property"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.rental_income}
                        onChangeText={(text: string) => setDataToForm('rental_income', text)}
                        error={form.rental_income_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Interest on Savings bank A/C"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.interest_savings_bank}
                        onChangeText={(text: string) => setDataToForm('interest_savings_bank', text)}
                        error={form.interest_savings_bank_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"LIC and Tution Fees Details"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.lic}
                        onChangeText={(text: string) => setDataToForm('lic', text)}
                        error={form.lic_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Details of Health insurance premium"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.health_insurance}
                        onChangeText={(text: string) => setDataToForm('health_insurance', text)}
                        error={form.health_insurance_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"employmentType"}
                        label={"Select Employment type"}
                        star={true}
                        placeholder={'Pick Employment type from options'}
                        options={employmentType}
                        values={form.employment_type}
                        onAction={({ item, index }) => setDataToForm('employment_type', canPushNorPop([], item, 'name'))}
                        error={form.employment_type_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <View style={styles.Container}>
                        <View>
                            <Text style={styles.Containertitle}>
                                DOCS To Be  Uploaded Are
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                1.Form 16
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
            case 'applicant':
                return renderApplicantDetailsForm()
            case 'other':
                return rendeOtherDetailsForm()

            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "ITR FILING BUSINESS" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "applicant", title: "Applicant Details", index: 1 },
                    { key: "other", title: "Other Details", index: 2 },

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