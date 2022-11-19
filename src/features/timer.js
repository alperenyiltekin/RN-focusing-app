import { useState }             from "react";
import { 
    StyleSheet, 
    Text, 
    View,
    Vibration 
}                               from "react-native";
import { useKeepAwake }         from 'expo-keep-awake';
import { ProgressBar }          from 'react-native-paper'
import { Countdown }            from '../components/countdown';
import { RoundedButton }        from "../components/rounded-button";
import { colors }               from "../utils/colors";
import { spacing }              from "../utils/size";
import { Timing }               from "./timing";

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
    useKeepAwake();
    const [ isStarted, setIsStarted ]   = useState(false);
    const [ progress, setProgress ]     = useState(1);
    const [ minutes, setMinutes ]       = useState(0.1);

    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
        1 * ONE_SECOND_IN_MS,
    ];

    const onEnd = (reset) => {
        Vibration.vibrate(PATTERN);
        setIsStarted(false);
        setProgress(1);
        reset();
        onTimerEnd(focusSubject);
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.countdown}>
                <Countdown 
                    minutes     = { minutes}
                    isPaused    = { !isStarted }
                    onProgress  = { setProgress } 
                    onEnd       = { onEnd } 
                />
            </View>
            <View style= {{ paddingTop: spacing.xxl }}>
                <Text style={ styles.title }>Focusing on:</Text>
                <Text style={ styles.task }>{ focusSubject }</Text>
            </View>
            <View style= {{ paddingTop: spacing.sm }}>
                <ProgressBar 
                    progress={ progress }
                    color={ colors.progressBar } 
                    style={{ height: spacing.sm }}
                />
            </View>
            <View style={ styles.timingWrapper }>
                <Timing onChangeTime= { setMinutes } />
            </View> 
            <View style={ styles.buttonWrapper }>
                {
                    !isStarted && (
                        <RoundedButton 
                            title   = 'start' 
                            onPress = { () => setIsStarted(true) }
                        /> 
                    )
                }
                {
                    isStarted && (
                        <RoundedButton 
                            title   = 'pause' 
                            onPress = { () => setIsStarted(false) }
                        /> 
                    )
                }
            </View>
            <View style= { styles.clearSubjectWrapper}>
                <RoundedButton size={50} title='-' onPress= { () => { clearSubject()}}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    countdown: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timingWrapper: {
        flex: .1,
        flexDirection: 'row',
        paddingTop: spacing.xxl
    },
    buttonWrapper: {
        flex: .3,
        flexDirection: 'row',
        padding: spacing.md,
        justifyContent: 'center',
        alignItems:'center'
    },
    clearSubjectWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    title: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    task: {
        color: colors.white,
        textAlign: "center"
    }   
})