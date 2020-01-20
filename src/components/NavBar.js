import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';

class NavBar extends Component {
  render() {
    return (
      <View>
        <Header
           placement='left'
           containerStyle={{ paddingTop: 12 }}
           backgroundColor='black'
           leftComponent={<LeftComponent />}
           rightComponent={<RightComponent />}
           centerComponent={{ text: 'News', style: { color: 'white', fontSize: 25 } }}
        />
      </View>
    );
  }
}

export default NavBar;
