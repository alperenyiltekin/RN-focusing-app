import { useState } from 'react';
import { 
	Platform,
	SafeAreaView,
	StatusBar,
	StyleSheet, 
	Text, 
	View 
}                     	from 'react-native';
import { Focus } 		from './src/features/focus';
import { colors } 		from './src/utils/colors';
import { Timer }		from './src/features/timer';
import { FocusHistory } from './src/features/focus-history';

export default function App() {
	const [ currentSubject, setCurrentSubject ] = useState();
	const [ history, setHistory ] 				= useState([]);

	return (
    	<SafeAreaView style={styles.container}>
			{
				!currentSubject
					? 	<>
							<Focus addSubject={ setCurrentSubject } />
							<FocusHistory history={ history }/>	
						</>
					: 	<Timer 
							focusSubject= { currentSubject }
							onTimerEnd 	= { (subject) => {
								setHistory([ ...history, subject ])
							} }
							clearSubject= { () => { setCurrentSubject(null) } }
						/>
			}
			
    	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
    	flex				: 1,
		paddingTop			: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		backgroundColor		: colors.appBlue
  	},
});
