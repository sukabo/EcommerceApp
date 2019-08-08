/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import {createDrawerNavigator, createBottomTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  Icon, 
} from 'native-base';
import paymentsReducer from './src/reducers/payments';
import productsReducer from './src/reducers/products';
import userReducer from './src/reducers/user';

import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import MyCart from './src/screens/MyCart';
import MyProfile from './src/screens/MyProfile';
import Payment from './src/screens/Payment';
import PaymentConfirmation from './src/screens/PaymentConfirmation';
import Sales from './src/screens/Sales';

const stackNavOptions = (headerName) => Platform.OS === 'android' ? ({ navigation }) => ({
    title: headerName,  // Title to appear in header
    headerLeft: <Icon name="menu" size={35} onPress={ () => navigation.openDrawer() } />,
    tabBarOptions: {
      inactiveTintColor: '#aaa',
      activeTintColor: '#000',
      showLabel: true,
    }
  }) : null;

const ProductsNavigator = createStackNavigator({
  ProductList: { 
    screen: ProductList,
    navigationOptions: stackNavOptions('Home'),   
  } ,
  ProductDetail: { 
    screen: ProductDetail,
  },
});

const PurchaseNavigator =  createStackNavigator({
  MyCart,
  Payment,
  PaymentConfirmation,
});

let AppNavigator;
if (Platform.OS === 'ios'){
  AppNavigator = createBottomTabNavigator({
    Home: ProductsNavigator,
    MyCart: PurchaseNavigator,
    MyProfile,
    Sales,
  },{
    tabBarOptions: {
      inactiveTintColor: '#aaa',
      activeTintColor: '#000',
      showLabel: true,
    }
  });
}
else {
  AppNavigator = createDrawerNavigator({
    Home: {
      screen: ProductsNavigator
    },
    MyCart: PurchaseNavigator,
    MyProfile,
    Sales,
  });  
}

const AppContainer = createAppContainer(AppNavigator);

const store = createStore(
  combineReducers({paymentsReducer, productsReducer, userReducer}), 
  applyMiddleware(thunk),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}
