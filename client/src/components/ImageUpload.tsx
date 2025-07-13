import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isAnalyzing }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragOver
            ? 'border-green-500 bg-green-50 scale-105'
            : selectedImage
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected clothing"
              className="w-full h-48 object-cover rounded-xl"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
              disabled={isAnalyzing}
            >
              <X size={16} />
            </button>
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                <div className="text-white font-medium">Analyzing...</div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">
                Upload a clothing image
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Drag and drop or click to select
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              disabled={isAnalyzing}
            >
              Choose Image
            </button>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
      
      <p className="text-xs text-gray-500 mt-2 text-center">
        Supports JPG, PNG, GIF up to 10MB
      </p>
    </div>
  );
};

export default ImageUpload;