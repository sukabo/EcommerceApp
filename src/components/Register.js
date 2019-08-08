import React from 'react';
import {View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import {
    Input, Item, Form, Content , Spinner
} from 'native-base';

class Register extends React.Component {

    state = {
        email: null,
        repeatEmail: null,
        name: null,
        password: null,
        address: null,
        postcode: null,
        city: null,
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Content>
                    <Form>
                        <Item>
                            <Input 
                                placeholder='email'
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={email=>this.setState({email})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='repeat email'
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={repeatEmail=>this.setState({repeatEmail})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='name'
                                onChangeText={name=>this.setState({name})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='password'
                                secureTextEntry
                                onChangeText={password=>this.setState({password})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='address'
                                onChangeText={address=>this.setState({address})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='postcode'
                                onChangeText={postcode=>this.setState({postcode})} 
                            />
                        </Item>
                        <Item>
                            <Input 
                                placeholder='city'
                                onChangeText={city=>this.setState({city})} 
                            />
                        </Item>
                        <Button
                            title="Register"
                            block
                            style={{margin:20}}
                            onPress={()=> this.props.register({
                                email:this.state.email, 
                                repeatEmail: this.state.repeatEmail,
                                name: this.state.name,
                                password:this.state.password,
                                address:this.state.address,
                                postcode:this.state.postcode,
                                city:this.state.city,
                            })}
                        />
                    </Form>
                    <Button title="or Login" onPress={()=> this.props.changeToLogin()} />

                    {this.props.loading && <Spinner />}

                </Content>
                {
                    this.props.error && (
                        <Text
                            style={{alignSelf:'center',color:'red',position:'absolute',bottom:10}}
                        >
                            {this.props.error}
                        </Text>
                    )
                }
            </View>
        );
    }
}


Register.propTypes = {
    register: PropTypes.func.isRequired,
    changeToLogin: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
}

export default Register;






