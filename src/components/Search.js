import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Spinner } from 'react-native';
import { Card, Button, ActivityIndicator } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { buttonPressed, searchFail, setLoading } from '../actions/MainActions';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';

class Search extends Component {
  onButtonPressed(article) {
    this.props.buttonPressed(article);
}

  renderSearch = () => {
    if (this.props.search.data === undefined) {
        return console.log('Hello');
    }

    else if (this.props.search.data.articles.length === 0) {
      Alert.alert('Not found');
    }

     return this.props.search.data.articles.map((article) => {
       return (
         <View style={{ paddingTop: 2 }}>
           <Card
             containerStyle={{ backgroundColor: 'transparent' }}
             key={article.title}
             image={{ uri: article.urlToImage }}
             title={article.title}
             titleStyle={{ color: 'white' }}
           >
             <Text style={{ color: 'white' }}>{article.description}</Text>
             <Button
               onPress={() => this.onButtonPressed(article)}
               title='Know More'
             />
           </Card>
         </View>
       );
  });
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        {this.renderSearch()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.news.search,
  loading: state.news.loading
});

export default connect(mapStateToProps, { buttonPressed, searchFail, setLoading })(Search);
