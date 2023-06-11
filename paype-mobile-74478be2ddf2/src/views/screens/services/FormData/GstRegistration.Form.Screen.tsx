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
import { accountType, businessActivity, businessType, composition, gender, premises, states } from '@models/static/adminSlice.static';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "name_as_in_pan", "pan_no", "email_address", "mobile_no",
        "business_name", "business_type", "date_of_commencement", "first_name", "middle_name", "last_name", "date_of_birth", "dir_mobile_no",
        "email_id", "aadhar_no", "door_no", "name_of_building", "street_name", "area_name", "state", "bank_acc_no",
        "ifsc_code", "product_no1", "product_no2", "product_no3", "product_no4", "product_no5", "businesstype", "composition", "gender",
        "accounttype", "premises", "businessactivity"
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
            { method: "isMobileNo", params: { label: 'Customer Number' } }
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
            { method: "isReq", params: { label: 'Customer address' } }
        ],
        name_as_in_pan: '', name_as_in_pan_error: '',
        name_as_in_pan_validation: [
            { method: "isReq", params: { label: 'Name' } }
        ],
        pan_no: '', pan_no_error: '',
        pan_no_validation: [
            { method: "isPan", params: { label: 'Pan' } }
        ],
        business_name: '', business_name_error: '',
        business_name_validation: [
            { method: "isReq", params: { label: 'Business Name' } }
        ],
        business_type: '', business_type_error: '',
        business_type_validation: [
            { method: "isReq", params: { label: 'Business Type' } }
        ],
        date_of_commencement: '', date_of_commencement_error: '',
        date_of_commencement_validation: [
            { method: "isReq", params: { label: 'Date Of Commencement' } }
        ],
        first_name: '', first_name_error: '',
        first_name_validation: [
            { method: "isReq", params: { label: 'First Name' } }
        ],
        middle_name: '', middle_name_error: '',
        middle_name_validation: [
            { method: "isReq", params: { label: 'Middle Name' } }
        ],
        last_name: '', last_name_error: '',
        last_name_validation: [
            { method: "isReq", params: { label: 'Last Name' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        date_of_birth_validation: [
            { method: "isReq", params: { label: 'Date of Birth' } }
        ],
        dir_mobile_no: '', dir_mobile_no_error: '',
        dir_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile Number' } }
        ],
        email_id: '', email_id_error: '',
        email_id_validation: [
            { method: "isEmail", params: { label: 'Email ID' } }
        ],
        aadhar_no: '', aadhar_no_error: '',
        aadhar_no_validation: [
            { method: "isAadhar", params: { label: 'Aadhar NO' } }
        ],
        door_no: '', door_no_error: '',
        door_no_validation: [
            { method: "isReq", params: { label: 'Door No' } }
        ],
        name_of_building: '', name_of_building_error: '',
        name_of_building_validation: [
            { method: "isReq", params: { label: 'Building Name' } }
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
        bank_acc_no: '', bank_acc_no_error: '',
        bank_acc_no_validation: [
            { method: "isReq", params: { label: 'Bank Account NO' } }
        ],
        ifsc_code: '', ifsc_code_error: '',
        ifsc_code_validation: [
            { method: "isReq", params: { label: 'IFSC code' } }
        ],
        product_no1: '', product_no1_error: '',
        product_no1_validation: [
            { method: "isReq", params: { label: 'Product NO1' } }
        ],
        product_no2: '', product_no2_error: '',
        product_no2_validation: [
            { method: "isReq", params: { label: 'product No2' } }
        ],
        product_no3: '', product_no3_error: '',
        product_no3_validation: [
            { method: "isReq", params: { label: 'Product No3' } }
        ],
        product_no4: '', product_no4_error: '',
        product_no4_validation: [
            { method: "isReq", params: { label: 'Product No4' } }
        ],
        product_no5: '', product_no5_error: '',
        product_no5_validation: [
            { method: "isReq", params: { label: 'Product NO5' } }
        ],
        businesstype: [], businesstype_error: '',
        businesstype_validation: [
            { method: "isReq", params: { label: 'Business type' } }
        ],
        composition: [], composition_error: '',
        composition_validation: [
            { method: "isReq", params: { label: 'composition ' } }
        ],
        gender: [], gender_error: '',
        gender_validation: [
            { method: "isReq", params: { label: 'gender ' } }
        ],
        accounttype: [], accounttype_error: '',
        accounttype_validation: [
            { method: "isReq", params: { label: 'accounttype ' } }
        ],
        premises: [], premises_error: '',
        premises_validation: [
            { method: "isReq", params: { label: 'premises ' } }
        ],
        businessactivity: [], businessactivity_error: '',
        businessactivity_validation: [
            { method: "isReq", params: { label: 'Business Activity ' } }
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

    const renderServiceForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>

                    <TextInput
                        label={"Name as in PAN"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_as_in_pan}
                        onChangeText={(text: string) => setDataToForm('name_as_in_pan', text)}
                        error={form.name_as_in_pan_error}
                        isEditable={isEditable}
                        autoCapitalize='words'
                    />
                    <TextInput
                        label={"Enter PAN No"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pan_no}
                        onChangeText={(text: string) => setDataToForm('pan_no', text)}
                        error={form.pan_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Business Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.business_name}
                        onChangeText={(text: string) => setDataToForm('business_name', text)}
                        error={form.business_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Business Type"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.business_type}
                        onChangeText={(text: string) => setDataToForm('business_type', text)}
                        error={form.business_type_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"businesstype"}
                        label={"Select businesstype type"}
                        star={true}
                        placeholder={'Pick businesstype type from options'}
                        options={businessType}
                        values={form.businesstype}
                        onAction={({ item, index }) => setDataToForm('businesstype', canPushNorPop([], item, 'name'))}
                        error={form.businesstype_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"composition"}
                        label={"Select composition type"}
                        star={true}
                        placeholder={'Pick composition type from options'}
                        options={composition}
                        values={form.composition}
                        onAction={({ item, index }) => setDataToForm('composition', canPushNorPop([], item, 'name'))}
                        error={form.composition_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Date of Commencement of Business"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.date_of_commencement}
                        onChangeText={(text: string) => setDataToForm('date_of_commencement', text)}
                        error={form.date_of_commencement_error}
                        isEditable={isEditable}
                    />

                    <TextInput
                        label={"First Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.first_name}
                        onChangeText={(text: string) => setDataToForm('first_name', text)}
                        error={form.first_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Middle Name"}
                        star={false}
                        placeholder={'eg xxxxxx'}
                        value={form.middle_name}
                        onChangeText={(text: string) => setDataToForm('middle_name', text)}
                        error={form.middle_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Last Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.last_name}
                        onChangeText={(text: string) => setDataToForm('last_name', text)}
                        error={form.last_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg DD/MM/YYYY'}
                        value={form.date_of_birth}
                        onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                        error={form.date_of_birth_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"gender"}
                        label={"Select gender type"}
                        star={true}
                        placeholder={'Pick gender type from options'}
                        options={gender}
                        values={form.gender}
                        onAction={({ item, index }) => setDataToForm('gender', canPushNorPop([], item, 'name'))}
                        error={form.gender_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Mobile Number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.dir_mobile_no}
                        onChangeText={(text: string) => setDataToForm('dir_mobile_no', text)}
                        error={form.dir_mobile_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"E-mail ID"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.email_id}
                        onChangeText={(text: string) => setDataToForm('email_id', text)}
                        error={form.email_id_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Aadhar Number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.aadhar_no}
                        onChangeText={(text: string) => setDataToForm('aadhar_no', text)}
                        error={form.aadhar_no_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderPrincipleForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>

                    <TextInput
                        label={"Flat/Room/Door/Block"}
                        star={true}
                        placeholder={'eg xxxx'}
                        value={form.door_no}
                        onChangeText={(text: string) => setDataToForm('door_no', text)}
                        error={form.door_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name Of Premises/Building"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_building}
                        onChangeText={(text: string) => setDataToForm('name_of_building', text)}
                        error={form.name_of_building_error}
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
                        onChangeText={(text: string) => setDataToForm('state', text)}
                        error={form.state_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Bank Account Firm Details"}
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
                    <Selection
                        _key={"accounttype"}
                        label={"Select Account type"}
                        star={true}
                        placeholder={'Pick Account type from options'}
                        options={accountType}
                        values={form.accounttype}
                        onAction={({ item, index }) => setDataToForm('accounttype', canPushNorPop([], item, 'name'))}
                        error={form.accounttype_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderProductInfoForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>

                    <TextInput
                        label={"Enter the Products of Company"}
                        star={true}
                        placeholder={'eg product NO1'}
                        value={form.product_no1}
                        onChangeText={(text: string) => setDataToForm('product_no1', text)}
                        error={form.product_no1_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"product NO2"}
                        star={false}
                        placeholder={'eg xxxxxx'}
                        value={form.product_no2}
                        onChangeText={(text: string) => setDataToForm('product_no2', text)}
                        error={form.product_no2_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Product No 3"}
                        star={false}
                        placeholder={'eg xxxxxx'}
                        value={form.product_no3}
                        onChangeText={(text: string) => setDataToForm('product_no3', text)}
                        error={form.product_no3_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Product No 4"}
                        star={false}
                        placeholder={'eg xxxxxx'}
                        value={form.product_no4}
                        onChangeText={(text: string) => setDataToForm('product_no4', text)}
                        error={form.product_no4_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Product No 5"}
                        star={false}
                        placeholder={'eg xxxxxx'}
                        value={form.product_no5}
                        onChangeText={(text: string) => setDataToForm('product_no5', text)}
                        error={form.product_no5_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"premises"}
                        label={"Select premises type"}
                        star={true}
                        placeholder={'Pick premises type from options'}
                        options={premises}
                        values={form.premises}
                        onAction={({ item, index }) => setDataToForm('premises', canPushNorPop([], item, 'name'))}
                        error={form.premises_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"businessactivity"}
                        label={"Select Business Activity type"}
                        star={true}
                        placeholder={'Pick Business Activity type from options'}
                        options={businessActivity}
                        values={form.businessactivity}
                        onAction={({ item, index }) => setDataToForm('businessactivity', canPushNorPop([], item, 'name'))}
                        error={form.businessactivity_error}
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
                                1. Electric Bill
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2. PAN of All Directors/Proprietor/Partners
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                3.  Aadhar of All Directors/Proprietor/Partners
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                4. Rent Agreement (If Any)
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                5. Photos Of All Directors/Proprietors/Partners
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                6.Front Page of Passbook/Account Statement
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                7. Certificate of Incorporation
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
            case 'service':
                return renderServiceForm()
            case 'principle':
                return renderPrincipleForm()
            case 'product-info':
                return renderProductInfoForm()
            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "GST REGISTRATION" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "service", title: "Service", index: 1 },
                    { key: "principle", title: "Principle", index: 2 },
                    { key: "product-info", title: "Product Info", index: 3 }
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