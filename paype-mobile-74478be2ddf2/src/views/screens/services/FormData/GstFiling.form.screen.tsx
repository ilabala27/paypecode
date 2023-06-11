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
import { gstPercent, selectGSTR, states, taxPayerType } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';


export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "name_of_taxpayer", "gstin_of_taxpayer", "name_of_contact_person",
        "taxpayer_mobile_no", "taxpayer_emailid", "tax_filing_period", "turnover", "taxpayer_status", "gstr_userid", "gstr_portal_password", "sales_tax_value",
        "purchase_tax_value", "nilrated_exempted_supply", "tax_Payer_Type", "gstr", "igst_percent", "cgst_percent", "sgst_percent"
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
        name_of_taxpayer: '', name_of_taxpayer_error: '',
        name_of_taxpayer_validation: [
            { method: "isReq", params: { label: 'Name of Taxpayer' } }
        ],
        gstin_of_taxpayer: '', gstin_of_taxpayer_error: '',
        gstin_of_taxpayer_validation: [
            { method: "isGst", params: { label: 'GST of TaxPayer' } }
        ],
        name_of_contact_person: '', name_of_contact_person_error: '',
        name_of_contact_person_validation: [
            { method: "isReq", params: { label: 'Name of contact person' } }
        ],
        taxpayer_mobile_no: '', taxpayer_mobile_no_error: '',
        taxpayer_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Taxpayer Mobile no' } }
        ],
        taxpayer_emailid: '', taxpayer_emailid_error: '',
        taxpayer_emailid_validation: [
            { method: "isEmail-", params: { label: 'Taxpayer Email Id' } }
        ],
        tax_filing_period: '', tax_filing_period_error: '',
        tax_filing_period_validation: [
            { method: "isReq", params: { label: 'Taxfiling Period' } }
        ],
        turnover: '', turnover_error: '',
        turnover_validation: [
            { method: "isReq", params: { label: 'Turnover' } }
        ],
        taxpayer_status: '', taxpayer_status_error: '',
        taxpayer_status_validation: [
            { method: "isReq", params: { label: 'Taxpayer Status' } }
        ],
        gstr_userid: '', gstr_userid_error: '',
        gstr_userid_validation: [
            { method: "isReq", params: { label: 'GSTR user id' } }
        ],
        gstr_portal_password: '', gstr_portal_password_error: '',
        gstr_portal_password_validation: [
            { method: "isReq", params: { label: 'GSTR portal password' } }
        ],
        sales_tax_value: '', sales_tax_value_error: '',
        sales_tax_value_validation: [
            { method: "isReq", params: { label: 'Sales tax Value' } }
        ],
        purchase_tax_value: '', purchase_tax_value_error: '',
        purchase_tax_value_validation: [
            { method: "isReq", params: { label: 'Purchase Tax Value' } }
        ],
        nilrated_exempted_supply: '', nilrated_exempted_supply_error: '',
        nilrated_exempted_supply_validation: [
            { method: "isReq", params: { label: 'Nilrated Exempted' } }
        ],
        tax_Payer_Type: [], tax_Payer_Type_error: '',
        tax_Payer_Type_validation: [
            { method: "isReq", params: { label: 'Taxpayer type' } }
        ],
        gstr: [], gstr_error: '',
        gstr_validation: [
            { method: "isReq", params: { label: 'GSTR ' } }
        ],
        igst_percent: [], igst_percent_error: '',
        igst_percent_validation: [
            { method: "isReq", params: { label: 'IGST  ' } }
        ],
        cgst_percent: [], cgst_percent_error: '',
        cgst_percent_validation: [
            { method: "isReq", params: { label: 'CGST  ' } }
        ],
        sgst_percent: [], sgst_percent_error: '',
        sgst_percent_validation: [
            { method: "isReq", params: { label: 'SGST  ' } }
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

    const renderTaxpayerForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Enter Customer Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.customer_address}
                        onChangeText={(text: string) => setDataToForm('customer_address', text)}
                        error={form.customer_address_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Name of the Tax Payer"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_taxpayer}
                        onChangeText={(text: string) => setDataToForm('name_of_taxpayer', text)}
                        error={form.name_of_taxpayer_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter GSTIN of the Tax Payer"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.gstin_of_taxpayer}
                        onChangeText={(text: string) => setDataToForm('gstin_of_taxpayer', text)}
                        error={form.gstin_of_taxpayer_error}
                        isEditable={isEditable}
                        maxLength={15}
                    />
                    <TextInput
                        label={"Enter Name of the Contact Person "}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_contact_person}
                        onChangeText={(text: string) => setDataToForm('name_of_contact_person', text)}
                        error={form.name_of_contact_person_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Tax Payer Mobile NO"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.taxpayer_mobile_no}
                        onChangeText={(text: string) => setDataToForm('taxpayer_mobile_no', text)}
                        error={form.taxpayer_mobile_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"Enter Tax Payer E-mail Id"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.taxpayer_emailid}
                        onChangeText={(text: string) => setDataToForm('taxpayer_emailid', text)}
                        error={form.taxpayer_emailid_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"taxpayertype"}
                        label={"Select TaxPayer type"}
                        star={true}
                        placeholder={'Pick Taxpayer type from options'}
                        options={taxPayerType}
                        values={form.tax_Payer_Type}
                        onAction={({ item, index }) => setDataToForm('tax_Payer_Type', canPushNorPop([], item, 'name'))}
                        error={form.tax_Payer_Type_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Tax Filing Period"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.tax_filing_period}
                        onChangeText={(text: string) => setDataToForm('tax_filing_period', text)}
                        error={form.tax_filing_period_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderGstForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Selection
                        _key={"gstrtype"}
                        label={"Select GSTR type"}
                        star={true}
                        placeholder={'Pick GSTR type from options'}
                        options={selectGSTR}
                        values={form.gstr}
                        onAction={({ item, index }) => setDataToForm('gstr', canPushNorPop([], item, 'name'))}
                        error={form.gstr_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"TurnOver"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.turnover}
                        onChangeText={(text: string) => setDataToForm('turnover', text)}
                        error={form.turnover_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Tax Payer Status"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.taxpayer_status}
                        onChangeText={(text: string) => setDataToForm('taxpayer_status', text)}
                        error={form.taxpayer_status_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"GSTR User Id"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.gstr_userid}
                        onChangeText={(text: string) => setDataToForm('gstr_userid', text)}
                        error={form.gstr_userid_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"GSTR Portal Password"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.gstr_portal_password}
                        onChangeText={(text: string) => setDataToForm('gstr_portal_password', text)}
                        error={form.gstr_portal_password_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Sales Tax Value"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.sales_tax_value}
                        onChangeText={(text: string) => setDataToForm('sales_tax_value', text)}
                        error={form.sales_tax_value_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"igsttype"}
                        label={"Select IGST type"}
                        star={true}
                        placeholder={'Pick IGST type from options'}
                        options={gstPercent}
                        values={form.igst_percent}
                        onAction={({ item, index }) => setDataToForm('igst_percent', canPushNorPop([], item, 'name'))}
                        error={form.igst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"cgsttype"}
                        label={"Select CGST type"}
                        star={true}
                        placeholder={'Pick CGST type from options'}
                        options={gstPercent}
                        values={form.cgst_percent}
                        onAction={({ item, index }) => setDataToForm('cgst_percent', canPushNorPop([], item, 'name'))}
                        error={form.cgst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"sgsttype"}
                        label={"Select SGST type"}
                        star={true}
                        placeholder={'Pick CGST type from options'}
                        options={gstPercent}
                        values={form.sgst_percent}
                        onAction={({ item, index }) => setDataToForm('sgst_percent', canPushNorPop([], item, 'name'))}
                        error={form.sgst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Purchase Tax Value"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.purchase_tax_value}
                        onChangeText={(text: string) => setDataToForm('purchase_tax_value', text)}
                        error={form.purchase_tax_value_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"igsttype"}
                        label={"Select IGST type"}
                        star={true}
                        placeholder={'Pick IGST type from options'}
                        options={gstPercent}
                        values={form.igst_percent}
                        onAction={({ item, index }) => setDataToForm('igst_percent', canPushNorPop([], item, 'name'))}
                        error={form.igst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"cgsttype"}
                        label={"Select CGST type"}
                        star={true}
                        placeholder={'Pick CGST type from options'}
                        options={gstPercent}
                        values={form.cgst_percent}
                        onAction={({ item, index }) => setDataToForm('cgst_percent', canPushNorPop([], item, 'name'))}
                        error={form.cgst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"sgsttype"}
                        label={"Select SGST type"}
                        star={true}
                        placeholder={'Pick CGST type from options'}
                        options={gstPercent}
                        values={form.sgst_percent}
                        onAction={({ item, index }) => setDataToForm('sgst_percent', canPushNorPop([], item, 'name'))}
                        error={form.sgst_percent_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"NILRATED/EXEMPTED SUPPLY"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.nilrated_exempted_supply}
                        onChangeText={(text: string) => setDataToForm('nilrated_exempted_supply', text)}
                        error={form.nilrated_exempted_supply_error}
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
                                1.Sale Register/Invoice
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.Purchase Register/Invoice
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
            case 'taxpayer':
                return renderTaxpayerForm()
            case 'gst':
                return renderGstForm()

            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "GST FILING" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "taxpayer", title: "TaxPayer", index: 1 },
                    { key: "gst", title: "Gst Details", index: 2 },

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