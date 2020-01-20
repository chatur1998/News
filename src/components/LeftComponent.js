import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';
import { OffCanvas3D } from 'react-native-off-canvas-menu'

class LeftComponent extends Component {
  state = {
    menuOpen: false
}

handleMenu() {
  const { menuOpen } = this.state;
  this.setState({
    menuOpen: !menuOpen
  });
}

  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
          <Icon
            iconStyle={{ backgroundColor: 'black' }}
            size={28}
            color='white'
            name='arrow-forward'
            type='material'
          />
          <Text style={{ color: 'white', fontSize: 10 }}>
            Menu
          </Text>
      </View>
);
}
}

export default LeftComponent;
