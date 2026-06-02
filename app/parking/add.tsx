import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressStepper } from '@/components/add-parking/progress-stepper';
import { StepDetails } from '@/components/add-parking/step-details';
import { StepLocation } from '@/components/add-parking/step-location';
import { StepPhoto } from '@/components/add-parking/step-photo';
import { Colors } from '@/constants/Colors';
import { useAddParkingWizard } from '@/hooks/use-add-parking-wizard';
import type { AddParkingStep } from '@/types/parking.types';

import { styles } from './add.styles';

const STEP_LABEL: Record<AddParkingStep, string> = {
  1: 'Localisation',
  2: 'Détails',
  3: 'Photos (optionnel)',
};

export default function AddParkingScreen() {
  const w = useAddParkingWizard();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.root} edges={['top']}>
        <View style={styles.header}>
          <Pressable onPress={w.goBack} hitSlop={12} style={styles.headerBack}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Ajouter un parking</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ProgressStepper step={w.step} label={STEP_LABEL[w.step]} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={styles.body}
            keyboardShouldPersistTaps="handled"
          >
            {w.step === 1 && (
              <StepLocation
                coordinates={w.coordinates}
                locating={w.locating}
                onRefresh={() => void w.refreshLocation()}
              />
            )}

            {w.step === 2 && (
              <StepDetails
                name={w.name}
                onNameChange={w.setName}
                totalSpots={w.totalSpots}
                onTotalSpotsChange={w.setTotalSpots}
                onIncrement={w.increment}
                onDecrement={w.decrement}
              />
            )}

            {w.step === 3 && (
              <StepPhoto
                photos={w.photos}
                canAddPhoto={w.canAddPhoto}
                onPick={w.pickPhoto}
                onRemove={w.removePhoto}
              />
            )}
          </ScrollView>

          <View style={styles.footer}>
            {w.step < 3 ? (
              <Pressable
                disabled={!w.canGoNext}
                onPress={w.goNext}
                style={[styles.cta, !w.canGoNext && styles.ctaDisabled]}
              >
                <Text style={styles.ctaLabel}>Continuer</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </Pressable>
            ) : (
              <Pressable
                disabled={w.submitting}
                onPress={w.submit}
                style={[styles.cta, w.submitting && styles.ctaDisabled]}
              >
                {w.submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.ctaLabel}>Publier</Text>
                    <Ionicons name="rocket" size={20} color="#fff" />
                  </>
                )}
              </Pressable>
            )}
            {w.step === 3 && (
              <Text style={styles.disclaimer}>
                En publiant, vous confirmez que ces informations sont exactes
                pour la communauté.
              </Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
