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
import { trf } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';

export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name",
        "contact_number", "customer_email", "customer_state", "customer_address", "remarks"
    ])
    const [form, setForm] = useState({
        customer_name: '', customer_name_error: '',
        customer_name_validation: [
            { method: "isReq", params: { label: 'Customer Name' } }
        ],
        contact_number: '', contact_number_error: '',
        contact_number_validation: [
            { method: "isMobileNo", params: { label: 'Contact Number' } }
        ],
        customer_email: '', customer_email_error: '',
        customer_email_validation: [
            { method: "isEmail", params: { label: 'Customer Email' } }
        ],
        customer_address: '', customer_address_error: '',
        customer_address_validation: [
            { method: "isReq", params: { label: 'Customer address' } }
        ],
        date_of_birth: '', date_of_birth_error: '',
        date_of_birth_validation: [
            { method: "isReq", params: { label: 'Date of Birth' } }
        ],
        old_pan_no: '', old_pan_no_error: '',
        old_pan_no_validation: [
            { method: "isReq", params: { label: 'Old Pan No' } }
        ],
        existing_pan: [], existing_pan_error: '',
        existing_pan_validation: [
            { method: "isReq", params: { label: 'Old Pan No' } }
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

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "PAN REGISTRATION" },
                    { type: "Icon" },
                ]}
            />
            {isLoading ? <Loader /> :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                        <View style={{ flexDirection: 'row' }}>
                        </View>
                        <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>NEW REGISTRATION</Text>
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
                            label={"Date of Birth"}
                            star={true}
                            placeholder={'eg DD/MM/YYYY'}
                            value={form.date_of_birth}
                            onChangeText={(text: string) => setDataToForm('date_of_birth', text)}
                            error={form.date_of_birth_error}
                            isEditable={isEditable}
                        />
                        <Selection
                            _key={"existingpan"}
                            label={"Select existing type"}
                            star={true}
                            placeholder={'Pick Any existing from options'}
                            options={trf}
                            values={form.existing_pan}
                            onAction={({ item, index }) => setDataToForm('existing_pan', canPushNorPop([], item, 'name'))}
                            error={form.existing_pan_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <Text style={design.GENERIC_TEXT_HEADER_AVG_P}>EXISTING PAN CARD</Text>
                        <TextInput
                            label={"Enter Old PAN Number"}
                            star={true}
                            placeholder={'eg xxxxxx'}
                            value={form.old_pan_no}
                            onChangeText={(text: string) => setDataToForm('old_pan_no', text)}
                            error={form.old_pan_no_error}
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
                                    1.Aadhar Card*
                                </Text>
                            </View>
                            <View style={styles.despbox}>
                                <Text style={styles.desptext}>
                                    2.Voter ID
                                </Text>
                            </View>
                            <View style={styles.despbox}>
                                <Text style={styles.desptext}>
                                    3.Birth Certificate Or Driving Licence or Marksheet*
                                </Text>
                            </View>
                            <View style={styles.despbox}>
                                <Text style={styles.desptext}>
                                    4.Passport Size Photo*
                                </Text>
                            </View>
                            <View style={styles.despbox}>
                                <Text style={styles.desptext}>
                                    5.Signature*
                                </Text>
                            </View>
                            <View style={styles.despbox}>
                                <Text style={styles.desptext}>
                                    Note: Documents Denoted in stars are Mandatory
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
            }
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