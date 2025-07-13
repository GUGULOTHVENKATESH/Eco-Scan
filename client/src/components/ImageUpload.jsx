import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageSelect, isAnalyzing }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  };

  const handleInputChange = (e) => {
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
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const openCameraDialog = () => {
    cameraInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 upload-area ${
          dragOver
            ? 'border-eco-green-400 bg-eco-green-50 drag-over'
            : selectedImage
            ? 'border-eco-green-300 bg-eco-green-50'
            : 'border-gray-300 hover:border-eco-green-400 hover:bg-eco-green-50'
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
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            <button
              onClick={clearImage}
              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
              disabled={isAnalyzing}
            >
              <X size={16} />
            </button>
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl backdrop-blur-sm">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <div className="font-semibold text-lg">Analyzing Image...</div>
                  <div className="text-sm opacity-90">AI is identifying clothing items</div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-eco-green-100 to-blue-100 p-4 rounded-2xl">
                <Upload className="w-12 h-12 text-eco-green-600" />
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Upload Clothing Image
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                Drag and drop your image here, or choose from the options below
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={openFileDialog}
                className="flex items-center justify-center space-x-2 bg-eco-green-600 text-white px-6 py-3 rounded-xl hover:bg-eco-green-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                disabled={isAnalyzing}
              >
                <ImageIcon size={20} />
                <span>Choose File</span>
              </button>
              
              <button
                onClick={openCameraDialog}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                disabled={isAnalyzing}
              >
                <Camera size={20} />
                <span>Take Photo</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Supports JPG, PNG, GIF up to 10MB • AI-powered analysis
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;