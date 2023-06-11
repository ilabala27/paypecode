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
import { gender, states } from '@models/static/adminSlice.static';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "first_name", "middle_name", "last_name", "date_of_birth",
        "mobile_no", "email_id", "aadhar_no", "pan_no"

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
        mobile_no: '', mobile_no_error: '',
        mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile Number' } }
        ],
        email_id: '', email_id_error: '',
        email_id_validation: [
            { method: "isEmail", params: { label: 'Email ID' } }
        ],
        aadhar_no: '', aadhar_no_error: '',
        aadhar_no_validation: [
            { method: "isAadhar", params: { label: 'Aadhar ' } }
        ],
        pan_no: '', pan_no_error: '',
        pan_no_validation: [
            { method: "isPan", params: { label: 'PAN' } }
        ],
        gender: [], gender_error: '',
        gender_validation: [
            { method: "isReq", params: { label: 'Gender' } }
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
                    <Text style={{ color: colors.P_TEXT_COLOR, fontSize: 18, textAlign: 'center' }}>Service Info</Text>
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
                        star={false}
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
                        value={form.mobile_no}
                        onChangeText={(text: string) => setDataToForm('mobile_no', text)}
                        error={form.mobile_no_error}
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
                        placeholder={'eg xxxx xxxx xxxx'}
                        value={form.aadhar_no}
                        onChangeText={(text: string) => setDataToForm('aadhar_no', text)}
                        error={form.aadhar_no_error}
                        isEditable={isEditable}
                        keyboardType='number-pad'
                        maxLength={14}
                    />
                    <TextInput
                        label={"PAN Number"}
                        star={true}
                        placeholder={'PAN'}
                        value={form.pan_no}
                        onChangeText={(text: string) => setDataToForm('pan_no', text)}
                        error={form.pan_no_error}
                        isEditable={isEditable}
                        maxLength={10}
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
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.PAN Card of the Partner/Director
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                3.Aadhar Card
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                4.Photo of Proprietor/Partner/Director
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                5.GST Certificate
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                6.Bank Statement
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                7.Income Tax Return
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                Note: Please upload duly signed and stamped document
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

            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "DIGITAL SIGNATURE" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "applicant", title: "Applicant Details", index: 1 },
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