import React, { useState }  from 'react'
import { 
    StyleSheet,
    Text,
    View
}                           from 'react-native'
import { TextInput }        from 'react-native-paper'
import { RoundedButton }    from '../components/rounded-button'
import { colors }           from '../utils/colors'
import { spacing }          from '../utils/size'

export const Focus = ({ addSubject }) => {
    const [ subject, setSubject ] = useState(null);

    return (
        <View style={ styles.container }>
            <View style={ styles.inputContainer }>
                <TextInput 
                    style       = { styles.textInput }
                    label       = "What would you like to focus ?"
                    onChangeText= { setSubject }
                />
                <View style={ styles.button }>
                    <RoundedButton 
                        title   = '+'
                        size    = { 50 }
                        onPress = { () => addSubject(subject) }
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    inputContainer: {
        justifyContent      : 'top',
        flexDirection       : 'row',
        padding             : spacing.lg,
        
    },
    text: {
        color               : colors.white
    },
    textInput: {
        flex                : 1,
        marginRight         : spacing.sm
    },
    button: {
        justifyContent      : 'center'
    }
})