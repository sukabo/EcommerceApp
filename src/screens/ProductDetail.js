import React from 'react';
import {ScrollView, Image} from 'react-native';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Icon, Button, Text, 
} from 'native-base';
import * as ProductActions from '../reducers/products';


class ProductDetail extends React.Component {

    static navigationOptions = ({ navigation }) => ({
            drawerLabel:'Home',
            tabBarIcon: () => <Icon name='home' />,
            // title: navigation.getParam('headerTitle', navigation.state.params.product.name),
            title: navigation.state.params.product.name,
        })

    onBuyPress(product){
        console.log("onBuyPress",this.props);
        this.props.addProductToCart(product);
        this.props.navigation.goBack();
        setTimeout( ()=> this.props.navigation.navigate('MyCart',{product}),0);
    }

    render() {
        const {navigation} = this.props;
        const {state} = navigation;
        const {params} = state;
        const {product} = params;

        return (
            <ScrollView>
                <Image 
                    style={{height:200, width:160, alignSelf: 'center', marginTop: 20}}
                    source={{uri:product.img}}
                />
                <Text
                    style={{alignSelf:'center',marginTop:20,fontSize:30,fontWeight:'bold'}}
                >
                    ${product.price}
                </Text>
                <Text
                    style={{alignSelf:'center',margin:20}}
                >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
                <Button
                    block
                    style={{margin:20}}
                    onPress={()=>this.onBuyPress(product)}
                >
                    <Text>Buy!</Text>
                </Button>
            </ScrollView>
        );
    }
}

ProductDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
      }).isRequired,
    addProductToCart: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
    }
}

function mapStateActionsToProps(dispatch){
    return bindActionCreators(ProductActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(ProductDetail);