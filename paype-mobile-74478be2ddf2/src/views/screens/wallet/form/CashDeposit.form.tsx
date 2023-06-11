import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { adminTransportor } from '@models/redux/admin/admin.transportor';
import { systemTransportor } from '@models/redux/system/system.transportor';
import PPUserAPIs from '@models/api/paype/user/user.api';
import { MainHeader } from '@views/components/functional/MainHeader';
import { TextInput } from '@views/components/functional/TextInput';
import { Button } from '@views/components/functional/Button';
import { Selection } from '@views/components/functional/Selection';
import { ScrollView } from '@views/components/functional/Scrollview';
import { Switch } from '@views/components/functional/Switch';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { hs, ms, wp, ws } from '@utilis/designs/measurements.design';
import { constructForServer, validateKey, validateKeys } from '@utilis/methods/validation.method';
import { INavigationProps2 } from '@utilis/interfaces/navigation.interface';
import { canPushNorPop } from '@utilis/methods/array.method';
import design from '@config/design.config';
import { Picker } from '@views/components/functional/Picker';
import colors from '@config/colors.config';
import fontsConfig from '@config/fonts.config';
import CreditWalletApis from '@models/api/paype/wallet/creditWallet.api';
import moment from 'moment';
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';
import { ButtonRound } from '@views/components/functional/ButtonRound';
import { grantStatus } from '@utilis/hooks/rbac/authorization.rbac';
import { amountInWords, encryptWithFormat } from '@utilis/methods/string.method';
import { BankCard } from '@views/components/designs/BankCard';
import { UserCardFromAPI } from '@views/components/designs/UserCardFromAPI';
import { DEPOSIT_TYPE } from '@models/static/service.static';


export default ({ route, navigation }: INavigationProps2) => {
    const { _id } = route?.params ?? {}
    const isEditable = !_id
    const { adminStore } = adminTransportor()
    const { cashDepositBanks } = adminStore()
    const { systemStore, setSnack } = systemTransportor()
    const { user, RBAC } = systemStore()
    const user_id = user?.user?.user_id
    const { walletStore, transactCashDeposit } = walletTransportor()
    const { creditWalletBalance } = walletStore()
    const { crwa_id } = creditWalletBalance
    const [isLoading, setIsLoading] = useState(false)
    const grant = grantStatus([
        "user-management:cash-deposit-approve"
    ])
    // Form Flow
    const [formKeys, setFormKeys] = useState([
        "cade_status", "cade_id", "cade_transacted_user_id", "cade_user_id", "cade_user_wallet_id", "cade_short_description", "cade_description",
        "cade_date", "cade_bank_id", "cade_ref_no", "cade_transaction_amount", "cade_attachment", "cade_other", "cade_note", "cade_session_id"
    ])
    const [form, setForm] = useState({
        cade_session_id: 'n/a', cade_session_id_error: '',
        cade_session_id_validation: [

        ],
        cade_status: "CREATED", cade_status_error: '',
        cade_status_validation: [

        ],
        cade_id: '', cade_id_error: '',
        cade_id_validation: [
            { method: "isString", params: { label: 'Deposit Id' } }
        ],
        cade_transacted_user_id: user_id, cade_transacted_user_id_error: '',
        cade_transacted_user_id_validation: [
            { method: "isReq", params: { label: 'Transaction user ID' } }
        ],
        cade_user_id: user_id, cade_user_id_error: '',
        cade_user_id_validation: [
            { method: "isReq", params: { label: 'User ID' } }
        ],
        cade_user_wallet_id: crwa_id, cade_user_wallet_id_error: '',
        cade_user_wallet_id_validation: [
            { method: "isReq", params: { label: 'Wallet ID' } }
        ],
        cade_short_description: 'Transaction reference no: ', cade_short_description_error: '',
        cade_short_description_validation: [
            { method: "isReq", params: { label: 'Summary' } }
        ],
        cade_description: 'Cash deposit', cade_description_error: '',
        cade_description_validation: [
            { method: "isReq", params: { label: 'Description' } }
        ],
        cade_bank_id: [], cade_bank_id_error: '',
        cade_bank_id_validation: [
            { method: "isReqArray", params: { label: 'Services' } }
        ],
        cade_date: '', cade_date_error: '',
        cade_date_validation: [
            { method: "isReq", params: { label: 'Transaction date' } }
        ],
        cade_ref_no: '', cade_ref_no_error: '',
        cade_ref_no_validation: [
            { method: "isReq", params: { label: 'Reference number' } }
        ],
        cade_transaction_amount: '', cade_transaction_amount_error: '',
        cade_transaction_amount_validation: [
            { method: "isReq", params: { label: 'Amount' } },
            { method: "isAmount", params: { label: 'Amount' } }
        ],
        cade_attachment: '', cade_attachment_error: '', cade_attachment_local: '',
        cade_attachment_validation: [
            { method: "isReq", params: { label: 'Attachment' } }
        ],
        cade_other: '', cade_other_error: '',
        cade_other_validation: [
            { method: "isString", params: { label: 'Remarks' } }
        ],
        cade_note: [], cade_note_error: '',
        cade_note_validation: [
            { method: "isReqArray", params: { label: 'Deposit type' } }
        ],
    })
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)
    const [isButtonLoadingKey, setIsButtonLoadingKey] = useState('')
    const setDataToForm = (key: string, value: any) => {
        setForm({ ...form, ...validateKey(form, key, value) })
    }
    const validate = () => {
        const { validatedForm, error } = validateKeys(form, formKeys, true)
        if (error)
            return setForm(validatedForm)
        return true
    }

    // On Mount
    useEffect(() => _id && getData(_id), [])

    // Get Data
    const getData = (_id: string) => {
        if (!isLoading) {
            setIsLoading(true)
            CreditWalletApis.getCashDeposit({ params: { _id } }).then((res: any) => {
                const formWithValue = constructForServer(formKeys, res.data)
                formWithValue.cade_bank_id = cashDepositBanks.filter((el) => el._id == formWithValue.cade_bank_id)
                formWithValue.cade_date = moment(formWithValue.cade_date).format('DD-MM-YYYY hh:mma')
                formWithValue.cade_transaction_amount = parseFloat(formWithValue.cade_transaction_amount).toFixed(2)
                formWithValue.cade_note = DEPOSIT_TYPE.filter((el) => el.key == formWithValue.cade_note)
                // // bank_acco_type
                // formWithValue.bank_acco_type = bankAccountTypes.filter((el) => el.name == formWithValue.bank_acco_type)
                // update
                setForm({ ...form, ...formWithValue })
                setIsLoading(false)
            }).catch(({ message }: any) => {
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    // Submit Data
    const onCreate = () => {
        if (!isSubmitLoading && validate()) {
            setIsSubmitLoading(true)
            const body = constructForServer(formKeys, form)
            body.cade_bank_id = body?.cade_bank_id[0]._id
            body.cade_date = moment(body?.cade_date, 'DD-MM-YYYY hh:mma')
            body.cade_short_description = body.cade_short_description + body.cade_ref_no
            body.cade_note = body.cade_note[0]?.key
            if (parseInt(body.cade_transaction_amount) < 100) {
                setIsSubmitLoading(false)
                return setSnack({ message: 'Minimum transaction value is 100', type: 'ERROR' })
            }
            CreditWalletApis.createCashDepositRequest({ body }).then((res: any) => {
                setIsSubmitLoading(false)
                setSnack({ message: "Fund requested successfully", type: 'SUCCESS' })
                NavServiceUtils.goBack()
            }).catch(({ message }: any) => {
                setIsSubmitLoading(false)
                setSnack({ message, type: 'ERROR' })
            })
        }
    }

    const transactConfirm = (status: string) => Alert.alert(
        `Cash Deposit`,
        `Are you sure you want to ${status} ?`,
        [
            { text: "Cancel", onPress: () => null, style: 'cancel' },
            { text: "Yes", onPress: () => transact(status) },
        ],
        {
            cancelable: true
        }
    );

    const transact = (status: string) => {
        if (!isButtonLoadingKey) {
            setIsButtonLoadingKey(status)
            try {
                const cashDepositData = { user_id, _id, status }
                const hash = encryptWithFormat(cashDepositData)
                const payload = {
                    params: cashDepositData,
                    body: hash,
                    extraData: {
                        user_id
                    }
                }
                transactCashDeposit(payload)
            } catch (err: any) {
                console.log(err)
                setIsButtonLoadingKey('')
            }
        }
    }

    return (
        <View style={design.GENERIC_SCREEN_P}>
            <MainHeader
                render={[
                    { type: "Icon", iconType: "Entypo", iconName: "chevron-left", onPress: () => NavServiceUtils.goBack() },
                    { type: "Title", title: "Cash Deposit" },
                    !isEditable ? { type: "Icon" } :
                        { type: "Icon", iconType: "FontAwesome", iconName: "history", onPress: () => NavServiceUtils.navigate(NavKeys.WALLET.CASH_DEPOSIT) },
                ]}
            />
            {isLoading ? <Loader /> :
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: 'white' }}>
                    <ScrollView style={[design.GENERIC_CONTAINER_P, { backgroundColor: 'white' }]} >
                        {grant["user-management:cash-deposit-approve"] ?
                            <UserCardFromAPI userId={form.cade_user_id} />
                            : null}
                        <Selection
                            _key={'bank'}
                            label={"Select bank"}
                            star={true}
                            placeholder={'Pick bank from options'}
                            options={cashDepositBanks}
                            values={form.cade_bank_id}
                            onAction={({ item, index }) => setDataToForm('cade_bank_id', canPushNorPop([], item, '_id'))}
                            error={form.cade_bank_id_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                            renderItem={({ item, index, onPress, backgroundColor, color }) => {
                                return (
                                    <BankCard
                                        item={item}
                                        index={index}
                                        onPress={onPress}
                                        bg={backgroundColor}
                                        color={color}
                                    />
                                )
                            }}
                        />
                        <Selection
                            _key={"cade_note"}
                            label={'Deposit type'}
                            star={true}
                            placeholder={'Pick type from options'}
                            options={DEPOSIT_TYPE}
                            values={form.cade_note}
                            onAction={({ item, index }) => setDataToForm('cade_note', canPushNorPop([], item, 'name'))}
                            error={form.cade_note_error}
                            closeAfterSelect={true}
                            multi={false}
                            showArrow={true}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter transaction date"}
                            star={true}
                            placeholder={'eg 10-12-2022 10:30am'}
                            value={form.cade_date}
                            onChangeText={(text: string) => setDataToForm('cade_date', text)}
                            error={form.cade_date_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter reference no."}
                            star={true}
                            placeholder={'eg xxxxxxxxxxx'}
                            value={form.cade_ref_no}
                            onChangeText={(text: string) => setDataToForm('cade_ref_no', text)}
                            error={form.cade_ref_no_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter transaction amount"}
                            star={true}
                            placeholder={'eg 1000.00'}
                            value={form.cade_transaction_amount}
                            onChangeText={(text: string) => setDataToForm('cade_transaction_amount', text)}
                            error={form.cade_transaction_amount_error}
                            isEditable={isEditable}
                            info={`${amountInWords(parseInt(form.cade_transaction_amount))} ${parseInt(form.cade_transaction_amount) == 1 ? 'Rupee' : 'Rupees'} Only`}
                        />
                        <Picker
                            label={"Upload attachment"}
                            star={true}
                            placeholder={`Select attachment`}
                            value={{
                                local: form.cade_attachment_local,
                                key: form.cade_attachment,
                                name: form.cade_attachment
                            }}
                            folder={'cash-deposit'}
                            upload={true}
                            onChange={({ name, key, type, size, local, blob }) =>
                                setForm({ ...form, cade_attachment: key, cade_attachment_error: '', cade_attachment_local: local, })
                            }
                            error={form.cade_attachment_error}
                            isEditable={isEditable}
                        />
                        <TextInput
                            label={"Enter remarks"}
                            star={false}
                            placeholder={'eg xxxxxxxxxxxx'}
                            value={form.cade_other}
                            onChangeText={(text: string) => setDataToForm('cade_other', text)}
                            error={form.cade_other_error}
                            isEditable={isEditable}
                        />
                    </ScrollView>
                    {isEditable ?
                        <View style={styles.submitContainer}>
                            <Button
                                label={'Submit request'}
                                isLoading={isSubmitLoading}
                                onPress={onCreate}
                            />
                        </View>
                        : null}
                    {!isEditable && form.cade_status == "CREATED" ? (
                        form.cade_transacted_user_id == user_id && !RBAC.isRoot ?
                            <View style={styles.submitContainer}>
                                <ButtonRound
                                    iconType='Ionicons'
                                    iconName='ios-close'
                                    onPress={() => transactConfirm('Cancel')}
                                    isLoading={isButtonLoadingKey == "Cancel"}
                                    circleColor={colors.ORANGE}
                                    iconColor={colors.WHITE1}
                                />
                            </View>
                            : grant["user-management:cash-deposit-approve"] ?
                                <View style={styles.submitContainer}>
                                    <ButtonRound
                                        iconType='Ionicons'
                                        iconName='checkmark-done-sharp'
                                        onPress={() => transactConfirm('Approve')}
                                        isLoading={isButtonLoadingKey == "Approve"}
                                        circleColor={colors.GREEN}
                                        iconColor={colors.WHITE1}
                                    />
                                    <ButtonRound
                                        iconType='Ionicons'
                                        iconName='ios-close'
                                        onPress={() => transactConfirm('Reject')}
                                        isLoading={isButtonLoadingKey == "Reject"}
                                        circleColor={colors.RED}
                                        iconColor={colors.WHITE1}
                                    />
                                </View>
                                : null
                    ) : null}
                </KeyboardAvoidingView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: colors.P_BG,
        borderRadius: 6,
        marginVertical: hs(4),
        overflow: 'hidden',
        paddingVertical: hs(8),
        paddingHorizontal: ws(10)
    },
    labelText: {
        fontSize: ms(12),
        fontFamily: fontsConfig.SemiBold,
        color: colors.S_TEXT_COLOR,
    },
    submitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: hs(32),
        marginTop: hs(16)
    }
})