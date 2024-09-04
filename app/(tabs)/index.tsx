import React, { useEffect, useState } from 'react'
import {
	Alert,
	BackHandler,
	Button,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native'

const App = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [pin, setPin] = useState('')
	const correctPin = '1234' // PIN kod

	useEffect(() => {
		const backAction = () => {
			// Power off tugmasi bosilganda bu modalni ochish
			setIsModalVisible(true)
			return true // Bu qaytarish ishni to'xtatadi va boshqa dasturga o'tishga imkon bermaydi
		}

		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			backAction
		)
		return () => backHandler.remove()
	}, [])

	const handlePinSubmit = () => {
		if (pin === correctPin) {
			Alert.alert('Success', 'Access granted')
			setIsModalVisible(false)
		} else {
			Alert.alert('Error', 'Incorrect PIN')
			setPin('')
		}
	}

	return (
		<View style={styles.container}>
			<Modal
				transparent={true}
				animationType='slide'
				visible={isModalVisible}
				onRequestClose={() => setIsModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.title}>Enter PIN to Access</Text>
						<TextInput
							style={styles.input}
							secureTextEntry
							placeholder='Enter PIN'
							keyboardType='numeric'
							value={pin}
							onChangeText={setPin}
						/>
						<Button title='Submit' onPress={handlePinSubmit} />
					</View>
				</View>
			</Modal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		fontSize: 18,
		marginBottom: 16,
	},
	input: {
		height: 40,
		borderColor: '#ddd',
		borderWidth: 1,
		marginBottom: 16,
		width: '100%',
		paddingHorizontal: 8,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		width: '80%',
		alignItems: 'center',
	},
})

export default App
