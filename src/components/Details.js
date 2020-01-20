import React, { Component } from 'react';
import { View, Platform, BackHandler } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';

class Details extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: this.props.url }}
          ref={(webView) => { this.webView.ref = webView; }}
          onNavigationStateChange={(navState) => { this.webView.canGoBack = navState.canGoBack; }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    articles: state.news.data,
    url: state.news.url,
    title: state.news.title
});

export default connect(mapStateToProps)(Details);
