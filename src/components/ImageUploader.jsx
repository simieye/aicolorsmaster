// @ts-ignore;
import React, { useRef, useState } from 'react';
// @ts-ignore;
import { Camera, Image as ImageIcon, X, Upload } from 'lucide-react';

export function ImageUploader({
  onImagesSelected,
  maxImages = 3,
  disabled = false
}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const handleFileSelect = event => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      type: 'upload'
    }));
    const updatedImages = [...selectedImages, ...newImages].slice(0, maxImages);
    setSelectedImages(updatedImages);
    onImagesSelected && onImagesSelected(updatedImages);
  };
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const newImage = {
          file: blob,
          url,
          name: `photo_${Date.now()}.jpg`,
          type: 'camera'
        };
        const updatedImages = [...selectedImages, newImage].slice(0, maxImages);
        setSelectedImages(updatedImages);
        onImagesSelected && onImagesSelected(updatedImages);
        closeCamera();
      }, 'image/jpeg');
    }
  };
  const removeImage = index => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesSelected && onImagesSelected(updatedImages);
  };
  return <div className="space-y-3">
      {/* 图片预览 */}
      {selectedImages.length > 0 && <div className="grid grid-cols-3 gap-2">
          {selectedImages.map((image, index) => <div key={index} className="relative group">
              <img src={image.url} alt={image.name} className="w-full h-20 object-cover rounded-lg" />
              <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                {image.type === 'camera' ? <Camera className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
              </div>
            </div>)}
        </div>}

      {/* 操作按钮 */}
      <div className="flex space-x-2">
        <button onClick={() => fileInputRef.current?.click()} disabled={disabled || selectedImages.length >= maxImages} className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-colors ${disabled || selectedImages.length >= maxImages ? 'border-gray-200 text-gray-400' : 'border-purple-300 hover:border-purple-500 text-purple-600'}`}>
          <Upload className="w-4 h-4" />
          <span className="text-sm">上传图片</span>
        </button>
        
        <button onClick={openCamera} disabled={disabled || selectedImages.length >= maxImages} className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed transition-colors ${disabled || selectedImages.length >= maxImages ? 'border-gray-200 text-gray-400' : 'border-purple-300 hover:border-purple-500 text-purple-600'}`}>
          <Camera className="w-4 h-4" />
          <span className="text-sm">拍照</span>
        </button>
      </div>

      {/* 隐藏的文件输入 */}
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />

      {/* 相机弹窗 */}
      {isCameraOpen && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">拍照</h3>
                <button onClick={closeCamera} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline className="w-full h-64 object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="p-4 flex justify-center space-x-4">
              <button onClick={closeCamera} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                取消
              </button>
              <button onClick={capturePhoto} className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                拍照
              </button>
            </div>
          </div>
        </div>}
    </div>;
}