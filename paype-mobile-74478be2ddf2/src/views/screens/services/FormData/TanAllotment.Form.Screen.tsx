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
import { apppropiateCategory, capacityofSignatory, states } from '@models/static/adminSlice.static';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';


export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name","contact_number", "customer_email", "customer_state", "customer_address", "name_of_applicant",
         "door_no", "building_name", "street_name", "area_name", "state","pin_code", "mobile_no", "email_id",
         "nationality_of_deductor", "pan_no", "tax_deduction_acc_no","appropiate_category","capacity_of_signatory"

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
        name_of_applicant: '', name_of_applicant_error: '',
        name_of_applicant_validation: [
            { method: "isReq", params: { label: 'Name of Applicant' } }
        ],
        door_no: '', door_no_error: '',
        door_no_validation: [
            { method: "isReq", params: { label: 'Door Number' } }
        ],
        building_name: '', building_name_error: '',
        building_name_validation: [
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
        pin_code: '', pin_code_error: '',
        pin_code_validation: [
            { method: "isReq", params: { label: 'PIN Code' } }
        ],
        state: '', state_error: '',
        state_validation: [
            { method: "isReq", params: { label: 'State' } }
        ],
        mobile_no: '', mobile_no_error: '',
        mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile Number' } }
        ],
        email_id: '', email_id_error: '',
        email_id_validation: [
            { method: "isEmail", params: { label: 'Email ID' } }
        ],
        nationality_of_deductor: '', nationality_of_deductor_error: '',
        nationality_of_deductor_validation: [
            { method: "isReq", params: { label: 'Nationality of Deductor' } }
        ],
        pan_no: '', pan_no_error: '',
        pan_no_validation: [
            { method: "isReq", params: { label: 'PAN No' } }
        ],
        tax_deduction_acc_no: '', tax_deduction_acc_no_error: '',
        tax_deduction_acc_no_validation: [
            { method: "isReq", params: { label: 'Tax Deduction Account NO' } }
        ],
        appropiate_category: [], appropiate_category_error: '',
        appropiate_category_validation: [
            { method: "isReq", params: { label: 'Tax Deduction Account NO' } }
        ],
        capacity_of_signatory: [], capacity_of_signatory_error: '',
        capacity_of_signatory_validation: [
            { method: "isReq", params: { label: 'Tax Deduction Account NO' } }
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
                        keyboardType="number-pad"
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

    const renderServiceDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>

                    </View>
                    <Selection
                        _key={"appropiateCategory"}
                        label={"Select Appropiate Category type"}
                        star={true}
                        placeholder={'Pick Appropiate Category type from options'}
                        options={apppropiateCategory}
                        values={form.appropiate_category}
                        onAction={({ item, index }) => setDataToForm('appropiate_category', canPushNorPop([], item, 'name'))}
                        error={form.appropiate_category_error}
                        closeAfterSelect={true}
                        multi={false}
                        showArrow={true}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Enter Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.name_of_applicant}
                        onChangeText={(text: string) => setDataToForm('name_of_applicant', text)}
                        error={form.name_of_applicant_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Flat/Door/Room/Block"}
                        star={true}
                        placeholder={'Flat/Door/Room/Block'}
                        value={form.door_no}
                        onChangeText={(text: string) => setDataToForm('door_no', text)}
                        error={form.door_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Name Of Premises/Building"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.building_name}
                        onChangeText={(text: string) => setDataToForm('building_name', text)}
                        error={form.building_name_error}
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
                        label={"PIN Code"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.pin_code}
                        onChangeText={(text: string) => setDataToForm('pin_code', text)}
                        error={form.pin_code_error}
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
                        label={"Mobile Number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.mobile_no}
                        onChangeText={(text: string) => setDataToForm('mobile_no', text)}
                        error={form.mobile_no_error}
                        isEditable={isEditable}
                        keyboardType="number-pad"
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
                        label={"Nationality of Deductor"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.nationality_of_deductor}
                        onChangeText={(text: string) => setDataToForm('nationality_of_deductor', text)}
                        error={form.nationality_of_deductor_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PAN Number"}
                        star={true}
                        placeholder={'PAN'}
                        value={form.pan_no}
                        onChangeText={(text: string) => setDataToForm('pan_no', text)}
                        error={form.pan_no_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Existing Tax Deduction Account Number"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.tax_deduction_acc_no}
                        onChangeText={(text: string) => setDataToForm('tax_deduction_acc_no', text)}
                        error={form.tax_deduction_acc_no_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"capacityofsignatory"}
                        label={"Select capacity of signatory type"}
                        star={true}
                        placeholder={'Pick capacity of signatory from options'}
                        options={capacityofSignatory}
                        values={form.capacity_of_signatory}
                        onAction={({ item, index }) => setDataToForm('capacity_of_signatory', canPushNorPop([], item, 'name'))}
                        error={form.capacity_of_signatory_error}
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
                                1.A copy of PAN Card
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.A copy of Aadhar card
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                3.Upload Signature (Signatory)
                            </Text>
                        </View>
                    </View>
                    <Button style={{ backgroundColor: colors.GREEN, marginTop: 10 }}
                        label={'UPLOAD DOCUMENT'}
                    // onPress={doSubmit}
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
                return renderServiceDetailsForm()
            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "TAN ALLOTMENT" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "service", title: "service-Details", index: 1 },
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