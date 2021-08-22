import React from "react";
import { View, StyleSheet,Text} from "react-native";
import moment from 'moment';

import Swipe from "./Swipe";

export default function NewsDetailItem (props: any) {
    const {
        title, 
        author, 
        url, 
        created_at, 
        _highlightResult, 
        story_title, 
        objectID,
        comment_text} = props.item;
    
    const {onDelete} = props;

    return (
        <Swipe onDelete={onDelete} id={objectID} >
            <View style={styles.item}>
                <Text style={styles.title}>
                    {
                        story_title !== null 
                            ? story_title 
                            : title !== null 
                                ? title 
                                : 'Titulo no disponíble'
                    }
                </Text>
                <Text style={styles.author}>
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