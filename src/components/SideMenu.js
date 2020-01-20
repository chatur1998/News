import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { itemPressed, categoryPressed } from '../actions/MainActions';

const menuCountries = [
  {
    id: 1,
    country: 'India',
    url: require('../icons/India.png'),
    code: 'in',
  },
  {
    id: 2,
    country: 'USA',
    url: require('../icons/USA.png'),
    code: 'us'
  },
  {
    id: 3,
    country: 'England',
    url: require('../icons/England.png'),
    code: 'gb',
  }
];

const menuCategories = [
  {
    id: 1,
    name: 'sports',
    title: 'Sports',
    language: 'in'
  },
  {
    id: 2,
    name: 'business',
    title: 'Business',
    language: 'in'
  },
  {
    id: 3,
    name: 'entertainment',
    title: 'Entertainment',
    language: 'in'
  },
  {
    id: 4,
    name: 'science',
    title: 'Science',
    language: 'in'
  },
  {
    id: 5,
    name: 'technology',
    title: 'Technology',
    language: 'in'
  },
];

class SideMenu extends Component {

  onItemPressed(name) {
    this.props.itemPressed(name);
    Actions.drawerClose();
  }

  onCategoryPressed(cName, lan) {
    this.props.categoryPressed(cName, lan);
    Actions.drawerClose();
  }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={{ color: 'white', paddingVertical: 15, fontSize: 20 }}>Countries</Text>
                {
                  menuCountries.map((item) => {
                    return (
                      <ListItem
                        containerStyle={{ backgroundColor: 'black' }}
                        key={item.id}
                        leftElement=<Image source={item.url} style={{ width: 40, height: 40 }} />
                        title={item.country}
                        titleStyle={{ color: 'white' }}
                        onPress={() => this.onItemPressed(item.code)}
                        bottomDivider
                      />
                    );
                  })
                }
                <Text style={{ color: 'white', paddingVertical: 25, fontSize: 20 }}>Categories</Text>
                  {
                    menuCategories.map((item) => {
                      return (
                        <ListItem
                          containerStyle={{ backgroundColor: 'black' }}
                          key={item.id}
                          title={item.title}
                          titleStyle={{ color: 'white' }}
                          onPress={() => this.onCategoryPressed(item.name, item.language)}
                          bottomDivider
                        />
                      );
                    })
                  }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'black',
        padding: 15,
    },
});

const mapStateToProps = (state) => ({
  open: state.news.string
});

export default connect(mapStateToProps, { itemPressed, categoryPressed })(SideMenu);
