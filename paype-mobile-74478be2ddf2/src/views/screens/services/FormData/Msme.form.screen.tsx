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
import { gender, majorActivityunit, socialcategory, yrn, typeoforganisation, states } from '@models/static/adminSlice.static';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name", "contact_number", "customer_email", "customer_state", "customer_address", "aadhar", "name_of_entrepreneur",
        "name_of_enterprise", "pan_number", "busi_door_no", "busi_name__Of_building", "busi_street_name", "busi_area_name", "busi_state",
        "busi_district", "official_door_no", "official_building_name", "official_street_name", "official_area_name", "official_state",
        "official_district", "official_mobile_no", "official_email", "bank_acc_no", "ifsc_code", "details_of_goods", "details_of_services",
        "investment_in_business", "activity", "social_category", "gender", "physically_handicapped", "type_of_organisation"
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
        aadhar: '', aadhar_error: '',
        aadhar_validation: [
            { method: "isAadhar", params: { label: 'Aadhar' } }
        ],
        name_of_entrepreneur: '', name_of_entrepreneur_error: '',
        name_of_entrepreneur_validation: [
            { method: "isReq", params: { label: 'NAme of the entrepreneur' } }
        ],
        name_of_enterprise: '', name_of_enterprise_error: '',
        name_of_enterprise_validation: [
            { method: "isReq", params: { label: 'Name of the enterprise' } }
        ],
        pan_number: '', pan_number_error: '',
        pan_number_validation: [
            { method: "isPan", params: { label: 'PAN Number' } }
        ],
        busi_door_no: '', busi_door_no_error: '',
        busi_door_no_validation: [
            { method: "isReq", params: { label: 'Door Number' } }
        ],
        busi_name__Of_building: '', busi_name__Of_building_error: '',
        busi_name__Of_building_validation: [
            { method: "isReq", params: { label: 'Name of the Building' } }
        ],
        busi_street_name: '', busi_street_name_error: '',
        busi_street_name_validation: [
            { method: "isReq", params: { label: 'Street Name' } }
        ],
        busi_area_name: '', busi_area_name_error: '',
        busi_area_name_validation: [
            { method: "isReq", params: { label: 'Area Name' } }
        ],
        busi_state: '', busi_state_error: '',
        busi_state_validation: [
            { method: "isReq", params: { label: 'State' } }
        ],
        busi_district: '', busi_district_error: '',
        busi_district_validation: [
            { method: "isReq", params: { label: 'District' } }
        ],
        official_door_no: '', official_door_no_error: '',
        official_door_no_validation: [
            { method: "isReq", params: { label: 'Door NO' } }
        ],
        official_building_name: '', official_building_name_error: '',
        official_building_name_validation: [
            { method: "isReq", params: { label: 'Building Name' } }
        ],
        official_street_name: '', official_street_name_error: '',
        official_street_name_validation: [
            { method: "isReq", params: { label: 'Street Name' } }
        ],
        official_area_name: '', official_area_name_error: '',
        official_area_name_validation: [
            { method: "isReq", params: { label: 'Area Name' } }
        ],
        official_state: '', official_state_error: '',
        official_state_validation: [
            { method: "isReq", params: { label: 'State' } }
        ],
        official_district: '', official_district_error: '',
        official_district_validation: [
            { method: "isReq", params: { label: 'District' } }
        ],
        official_mobile_no: '', official_mobile_no_error: '',
        official_mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile' } }
        ],
        official_email: '', official_email_error: '',
        official_email_validation: [
            { method: "isEmail", params: { label: 'email' } }
        ],
        bank_acc_no: '', bank_acc_no_error: '',
        bank_acc_no_validation: [
            { method: "isReq", params: { label: 'Account NO' } }
        ],
        ifsc_code: '', ifsc_code_error: '',
        ifsc_code_validation: [
            { method: "isReq", params: { label: 'IFSC Code' } }
        ],
        activity: [], activity_error: '',
        activity_validation: [
            { method: "isReq", params: { label: 'IFSC Code' } }
        ],
        details_of_goods: '', details_of_goods_error: '',
        details_of_goods_validation: [
            { method: "isReq", params: { label: 'Details of Goods' } }
        ],
        details_of_services: '', details_of_services_error: '',
        details_of_services_validation: [
            { method: "isReq", params: { label: 'Details of Services' } }
        ],
        investment_in_business: '', investment_in_business_error: '',
        investment_in_business_validation: [
            { method: "isReq", params: { label: 'Investment In business' } }
        ],
        social_category: [], social_category_error: '',
        social_category_validation: [
            { method: "isReq", params: { label: 'Social Category' } }
        ],
        gender: [], gender_error: '',
        gender_validation: [
            { method: "isReq", params: { label: 'Gender' } }
        ],
        physically_handicapped: [], physically_handicapped_error: '',
        physically_handicapped_validation: [
            { method: "isReq", params: { label: 'Physically Challenged' } }
        ],
        type_of_organisation: [], type_of_organisation_error: '',
        type_of_organisation_validation: [
            { method: "isReq", params: { label: 'Type of organisation' } }
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
            console.log(body)
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

    const renderEntrepreneurDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Aadhar Number"}
                        star={true}
                        placeholder={'eg xxxx xxxxx xxxx'}
                        value={form.aadhar}
                        onChangeText={(text: string) => setDataToForm('aadhar', text)}
                        error={form.aadhar_error}
                        isEditable={isEditable}
                        keyboardType='numeric'
                        maxLength={14}
                    />
                    <TextInput
                        label={"Name of the Entrepreneur"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_entrepreneur}
                        onChangeText={(text: string) => setDataToForm('name_of_entrepreneur', text)}
                        error={form.name_of_entrepreneur_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"socialcategory"}
                        label={"Select Social Category type"}
                        star={true}
                        placeholder={'Pick Social Category type from options'}
                        options={socialcategory}
                        values={form.social_category}
                        onAction={({ item, index }) => setDataToForm('social_category', canPushNorPop([], item, 'name'))}
                        error={form.social_category_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
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
                    <Selection
                        _key={"physicallyhandicapped"}
                        label={"Select Physically Challenged type"}
                        star={true}
                        placeholder={'Pick Physically Challenged type from options'}
                        options={yrn}
                        values={form.physically_handicapped}
                        onAction={({ item, index }) => setDataToForm('physically_handicapped', canPushNorPop([], item, 'name'))}
                        error={form.physically_handicapped_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name of the Enterprise/Business"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_enterprise}
                        onChangeText={(text: string) => setDataToForm('name_of_enterprise', text)}
                        error={form.name_of_enterprise_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"typeoforganisation"}
                        label={"Select Organisation type"}
                        star={true}
                        placeholder={'Pick Organisation type from options'}
                        options={typeoforganisation}
                        values={form.type_of_organisation}
                        onAction={({ item, index }) => setDataToForm('type_of_organisation', canPushNorPop([], item, 'name'))}
                        error={form.type_of_organisation_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PAN number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pan_number}
                        onChangeText={(text: string) => setDataToForm('pan_number', text)}
                        error={form.pan_number_error}
                        isEditable={isEditable}
                        maxLength={10}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderPrincipleDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Text style={{ color: colors.P_TEXT_COLOR, fontSize: 18 }}>Principal Place Of Business</Text>
                    <TextInput
                        label={"Flat/Door/Room/Block"}
                        star={true}
                        placeholder={'Flat/Door/Room/Block'}
                        value={form.busi_door_no}
                        onChangeText={(text: string) => setDataToForm('busi_door_no', text)}
                        error={form.busi_door_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name Of Premises/Building"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_name__Of_building}
                        onChangeText={(text: string) => setDataToForm('busi_name__Of_building', text)}
                        error={form.busi_name__Of_building_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Road/Street/Lane/Post Office"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_street_name}
                        onChangeText={(text: string) => setDataToForm('busi_street_name', text)}
                        error={form.busi_street_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Area/Locality/Taluk"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_area_name}
                        onChangeText={(text: string) => setDataToForm('busi_area_name', text)}
                        error={form.busi_area_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"State/Union territory"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_state}
                        onChangeText={(text: string) => setDataToForm('busi_state', text)}
                        error={form.busi_state_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Town/City/District"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_district}
                        onChangeText={(text: string) => setDataToForm('busi_district', text)}
                        error={form.busi_district_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderAddressDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Text style={{ color: colors.P_TEXT_COLOR, fontSize: 18 }}>OFFICIAL ADDRESS</Text>
                    <TextInput
                        label={"Flat/Door/Room/Block"}
                        star={true}
                        placeholder={'Flat/Door/Room/Block'}
                        value={form.official_door_no}
                        onChangeText={(text: string) => setDataToForm('official_door_no', text)}
                        error={form.official_door_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name Of Premises/Building"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_building_name}
                        onChangeText={(text: string) => setDataToForm('official_building_name', text)}
                        error={form.official_building_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Road/Street/Lane/Post Office"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_street_name}
                        onChangeText={(text: string) => setDataToForm('official_street_name', text)}
                        error={form.official_street_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Area/Locality/Taluk"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_area_name}
                        onChangeText={(text: string) => setDataToForm('official_area_name', text)}
                        error={form.official_area_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"State/Union territory"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_state}
                        onChangeText={(text: string) => setDataToForm('official_state', text)}
                        error={form.official_state_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Town/City/District"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_district}
                        onChangeText={(text: string) => setDataToForm('official_district', text)}
                        error={form.official_district_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Mobile Number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_mobile_no}
                        onChangeText={(text: string) => setDataToForm('official_mobile_no', text)}
                        error={form.official_mobile_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                    />
                    <TextInput
                        label={"Email Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.official_email}
                        onChangeText={(text: string) => setDataToForm('official_email', text)}
                        error={form.official_email_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderOtherDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Text style={{ color: colors.P_TEXT_COLOR, fontSize: 18 }}>Bank Details</Text>
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
                        label={"IFSC Code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.ifsc_code}
                        onChangeText={(text: string) => setDataToForm('ifsc_code', text)}
                        error={form.ifsc_code_error}
                        isEditable={isEditable}
                    />
                    <Text style={{ color: colors.P_TEXT_COLOR, fontSize: 18 }}>Others</Text>
                    <Selection
                        _key={"activity"}
                        label={"Select activity type"}
                        star={true}
                        placeholder={'Pick activity type from options'}
                        options={majorActivityunit}
                        values={form.activity}
                        onAction={({ item, index }) => setDataToForm('activity', canPushNorPop([], item, 'name'))}
                        error={form.activity_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Details Of the Goods & Commodities Supplied By the Business"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.details_of_goods}
                        onChangeText={(text: string) => setDataToForm('details_of_goods', text)}
                        error={form.details_of_goods_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Details Of Services"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.details_of_services}
                        onChangeText={(text: string) => setDataToForm('details_of_services', text)}
                        error={form.details_of_services_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Investment In Business"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.investment_in_business}
                        onChangeText={(text: string) => setDataToForm('investment_in_business', text)}
                        error={form.investment_in_business_error}
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
                                1.PAN Card of the Firm/Proprietor
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
            case 'entrepreneur':
                return renderEntrepreneurDetailsForm()
            case 'principle':
                return renderPrincipleDetailsForm()
            case 'address':
                return renderAddressDetailsForm()
            case 'other':
                return renderOtherDetailsForm()
            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "MSME REGISTRATION" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "entrepreneur", title: "Entrepreneur Details", index: 1 },
                    { key: "principle", title: "Principle-Details", index: 2 },
                    { key: "address", title: "Address-Details", index: 3 },
                    { key: "other", title: "Other-Details", index: 4 },
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