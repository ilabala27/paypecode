import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { GradientView } from '@views/components/functional/GradientView';
import { hs, ms, ws } from '@utilis/designs/measurements.design';
import colors from '@config/colors.config';
import fonts from '@config/fonts.config';
import { Button } from '@views/components/functional/Button';
import { ScrollView } from '@views/components/functional/Scrollview';
import { ButtonRound } from '@views/components/functional/ButtonRound';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { Icon } from '@views/components/functional/Icon';
import { walletTransportor } from '@models/redux/wallet/wallet.transportor';
import { Loader } from '@views/components/functional/Loader';
import { FlatList } from '@views/components/functional/Flatlist';
import { WalletTransactionCard } from '@views/components/designs/WalletTransactionCard';
import { currencyInr } from '@utilis/methods/string.method';
import { systemTransportor } from '@models/redux/system/system.transportor';
import { t } from 'i18next';


export default ({ route, navigation }: INavigationProps) => {
  const { systemStore } = systemTransportor()
  const { user } = systemStore()?.user ?? {}
  const { walletStore, setCreditBalanceAndTransaction } = walletTransportor()
  const { creditWalletBalance, creditWalletTransactions, tradeWalletBalance, tradeWalletTransactions } = walletStore() ?? {}
  const [visibleWallet, setVisibleWallet] = useState<'Credit' | 'Trade'>('Credit')

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    const payload = { params: { user_id: user?.user_id } }
    setCreditBalanceAndTransaction(payload)
  }

  const balanceDashboard = ({ credit, label }: any) => {
    return (
      <View style={{ height: ws(300), width: ws(300), alignItems: 'center', justifyContent: 'space-evenly', }}>
        <Text style={styles.titleText}>{t("WALLET.TITLE")} {user.user_name}!</Text>
        <Text style={styles.rsText}>
          <Icon type={"FontAwesome"} name={"inr"} size={ms(32)} />
          {" "}{currencyInr(credit ?? '0.00')}
        </Text>
        <Button
          label={label ?? 'Wallet'}
          style={{ width: ws(150) }}
        />
      </View>
    )
  }


  return (
    <ScrollView onRefresh={getData} refreshing={false} style={[design.GENERIC_SCREEN_P, { backgroundColor: colors.P_COLOR }]}>
      <View style={{ backgroundColor: colors.P_BG }}>
        <GradientView
          colors={[colors.P_COLOR, colors.S_COLOR, colors.P_COLOR, colors.S_COLOR, colors.P_COLOR,]}
          x={-1}
          y={1}
          style={{ height: ws(360), alignItems: 'center', borderBottomLeftRadius: 32, borderBottomRightRadius: 32 }}
        >
          <View style={{ flex: 1 }} />
          <GradientView
            colors={[colors.P_COLOR, colors.S_COLOR, colors.S_COLOR, colors.P_COLOR, colors.S_COLOR,]}
            x={-1}
            y={2}
            style={{ height: ws(300), width: ws(300), borderRadius: 500, borderWidth: 1.5, borderColor: colors.S_COLOR, overflow: 'hidden', marginVertical: hs(10) }}
          >
            <ScrollView pagingEnabled horizontal>
              {balanceDashboard({ credit: parseFloat(creditWalletBalance?.available_credit).toFixed(2), label: 'Credit wallet' })}
              {balanceDashboard({ credit: parseFloat(tradeWalletBalance?.available_credit).toFixed(2), label: 'Trade wallet' })}
            </ScrollView>
          </GradientView>
        </GradientView>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: -ws(65), left: 0, width: '100%', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <ButtonRound
            label={t("WALLET.REQUEST")}
            iconType='Feather'
            iconName='git-pull-request'
            onPress={() => NavServiceUtils.navigate(NavKeys.COMING_SOON)}
          />
          <ButtonRound
            label={t("WALLET.ADD")}
            iconType='Ionicons'
            iconName='ios-cash-outline'
            onPress={() => NavServiceUtils.navigate(NavKeys.WALLET.REFILL_OPTIONS)}
          />
          <ButtonRound
            label={t("WALLET.SEND")}
            iconType='Ionicons'
            iconName='ios-send-outline'
            onPress={() => NavServiceUtils.navigate(NavKeys.COMING_SOON)}
          />
        </View>
      </View>
      <View style={{ minHeight: hs(500), backgroundColor: colors.P_BG, zIndex: -1, paddingVertical: hs(100), paddingHorizontal: ws(16) }}>
        <View style={{ height: hs(45), width: ws(345), borderRadius: 100, borderColor: '#f9f8ff', borderWidth: 5, alignItems: 'center', justifyContent: 'center', marginBottom: hs(32) }}>
          <Text style={[styles.labelText, visibleWallet == "Trade" ? { color: colors.ORANGE } : {}]}>{`${visibleWallet} Transactions`}</Text>
          <TouchableOpacity
            onPress={() => setVisibleWallet(visibleWallet == "Credit" ? "Trade" : "Credit")}
            activeOpacity={design.OPACITY_AVG}
            style={{ position: 'absolute', right: ws(16), width: hs(45), height: hs(45), alignItems: 'center', justifyContent: 'center', }}
          >
            <Icon type={"MaterialCommunityIcons"} name={"swap-horizontal"} size={ms(18)} />
          </TouchableOpacity>
        </View>
        {visibleWallet == 'Credit' && !creditWalletTransactions?.isLoading ?
          <FlatList
            data={creditWalletTransactions?.data}
            contentContainerStyle={{ paddingBottom: hs(50) }}
            renderItem={({ item, index }: any) =>
              <WalletTransactionCard item={item} index={index} />
            }
            emptyComponentType={'String'}
            onRefresh={() => getData()}
            refreshing={false}
          />
          : visibleWallet == 'Trade' && !tradeWalletTransactions?.isLoading ?
            <FlatList
              data={tradeWalletTransactions?.data}
              contentContainerStyle={{ paddingBottom: hs(50) }}
              renderItem={({ item, index }: any) =>
                <WalletTransactionCard item={item} index={index} />
              }
              emptyComponentType={'String'}
              onRefresh={() => getData()}
              refreshing={false}
            />
            : <Loader />
        }
      </View>
    </ScrollView>
  );
};

// cwtr_before_credit
//                     cwtr_created_at

const styles = StyleSheet.create({
  titleText: {
    fontSize: ms(16),
    fontFamily: fonts.Bold,
    color: colors.S_TEXT_COLOR,
  },
  rsText: {
    fontSize: ms(32),
    fontFamily: fonts.Bold,
    color: colors.S_TEXT_COLOR,
  },
  subTitleText: {
    fontSize: ms(14),
    fontFamily: fonts.Regular,
    color: colors.S_TEXT_COLOR,
  },
  labelText: {
    fontSize: ms(12),
    fontFamily: fonts.Bold,
    color: colors.S_TEXT_COLOR,
  },
})