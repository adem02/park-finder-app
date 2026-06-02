import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { parkingsApi } from '@/api/parkings.api';
import { ADD_PARKING_RULES } from '@/constants/Parking';
import { useCurrentLocation } from '@/hooks/use-current-location';
import { extractErrorMessage } from '@/lib/extract-error-message';
import type {
  AddParkingStep,
  NewParkingPhoto,
  ParkingCoordinates,
} from '@/types/parking.types';

interface UseAddParkingWizardReturn {
  step: AddParkingStep;
  coordinates: ParkingCoordinates | null;
  locating: boolean;
  refreshLocation: (silent?: boolean) => Promise<void>;

  name: string;
  setName: (value: string) => void;
  totalSpots: number;
  setTotalSpots: (value: number) => void;
  increment: () => void;
  decrement: () => void;

  photos: NewParkingPhoto[];
  canAddPhoto: boolean;
  pickPhoto: () => void;
  removePhoto: (index: number) => void;

  canGoNext: boolean;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: AddParkingStep) => void;

  submitting: boolean;
  submit: () => Promise<void>;
}

export function useAddParkingWizard(): UseAddParkingWizardReturn {
  const [step, setStep] = useState<AddParkingStep>(1);
  const [photos, setPhotos] = useState<NewParkingPhoto[]>([]);
  const [name, setName] = useState('');
  const [totalSpots, setTotalSpots] = useState(10);
  const [submitting, setSubmitting] = useState(false);

  const {
    coordinates,
    loading: locating,
    refresh: refreshLocation,
  } = useCurrentLocation();

  const appendPhotoFromAsset = useCallback(
    (asset: ImagePicker.ImagePickerAsset) => {
      const uri = asset.uri;
      const ext = uri.split('.').pop()?.toLowerCase() ?? 'jpg';
      const mimeType =
        asset.mimeType ?? `image/${ext === 'jpg' ? 'jpeg' : ext}`;
      const next: NewParkingPhoto = {
        uri,
        name: asset.fileName ?? `parking_${Date.now()}.${ext}`,
        mimeType,
      };
      setPhotos((prev) =>
        prev.length >= ADD_PARKING_RULES.photosMax ? prev : [...prev, next],
      );
    },
    [],
  );

  const takePhoto = useCallback(async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Caméra refusée', 'Autorisez l’accès à la caméra.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (res.canceled) return;
    appendPhotoFromAsset(res.assets[0]);
  }, [appendPhotoFromAsset]);

  const selectPhoto = useCallback(async () => {
    const remaining = ADD_PARKING_RULES.photosMax - photos.length;
    if (remaining <= 0) return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsMultipleSelection: remaining > 1,
      selectionLimit: remaining,
    });
    if (res.canceled) return;
    res.assets.slice(0, remaining).forEach(appendPhotoFromAsset);
  }, [appendPhotoFromAsset, photos.length]);

  const pickPhoto = useCallback(() => {
    if (photos.length >= ADD_PARKING_RULES.photosMax) {
      Alert.alert(
        'Limite atteinte',
        `Vous pouvez ajouter au maximum ${ADD_PARKING_RULES.photosMax} photos.`,
      );
      return;
    }
    Alert.alert('Ajouter une photo', undefined, [
      { text: 'Prendre une photo', onPress: () => void takePhoto() },
      { text: 'Choisir depuis la galerie', onPress: () => void selectPhoto() },
      { text: 'Annuler', style: 'cancel' },
    ]);
  }, [photos.length, selectPhoto, takePhoto]);

  const removePhoto = useCallback((index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const increment = useCallback(
    () => setTotalSpots((v) => Math.min(ADD_PARKING_RULES.spotsMax, v + 1)),
    [],
  );
  const decrement = useCallback(
    () => setTotalSpots((v) => Math.max(ADD_PARKING_RULES.spotsMin, v - 1)),
    [],
  );
  const setTotalSpotsClamped = useCallback((value: number) => {
    if (!Number.isFinite(value)) return;
    const clamped = Math.min(
      ADD_PARKING_RULES.spotsMax,
      Math.max(ADD_PARKING_RULES.spotsMin, Math.floor(value)),
    );
    setTotalSpots(clamped);
  }, []);

  const trimmedName = name.trim();
  const nameValid =
    trimmedName.length >= ADD_PARKING_RULES.nameMin &&
    trimmedName.length <= ADD_PARKING_RULES.nameMax;

  const canGoNext =
    (step === 1 && coordinates != null) ||
    (step === 2 && nameValid) ||
    step === 3;

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    if (step < 3) setStep((step + 1) as AddParkingStep);
  }, [canGoNext, step]);

  const goBack = useCallback(() => {
    if (step === 1) router.back();
    else setStep((step - 1) as AddParkingStep);
  }, [step]);

  const goToStep = useCallback((next: AddParkingStep) => setStep(next), []);

  const submit = useCallback(async () => {
    if (!coordinates) {
      Alert.alert('Position manquante', 'La position du parking est requise.');
      return;
    }
    if (!nameValid) {
      Alert.alert(
        'Nom invalide',
        `Le nom doit contenir entre ${ADD_PARKING_RULES.nameMin} et ${ADD_PARKING_RULES.nameMax} caractères.`,
      );
      return;
    }

    setSubmitting(true);
    try {
      await parkingsApi.create({
        name: trimmedName,
        totalSpots,
        coordinates,
        photos,
      });
      Alert.alert('Parking publié 🎉', 'Merci pour votre contribution !', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (e) {
      Alert.alert(
        'Échec de la publication',
        extractErrorMessage(e, 'Une erreur est survenue, réessayez.'),
      );
    } finally {
      setSubmitting(false);
    }
  }, [coordinates, nameValid, photos, totalSpots, trimmedName]);

  return {
    step,
    coordinates,
    locating,
    refreshLocation,
    name,
    setName,
    totalSpots,
    setTotalSpots: setTotalSpotsClamped,
    increment,
    decrement,
    photos,
    canAddPhoto: photos.length < ADD_PARKING_RULES.photosMax,
    pickPhoto,
    removePhoto,
    canGoNext,
    goNext,
    goBack,
    goToStep,
    submitting,
    submit,
  };
}
