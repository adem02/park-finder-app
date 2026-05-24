import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TextField, type TextFieldProps } from './text-field';

type PasswordFieldProps = Omit<
  TextFieldProps,
  'secureTextEntry' | 'rightAdornment'
>;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      secureTextEntry={!visible}
      autoComplete={props.autoComplete ?? 'password'}
      rightAdornment={
        <Pressable
          onPress={() => setVisible((v) => !v)}
          hitSlop={8}
          accessibilityLabel={
            visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
          }
        >
          <Ionicons
            name={visible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={Colors.muted}
          />
        </Pressable>
      }
    />
  );
}
