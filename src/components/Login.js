import React from 'react';
import {View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import {
    Input, Item, Form, Content , Spinner
} from 'native-base';

class Login extends React.Component {

    state = {
        email: null,
        password: null,
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
                        <Item last>
                            <Input 
                                placeholder='password'
                                secureTextEntry
                                onChangeText={password=>this.setState({password})} 
                            />
                        </Item>
                        <Button
                            title="Login"
                            block
                            disabled={this.props.loading}
                            style={{margin:20}}
                            onPress={()=> this.props.login({
                                email:this.state.email, 
                                password:this.state.password})}
                        />
                    </Form>
                    <Button title='or Register' onPress={()=> this.props.changeToRegister()} />

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


Login.propTypes = {
    login: PropTypes.func.isRequired,
    changeToRegister: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
}

export default Login;






