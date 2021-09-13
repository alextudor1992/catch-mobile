import { FlatList, Text } from "react-native";
import { Button, View } from "react-native-ui-lib";
import React from "react";
import { Route } from "../app/router";
import { useNavigation } from "@react-navigation/native";
import { Page } from "../app/page";
import { useDimensions } from "@react-native-community/hooks";
import { useStore } from "../../store";

const data = [
  {id: 'abc', name: 'testA', color: '#ee3737'},
  {id: 'def', name: 'testB', color: '#71e758'},
  {id: 'ghi', name: 'testC', color: '#23a2de'},
];

export const Feed = () => {
  const { screen } = useDimensions();
/*
  const renderItem = (item) => {
    return <View style={{ width: screen.width, height: screen.height, backgroundColor: item.color }}>
      <Text>{`Current text rendered: ${item.name}`}</Text>
    </View>;
  }
*/
  const store = useStore();
  /*return <Page>
    <FlatList
      getItem={(data, index) => data[index]}
      data={data}
      keyExtractor={(item) => {console.debug(item); return item.id;}}
      snapToInterval={1}
      renderItem={renderItem}
    />
  </Page>;*/

  return (<Button borderRadius={0} onPress={() => store.navigationStore.changePage(Route.PROFILE)}>
    <Text>Go to profile</Text>
  </Button>);
}
