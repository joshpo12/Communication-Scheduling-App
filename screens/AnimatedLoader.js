import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import MaskedViewIOS from '@react-native-community/masked-view'
export default class AnimatedLoader extends React.Component {
    static navigationOptions = {
        title: 'AnimatedLoader', 
    };

    state = {
        loadingProgress: new Animated.Value(0),
        animationDone: false
    };

    async componentDidMount(){
        Animated.timing(this.state.loadingProgress, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true,
            delay: 400
        }).start(() => {
            this.setState({ animationDone: true });
        });
        const data = await this.navigateToLogin();
        if(data !== null){
            this.props.navigation.navigate('Login');
        }
    }

    navigateToLogin = async () => {
        const wait = time => new Promise ((resolve) => setTimeout(resolve,time));
        return wait(2500).then(() => this.props.navigation.navigate('Login'))
    };
    render() {
        const colorLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: "#F5B0C2"}]} />;

        const whiteLayer = <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FFF"}]} />;

        const imageScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [1, 15, 20, 100],
                        outputRange: [0.1, 0.06, 0.11 ,1.1]
                    })
                }
            ]
        };

        const opacity = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0,25,50],
                outputRange: [0,0,1],
                extrapolate: "clamp"
            })
        }

        return(
            <View style={{ flex: 1 }}>
                {colorLayer}
                <MaskedViewIOS
                    style={{ flex: 1 }}
                    maskElement={
                        <View style={styles.centered}>
                            <Animated.Image
                                source={require('../assets/goldicon.png')}
                                style={[{width:1000}, imageScale]}
                                resizeMode="contain" 
                            />  
                        </View>     
                    }
                >
                    {whiteLayer}
                    <Animated.View style={[opacity, styles.centered]}>
                        {/* <Text>Hello Morgan! :)</Text> */}
                    </Animated.View>
                </MaskedViewIOS>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});