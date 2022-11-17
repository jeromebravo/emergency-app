import { InterfaceToastProps } from 'native-base/lib/typescript/components/composites/Toast';

export const defaultToast: InterfaceToastProps = {
  placement: 'top-right',
  shadow: 'none'
}

export const errorToast = {
  backgroundColor: 'red.500',
  ...defaultToast
}

export const successToast = {
  backgroundColor: 'green.500',
  ...defaultToast
}

export const possibleScenarios = [
  'Victim can be hit by a vehicle, raped, stabbed, or shot.',
  'The fire might be big and lives of many people might be in danger.'
];

export const colors = {
  black: '#1f2937',
  primary: '#59B3D0',
  white: '#FFFFFF'
}

export const entityTypes = [
  'Police Station',
  'Baranggay Hall',
  'Hospital / Clinic',
  'Fire Station'
];

export const professionCategories = ['Safety Related', 'Fire Safety Related', 'Medical Related', 'Others'];

export const safetyRelatedProfessions = [
  'Police',
  'Army',
  'Navy',
  'Marine',
  'Air Force',
  'Tanod',
  'Security Guard'
];

export const fireSafetyRelatedProfessions = ['Fire Fighter', 'Fire Volunteer'];

export const medicalRelatedProfessions = [
  'Nurse',
  'Doctor',
  'First Aider',
  'Medical Volunteer',
  'Medical Student'
];