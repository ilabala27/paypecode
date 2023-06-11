import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View, StyleSheet, Text } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { hs, ws } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import colors from '@config/colors.config';
import { TabWithSlider } from '@views/components/functional/TabWithSlider';
import { Selection } from '@views/components/functional/Selection';
import { states } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';


export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "contact_number", "customer_email", "customer_state", "customer_address", "firm_name", "address", "date_of_registration",
        "customer_name", "company_name", "profit_loss_ratio", "object_of_firm", "partner_name", "father_name", "date_of_birth",
        "door_no", "building_name", "street_name", "area_name", "post_office", "state", "district"

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
        firm_name: '', firm_name_error: '',
        firm_name_validation: [
            { method: "isReq", params: { label: 'Firm Name' } }
        ],
        address: '', address_error: '',
        address_validation: [
            { method: "isReq", params: { label: 'Address' } }
        ],
        date_of_registration: '', date_of_registration_error: '',
        date_of_registration_validation: [
            { method: "isReq", params: { label: 'Date of Registration' } }
        ],
        profit_loss_ratio: '', profit_loss_ratio_error: '',
        profit_loss_ratio_validation: [
            { method: "isReq", params: { label: 'Profit loss Ratio' } }
        ],
        object_of_firm: '', object_of_firm_error: '',
        object_of_firm_validation: [
            { method: "isReq", params: { label: 'object of firm' } }
        ],
        partner_name: '', partner_name_error: '',
        partner_name_validation: [
            { method: "isReq", params: { label: 'Partner Name' } }
        ],
        father_name: '', father_name_error: '',
        father_name_validation: [
            { method: "isReq", params: { label: 'Father Name' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        date_of_birth_validation: [
            { method: "isReq", params: { label: 'Date of birth' } }
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
        post_office: '', post_office_error: '',
        post_office_validation: [
            { method: "isReq", params: { label: 'Post Office' } }
        ],
        state: '', state_error: '',
        state_validation: [
            { method: "isReq", params: { label: 'State' } }
        ],
        district: '', district_error: '',
        district_validation: [
            { method: "isReq", params: { label: 'District' } }
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
                        onChangeText={(text: string) => setDataToForm(' contact_number', text)}
                        error={form.contact_number_error}
                        isEditable={isEditable}
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

    const renderFirmDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Firm Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.firm_name}
                        onChangeText={(text: string) => setDataToForm('firm_name', text)}
                        error={form.firm_name_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Address "}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.address}
                        onChangeText={(text: string) => setDataToForm('address', text)}
                        error={form.address_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Date Of Registration"}
                        star={true}
                        placeholder={'eg DD/MM/YYYY'}
                        value={form.date_of_registration}
                        onChangeText={(text: string) => setDataToForm('date_of_registration', text)}
                        error={form.date_of_registration_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Profit/Loss sharing ratio"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.profit_loss_ratio}
                        onChangeText={(text: string) => setDataToForm('profit_loss_ratio', text)}
                        error={form.profit_loss_ratio_error}
                        isEditable={isEditable}
                    />
                    <TextInput
                        label={"Object of firm"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.object_of_firm}
                        onChangeText={(text: string) => setDataToForm('object_of_firm', text)}
                        error={form.object_of_firm_error}
                        isEditable={isEditable}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    const renderPartnerDetailsForm = () => {
        if (isLoading) return <Loader />
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                    <View style={{ flexDirection: 'row' }}>
                    </View>
                    <TextInput
                        label={"Name"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.partner_name}
                        onChangeText={(text: string) => setDataToForm('partner_name', text)}
                        error={form.partner_name_error}
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
                        label={"Date of Birth"}
                        star={true}
                        placeholder={'eg DD/MM/YYYY'}
                        value={form.date_of_birth}
                        onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                        error={form.date_of_birth_error}
                        isEditable={isEditable}
                    />
                    <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>RESIDENCE ADDRESS</Text>
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
                        label={"Thana/PostOffice"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.post_office}
                        onChangeText={(text: string) => setDataToForm('post_office', text)}
                        error={form.post_office_error}
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
                        label={"Town/City/District"}
                        star={true}
                        placeholder={'eg xxxxxx'}
                        value={form.district}
                        onChangeText={(text: string) => setDataToForm('district', text)}
                        error={form.district_error}
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
                                1.Photos of Partners
                            </Text>
                        </View>
                        <View style={styles.despbox}>
                            <Text style={styles.desptext}>
                                2.A copy of Aadhar Card
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
            case 'firm':
                return renderFirmDetailsForm()
            case 'partner':
                return renderPartnerDetailsForm()

            default: null
        }
    };

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "PARTNERSHIP FIRM REGISTRATION" },
                    { type: "Icon" },
                ]}
            />
            <TabWithSlider
                tabs={[
                    { key: "lead", title: "Lead", index: 0 },
                    { key: "firm", title: "Firm Detais", index: 1 },
                    { key: "partner", title: "Partner Details", index: 2 },

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