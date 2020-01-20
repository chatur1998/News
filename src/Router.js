import React from 'react';
import { Scene, Router, Drawer } from 'react-native-router-flux';
import News from './components/News';
import Details from './components/Details';
import Search from './components/Search';
import SideMenu from './components/SideMenu';
import NavBar from './components/NavBar';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root'>
        <Drawer
                  hideNavBar
                  key="drawerMenu"
                  contentComponent={SideMenu}
                  drawerWidth={250}
                  drawerPosition="left"
        >
          <Scene key='News' component={News} title='News' initial navBar={NavBar} />
          <Scene key='details' component={Details} navBar={NavBar} />
          <Scene key='search' component={Search} navBar={NavBar} />
        </Drawer>
      </Scene>
  </Router>
);
};

export default RouterComponent;
