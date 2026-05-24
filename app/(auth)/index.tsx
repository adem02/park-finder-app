import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthHeader } from '@/components/auth/auth-header';
import { AuthTabs } from '@/components/auth/auth-tabs';
import { LegalFooter } from '@/components/auth/legal-footer';
import { OrDivider } from '@/components/ui/or-divider';
import { PasswordField } from '@/components/ui/password-field';
import { PrimaryButton } from '@/components/ui/primary-button';
import { SocialButton } from '@/components/ui/social-button';
import { TextField } from '@/components/ui/text-field';
import { useAuthForm } from '@/hooks/use-auth-form';
import { authStyles as s } from './index.styles';

const COPY = {
  login: {
    title: 'Content de vous revoir',
    subtitle: 'Accédez à votre compte pour gérer vos réservations.',
    submit: 'Se connecter',
  },
  register: {
    title: 'Créez votre compte',
    subtitle: 'Rejoignez ParkFinder pour réserver vos stationnements.',
    submit: 'Créer mon compte',
  },
} as const;

export default function AuthScreen() {
  const router = useRouter();
  const form = useAuthForm('login');
  const copy = COPY[form.mode];

  const handleClose = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <AuthHeader onClose={handleClose} />

      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.card}>
            <AuthTabs mode={form.mode} onChange={form.switchMode} />

            <View style={s.body}>
              <View style={s.intro}>
                <Text style={s.title}>{copy.title}</Text>
                <Text style={s.subtitle}>{copy.subtitle}</Text>
              </View>

              <View style={s.form}>
                {!form.isLogin && (
                  <TextField
                    label="Nom d'utilisateur"
                    value={form.username}
                    onChangeText={form.setUsername}
                    placeholder="Votre pseudo"
                    autoCapitalize="none"
                    autoComplete="username"
                    editable={!form.isSubmitting}
                  />
                )}

                <TextField
                  label="Email"
                  value={form.email}
                  onChangeText={form.setEmail}
                  placeholder="nom@exemple.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  editable={!form.isSubmitting}
                />

                <PasswordField
                  label="Mot de passe"
                  value={form.password}
                  onChangeText={form.setPassword}
                  placeholder="••••••••"
                  editable={!form.isSubmitting}
                  errorText={form.error ?? undefined}
                  rightAction={
                    form.isLogin ? (
                      <Pressable hitSlop={8}>
                        <Text style={s.forgot}>Oublié ?</Text>
                      </Pressable>
                    ) : undefined
                  }
                />

                <PrimaryButton
                  label={copy.submit}
                  loading={form.isSubmitting}
                  disabled={!form.canSubmit}
                  onPress={form.submit}
                />
              </View>

              <OrDivider />

              <View style={s.socials}>
                <SocialButton icon="logo-google" label="Google" />
                <SocialButton icon="logo-apple" label="Apple" iconSize={20} />
              </View>
            </View>

            <LegalFooter />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
