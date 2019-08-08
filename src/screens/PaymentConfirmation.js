import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    Icon, Button, Text, Spinner, Title, ListItem, Badge
} from 'native-base';
import {NavigationActions, StackActions} from 'react-navigation';
import * as PaymentsActions from '../reducers/payments';
import * as UserActions from '../reducers/user';
import * as ProductActions from '../reducers/products';

class PaymentConfirmation extends React.Component {

    static navigationOptions = {
        drawerLabel:'My Cart',
        tabBarIcon: () => <Icon name='cart' />,
    }

    constructor(props){
        super(props);
        // save the app's state related to the cart in own component's state
        this.state = {
            cart: this.props.cart,
        }
    }

    // reset the card and payments details right after the screen is rendered 
    // as it won't be needed on any further occasion
    componentDidMount() {
        this.props.resetCart();
        this.props.resetPayment();
    }

    continueShopping() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName:'MyCart'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View>
                <Title style={{marginTop:20}}>Your purchase is complete!</Title>
                <Text style={{margin:20}}>
                    Thank you for buying with us. 
                    We sent you an email with the confirmation details and an invoice.
                    Here you can find a summary of your purchase: {' '}
                </Text>
                {
                    this.state.cart.map((p,i)=>(
                        <ListItem key={i} style={{justifyContent:'space-between'}}>
                            <Badge primary>
                                <Text>{p.quantity}</Text>
                            </Badge>
                            <Text>{p.name}</Text>
                            <Text>{p.price * p.quantity}</Text>
                        </ListItem>

                    ))
                }
                <Text style={{alignSelf:'flex-end', margin:10}}>
                    Total: ${this.state.cart.reduce((sum, p)=> sum+ p.price * p.quantity,0)}
                </Text>
                <Button
                    block
                    style={{margin:20}}
                    onPress={this.continueShopping.bind(this)}
                >
                    <Text>Continue Shopping</Text>
                </Button>
            </View>
        );
    }
}

PaymentConfirmation.propTypes = {
    cart: PropTypes.instanceOf(Array).isRequired,
    resetCart: PropTypes.func.isRequired,
    resetPayment: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    return {
        cart: state.productsReducer.cart || [],
    }
}

function mapStateActionsToProps(dispatch){
    return bindActionCreators(
        Object.assign({}, PaymentsActions, ProductActions, UserActions), 
        dispatch
    );
}

export default connect(mapStateToProps, mapStateActionsToProps)(PaymentConfirmation);



