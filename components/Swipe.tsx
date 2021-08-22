import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { 
    Animated, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';

import {
    PanGestureHandler,
    State,
    RectButton,
} from 'react-native-gesture-handler';


export default function Swipe(props: any) {
    const { children, onDelete, id } = props;

    const RATIO = 3;
    const [message, setMessage] = useState('Delete');
    const [width, setWidth] = useState(0);
    const dragX = new Animated.Value(0);
    const transX = dragX.interpolate({
        inputRange: [0, RATIO],
        outputRange: [0, 1],
    });
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: dragX } }],
        { useNativeDriver: true }
    );
    const showRightAction = dragX.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [1, 0, 0],
    });


    const onHandlerStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            setMessage('Delete')
            const dragToss = 0.05;
            const endOffsetX =
                event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;

            let toValue = 0;
            if (endOffsetX > width / 2) {
                reset()
            } else if (endOffsetX < -width / 2) {
                toValue = -width * RATIO;
            }


            if (toValue !== 0) {
                console.log(toValue)
                setMessage('Deleting, ¡Tap to reset!')
            }

            Animated.spring(dragX, {
                velocity: event.nativeEvent.velocityX,
                tension: 15,
                friction: 5,
                toValue,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (toValue !== 0 && finished) {
                    onDelete(id);
                }
            });
        }
    };


    const onLayout = event => {
        setWidth(event.nativeEvent.layout.width);
    };

    const reset = () => {
        setMessage('Delete')
        Animated.spring(dragX, {
            toValue: 0,
            useNativeDriver: true,
            tension: 15,
            friction: 5,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.rowAction, { opacity: showRightAction }]}>
                <RectButton
                    style={[styles.rowAction, styles.rightAction]}
                    onPress={reset}>
                    <Text style={styles.actionButtonText}>
                        {message} {' '}
                        {
                            message === 'Delete' && (
                                <FontAwesome 
                                    size={20} 
                                    style={{ marginBottom: -10 }} 
                                    name={'trash'} 
                                    color={'white'} 
                                />
                            )
                        }
                    </Text>
                </RectButton>
            </Animated.View>
            <PanGestureHandler
                {...props}
                activeOffsetX={[-10, 10]}
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}>
                <Animated.View
                    style={{
                        transform: [{ translateX: transX }],
                    }}
                    onLayout={onLayout}>
                    {children}
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        width: '100%',
        borderBottomColor: '#e3e3e3',
        borderRadius: 15
    },
    rectButton: {
        flex: 1,
        height: 60,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    rowAction: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 5,
        borderRadius: 15,
    },
    rightAction: {
        backgroundColor: '#F44336',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
    },
});