import { Text, Pressable, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { GlobalStyles } from '../../constants/GlobalStyles';

type Props = {
   children: ReactNode;
   onPress: () => void;
 };

export default function Button({ children, onPress}: Props) {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
   button: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      margin: 4,
      backgroundColor: GlobalStyles.colors.primary800,
      elevation: 2,
      shadowColor: 'black',
      shadowOpacity: 0.15,
      shadowOffset: { width: 1, height: 1},
      shadowRadius: 2,
      borderRadius: 4
   },
   pressed: {
      opacity: 0.7
   },
   text: {
      textAlign: 'center',
      fontSize: 16,
      color: GlobalStyles.colors.primary50
   }
})