import { hs } from '@utilis/designs/measurements.design';
import React from 'react';
import { FlatList, ScrollViewProps, } from 'react-native';


interface IScrollViewInterface {
  children?: any;
  onRefresh?: any;
  refreshing?: boolean;
}

export const ScrollView = (
    { children, onRefresh, refreshing, ...rest }: IScrollViewInterface & ScrollViewProps
) => {
  return (
    <FlatList 
        data={[1]} 
        renderItem={() => children} 
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={rest.horizontal? {} : { paddingBottom: hs(50) }}
        onRefresh={onRefresh}
        refreshing={refreshing}
        {...rest}
    />
  );
};
