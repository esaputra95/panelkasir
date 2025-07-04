import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Control, FieldValues } from 'react-hook-form';
import { useImageController } from '../../hooks/slices/useImageController';

type ImageInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name?: keyof TFieldValues;
  control?: Control<TFieldValues>;
  onChange?: (file: File) => void;
  maxSizeMB?: number;
  maxFileSizeMB?: number;
  maxWidthOrHeight?: number;
  className?: string;
  label?: string;
};

const ImageInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  onChange,
  maxSizeMB = 1,
  maxFileSizeMB = 2,
  maxWidthOrHeight = 1920,
  className,
  label,
}: ImageInputProps<TFieldValues>) => {
  const controller = useImageController(name, control);
  const field = controller?.field;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null); // in MB
  const [compressedSize, setCompressedSize] = useState<number | null>(null); // in MB

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setOriginalSize(null);
    setCompressedSize(null);

    const originalSizeMB = file.size / 1024 / 1024;
    setOriginalSize(originalSizeMB);

    if (originalSizeMB > maxFileSizeMB) {
      setError(`Ukuran file terlalu besar (${originalSizeMB.toFixed(2)} MB). Maksimal ${maxFileSizeMB} MB.`);
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
      });

      const compressedSizeMB = compressed.size / 1024 / 1024;
      setCompressedSize(compressedSizeMB);

      if (compressedSizeMB > maxFileSizeMB) {
        setError(`Setelah kompresi, ukuran tetap ${compressedSizeMB.toFixed(2)} MB. Maksimal ${maxFileSizeMB} MB.`);
        return;
      }

      setPreviewUrl(URL.createObjectURL(compressed));
      field?.onChange(compressed);
      onChange?.(compressed);
    } catch (err) {
      console.error('Compression error:', err);
      setError('Terjadi kesalahan saat mengompresi gambar.');
    }
  };

  return (
    <div className={className}>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input type="file" accept="image/*" onChange={handleChange} />

      {originalSize !== null && (
        <p className="text-sm text-gray-600">
          Ukuran asli: {originalSize.toFixed(2)} MB
        </p>
      )}
      {compressedSize !== null && (
        <p className="text-sm text-gray-600">
          Ukuran setelah kompres: {compressedSize.toFixed(2)} MB
        </p>
      )}

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="mt-2 w-32 h-32 object-cover rounded border"
        />
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default ImageInput;