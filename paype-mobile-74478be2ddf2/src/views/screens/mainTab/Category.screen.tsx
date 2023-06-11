import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { CategoryBasedServiceList } from '@views/components/designs/CategoryBasedServiceList';
import { MainHeader } from '@views/components/functional/MainHeader';
import { ScrollView } from '@views/components/functional/Scrollview';
import { INavigationProps } from '@utilis/interfaces/navigation.interface';
import design from '@config/design.config';
import { Loader } from '@views/components/functional/Loader';
import NavServiceUtils from '@controllers/utils/NavService.utils';
import { NavKeys } from '@controllers/utils/NavKeys.utils';
import { servicesTransportor } from '@models/redux/services/services.transportor';
import { hs } from '@utilis/designs/measurements.design';

export default ({ route, navigation }: INavigationProps) => {
  const { servicesStore, setServicesWithCategories } = servicesTransportor()
  const { servicesWithCategory } = servicesStore()


  useEffect(() => {
    setServicesWithCategories({})
  }, [])

  const onPress = ({ index, item }: any) => {
    if (item.serv_nav_key)
      NavServiceUtils.navigate(item.serv_nav_key)
  }

  return (
    <View style={design.GENERIC_SCREEN_S}>
      <MainHeader
        render={[
          { type: "Icon" },
          { type: "Title", title: "SERVICE CATEGORIES" },
          { type: "ProfilePicture", onPress: () => NavServiceUtils.navigate(NavKeys.MY_PROFILE) },
        ]}
      />
      {servicesWithCategory.isLoading ? <Loader />
        :
        <ScrollView
          nestedScrollEnabled
          onRefresh={() => setServicesWithCategories({})}
          refreshing={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: hs(100), alignItems: 'center' }}
        >
          <CategoryBasedServiceList
            data={servicesWithCategory.data}
            limit={8}
            numColumns={4}
            onPress={onPress}
          />
        </ScrollView>
      }
    </View>
  );
};
