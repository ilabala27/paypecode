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
import { companyType, gender, states } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "preference_1", "preference_2", "busi_of_company", "first_name",
        "middle_name", "last_name", "date_of_birth", "mobile_no ", "email_id", "father_name", "company_regd_add",

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
            { method: 'isMobileNo', params: { label: 'Contact Number' } }
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
        preference_1: '', preference_1_error: '',
        preference_1_validation: [
            { method: "isReq", params: { label: 'Preference 1' } }
        ],
        preference_2: '', preference_2_error: '',
        preference_2_validation: [
            { method: "isReq", params: { label: 'Preference 2' } }
        ],
        busi_of_company: '', busi_of_company_error: '',
        busi_of_company_validation: [
            { method: "isReq", params: { label: 'Business of company' } }
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
            { method: "isReq", params: { label: 'Last Name ' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        nature_of_business_validation: [
            { method: "isReq", params: { label: 'Date of Birth' } }
        ],
        mobile_no: '', mobile_no_error: '',
        mobile_no_validation: [
            { method: "isMobileNo", params: { label: 'Mobile' } }
        ],
        email_id: '', email_id_error: '',
        email_id_validation: [
            { method: "isEmail", params: { label: 'Email id' } }
        ],
        father_name: '', father_name_error: '',
        father_name_validation: [
            { method: "isReq", params: { label: "Father's Name" } }
        ],

        company_regd_add: '', company_regd_add_error: '',
        company_regd_add_validation: [
            { method: "isReq", params: { label: 'Company Address' } }
        ],
        gender: [], gender_error: '',
        gender_validation: [
            { method: "isReq", params: { label: 'Gender' } }
        ],
        company_type: [], company_type_error: '',
        company_type_validation: [
            { method: "isReq", params: { label: 'company type' } }
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

    // Submit Data
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
                        keyboardType='email-address'
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

    const renderRequirementsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Text style={[design.GENERIC_TEXT_HEADER_AVG_P, { textAlign: 'center' }]}>STEP 1: NAME APPROVAL (BY CENTRAL GOVT)</Text>
                    <Text style={{ color: colors.P_TEXT, fontSize: 18, textAlign: 'center' }}>Name of the company (desired) Company Name must be of First Name and second Objective of business</Text>
                    <TextInput
                        label={"PREFERENCE 1"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.preference_1}
                        onChangeText={(text: string) => setDataToForm('preference_1', text)}
                        error={form.preference_1_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"PREFERENCE 2"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.preference_2}
                        onChangeText={(text: string) => setDataToForm('preference_2', text)}
                        error={form.preference_2_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Activity/Business of the company"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.busi_of_company}
                        onChangeText={(text: string) => setDataToForm('busi_of_company', text)}
                        error={form.busi_of_company_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderDirectorDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <Text style={[design.GENERIC_TEXT_HEADER_AVG_P, { textAlign: 'center' }]}>STEP 2:Incorporation of the company</Text>
                    <Text style={{ color: colors.P_TEXT, fontSize: 18, textAlign: 'center' }}>Directors's details shall  be as per PAN</Text>
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
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.date_of_birth}
                        onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                        error={form.date_of_birth_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Mobile No"}
                        star={true}
                        placeholder={'Flat/Door/Room/Block'}
                        value={form.mobile_no}
                        onChangeText={(text: string) => setDataToForm('mobile_no', text)}
                        error={form.mobile_no_error}
                        isEditable={isEditable}
                        keyboardType='numeric'
                    />
                    <TextInput
                        label={"Email id"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.email_id}
                        onChangeText={(text: string) => setDataToForm('email_id', text)}
                        error={form.email_id_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Father's Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.father_name}
                        onChangeText={(text: string) => setDataToForm('father_first_name', text)}
                        error={form.father_name_error}
                        isEditable={isEditable}
                    />

                    <TextInput
                        label={"Company Registration Address"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.company_regd_add}
                        onChangeText={(text: string) => setDataToForm('company_regd_add', text)}
                        error={form.company_regd_add_error}
                        isEditable={isEditable}
                    />
                    <Selection
                        _key={"companytype"}
                        label={"Select company type"}
                        star={true}
                        placeholder={'Pick Company type from options'}
                        options={companyType}
                        values={form.company_type}
                        onAction={({ item, index }) => setDataToForm('company_type', canPushNorPop([], item, 'name'))}
                        error={form.company_type_error}
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
                                1.A Copy of PAN Card of the all GST Directors
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.A Copy of Aadhar Card of the all GST directors
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                3.Passport size Photographs of each GST Directors
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                4.Company Registered Address proof(EB Bill/Gas Bill/POstpaid bill etc)
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                5.Latest Bank Statement of All Directors
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                Note: Certificate of incorpration along with MOA and AOA will be provided within 2-3 company Incorporation at the desired address
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
                return renderRequirementsForm()
            case 'director':
                return renderDirectorDetailsForm()

            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "COMPANY INCORPORATION" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "requirements", title: "Requirements", index: 1 },
                    { key: "director", title: "Director Details", index: 2 },

                ]}
                renderScene={renderScene}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    despbox: {
        width: '100%',
        paddingHorizontal: ws(8),
        //backgroundColor: 'blue',
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