import React, { Component } from 'react';
import { ActivityIndicator, TouchableOpacity, Dimensions, View, StyleSheet, Platform } from 'react-native';
import { Icon, Overlay, Input, Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { searchPressed, searchText, fetchNews } from '../actions/MainActions';

class RightComponent extends Component {
  state = {
    visible: false,
  }

    onBackdropPress() {
      this.setState({ visible: false });
    }

    onSearchTextChange(text) {
      this.props.searchText(text);
    }

    onHomePressed() {
      Actions.News();
    }

    Pressed() {
      this.props.searchPressed(this.props.query);
      this.onBackdropPress();
    }

    render() {
      return (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => this.setState({ visible: !this.state.visible })} >
              <Icon
                iconStyle={{ paddingHorizontal: 5 }}
                reverse
                size={28}
                name='search'
                type='material'
              />

                  {this.state.visible &&
                    <Overlay
                      isVisible={this.state.visible}
                      onBackdropPress={this.onBackdropPress.bind(this)}
                      height={Dimensions.get('window').height - 290}
                      width={Dimensions.get('window').width}
                      overlayBackgroundColor='rgba(52, 52, 52, alpha)'
                      animationType='fade'
                    >
                      <View style={{ flexDirection: 'row' }}>
                        <Input
                          containerStyle={{ paddingTop: 10, backgroundColor: 'black', width: Dimensions.get('window').width - 75, height: 75 }}
                          inputStyle={{ color: 'white' }}
                          placeholder="Search"
                          onChangeText={this.onSearchTextChange.bind(this)}
                        />
                        <Button
                          buttonStyle={{ paddingTop: 20, backgroundColor: 'black', width: 50, height: 75 }}
                          title='Go'
                          onPress={this.Pressed.bind(this)}
                        />
                      </View>
                    </Overlay>
                  }
                  <KeyboardSpacer />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onHomePressed.bind(this)}>
                <Icon
                  iconStyle={{ paddingHorizontal: 10 }}
                  reverse
                  size={28}
                  name='home'
                  type='material'
                />
              </TouchableOpacity>
          </View>
  );
  }
  }

const mapStateToProps = (state) => ({
  query: state.news.query,
  loading: state.news.loading
});


export default connect(mapStateToProps, { searchPressed, searchText, fetchNews })(RightComponent);
