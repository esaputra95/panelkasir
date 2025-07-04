/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, FieldValues, useController } from 'react-hook-form';

export function useImageController<TFieldValues extends FieldValues>(
  name?: keyof TFieldValues,
  control?: Control<TFieldValues>
) {
  const controller = useController({
    name: name as any,
    control: control as Control<TFieldValues>, 
  });
  if (!name || !control) {
    return undefined; 
  }

  return controller;
}