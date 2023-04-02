import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';

//This is a low level pagination component, a better one use 
// numbers and a function to go to a specific page

/** The Pagination component
 * @param {string} text The text to show
 * @param {number} activePage The actual page
 * @param {number} totalPages The total pages
 * @param {function} onChange The function to call when the page changes
 * @returns The Pagination component */
export default function Pagination({ text, activePage, totalPages, onChange }) {
    return (
        <View style={styles.container}>
        <Button
            buttonStyle={styles.button}
            title="Anterior"
            onPress={() => onChange(activePage - 1)}
            disabled={activePage === 1}
        />
        <Text style={styles.text}>
            {text} {activePage} de {totalPages}
        </Text>
        <Button
            buttonStyle={styles.button}
            title="Siguiente"
            onPress={() => onChange(activePage + 1)}
            disabled={activePage === totalPages}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        marginVertical: 5,
    },
    button: {
        width: 100,
        borderRadius: 25,
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
    },
});