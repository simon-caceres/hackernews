import React from "react";
import { StyleSheet} from "react-native";
import moment from 'moment';

import { Text, View } from './Themed';
import Swipe from "./Swipe";
import { ItemNewsProps } from '../types'

export default function NewsDetailItem (props: ItemNewsProps) {
    const {
        title, 
        author, 
        url, 
        created_at, 
        _highlightResult, 
        story_title, 
        objectID,
        story_url,
    } = props.item;

    let URL: string = url !== null && url !== undefined
                        ? url 
                        : story_url !== null && story_url !== undefined
                            ? story_url 
                            :  _highlightResult?.story_url?.value

    const {onDelete, navigation} = props;

    return (
        <Swipe onDelete={onDelete} id={objectID} >
            <View  
                lightColor="#eee" 
                darkColor="rgba(255,255,255,0.1)" 
                onTouchEnd={() => navigation.navigate('Modal', {url : URL})} 
                style={styles.item}
            >
                <Text 
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                    style={styles.title}
                >
                    {
                        story_title !== null 
                            ? story_title 
                            : title !== null 
                                ? title 
                                : 'Titulo no disponíble'
                    }
                </Text>
                <Text 
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                    style={styles.author}
                >
                    By: {' '}{author} | {moment().startOf(created_at).fromNow()} 
                </Text>
            </View>
        </Swipe>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        width: '100%',
        borderRadius: 15,
        elevation: 3
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3d3535',
        marginBottom: 20,
    },
    author: {
        fontSize: 12,
        fontWeight: '200',
        color: '#3d3535',
        alignSelf: 'flex-start',
    },
})