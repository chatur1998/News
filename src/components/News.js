import React, { Component } from 'react';
import { Text,
          Button,
          ScrollView,
          View,
          StyleSheet,
          RefreshControl } from 'react-native';
import { Card, Header, ActivityIndicator } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchNews, refreshed, buttonPressed } from '../actions/MainActions';

class News extends Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    this.props.fetchNews();
  }

  onButtonPressed(article) {
    this.props.buttonPressed(article);
}

onRefresh() {
  this.setState({ refreshing: true });
  this.props.refreshed();
  this.setState({ refreshing: false });
}

  renderNews = () => {
    if (this.props.articles.data === undefined) {
        return console.log('Hello');
    }
     return this.props.articles.data.articles.map((article) => {
       return (
         <View style={{ paddingTop: 2 }}>
           <Card
             containerStyle={{
               backgroundColor: 'transparent',
               }}
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
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        >
          {this.renderNews()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.news.data,
});

export default connect(mapStateToProps, { fetchNews, refreshed, buttonPressed })(News);
