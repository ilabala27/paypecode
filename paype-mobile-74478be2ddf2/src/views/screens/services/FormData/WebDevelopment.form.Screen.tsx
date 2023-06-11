import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { Selection } from '@views/components/functional/Selection';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { states, webdevelopment } from '@models/static/adminSlice.static';
import { canPushNorPop } from '@utilis/methods/array.method';


export default ({ route, navigation }: INavigationProps2) => {
    const { isEditable } = route?.params
    const [isLoading, setIsLoading] = useState(false)
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "customer_name", "company_name", "contact_number", "customer_email", "customer_state", "customer_address",
        "remarks", "service_type"
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
        remarks: '', remarks_error: '',
        remarks_validation: [
            { method: "isReq", params: { label: 'Remarks' } }
        ],
        service_type: [], service_type_error: '',
        service_type_validation: [
            { method: "isReq", params: { label: 'Service type' } }
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
                    { type: "Title", title: "WEB DEVELOPMENT" },
                    { type: "Icon" },
                ]}
            />
            {isLoading ? <Loader /> :
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
                        <Selection
                            _key={"webdeveloment"}
                            label={"Select webdeveloment service type"}
                            star={true}
                            placeholder={'Pick webdeveloment service from options'}
                            options={webdevelopment}
                            values={form.service_type}
                            onAction={({ item, index }) => setDataToForm('service_type', canPushNorPop([], item, 'name'))}
                            error={form.service_type_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter Remarks / Customization needs To be Done"}
                            star={true}
                            placeholder={'eg xxxxxx'}
                            value={form.remarks}
                            onChangeText={(text: string) => setDataToForm('remarks', text)}
                            error={form.remarks_error}
                            isEditable={isEditable}
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
