import React, { useState, useRef } from 'react';
import Button from 'components/ui/Button';

const LogoManagement = ({ brandingData, setBrandingData }) => {
  const [dragActive, setDragActive] = useState(false);
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], 'logo');
    }
  };

  const handleFileUpload = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') {
          setBrandingData(prev => ({ ...prev, logoUrl: e.target.result }));
        } else if (type === 'favicon') {
          setBrandingData(prev => ({ ...prev, faviconUrl: e.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const logoSizes = [
    { name: 'Header Logo', size: '180x60px', description: 'Main navigation logo' },
    { name: 'Sidebar Logo', size: '40x40px', description: 'Compact sidebar version' },
    { name: 'Favicon', size: '32x32px', description: 'Browser tab icon' },
    { name: 'Email Logo', size: '200x80px', description: 'Email template header' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Logo Upload</h3>
        
        {/* Main Logo Upload */}
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {brandingData?.logoUrl ? (
              <div className="space-y-4">
                <img
                  src={brandingData?.logoUrl}
                  alt="Brand Logo"
                  className="max-h-20 mx-auto"
                />
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    Change Logo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setBrandingData(prev => ({ ...prev, logoUrl: '' }))}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                  <span className="text-2xl text-gray-400">📁</span>
                </div>
                <div>
                  <p className="text-text-primary font-medium">Drop your logo here</p>
                  <p className="text-text-secondary text-sm">or click to browse</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => logoInputRef.current?.click()}
                >
                  Upload Logo
                </Button>
              </div>
            )}
            
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'logo')}
              className="hidden"
            />
          </div>

          {/* Favicon Upload */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-text-primary">Favicon</h4>
              {brandingData?.faviconUrl && (
                <img src={brandingData?.faviconUrl} alt="Favicon" className="w-8 h-8" />
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => faviconInputRef.current?.click()}
              >
                {brandingData?.faviconUrl ? 'Change Favicon' : 'Upload Favicon'}
              </Button>
              {brandingData?.faviconUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBrandingData(prev => ({ ...prev, faviconUrl: '' }))}
                >
                  Remove
                </Button>
              )}
            </div>
            
            <input
              ref={faviconInputRef}
              type="file"
              accept="image/x-icon,image/png"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'favicon')}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Logo Size Requirements */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Recommended Sizes</h4>
        <div className="space-y-2">
          {logoSizes?.map((size, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-surface-hover rounded">
              <div>
                <span className="text-sm font-medium text-text-primary">{size?.name}</span>
                <span className="text-xs text-text-secondary ml-2">({size?.size})</span>
              </div>
              <span className="text-xs text-text-tertiary">{size?.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Name */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Brand Name
        </label>
        <input
          type="text"
          value={brandingData?.brandName || ''}
          onChange={(e) => setBrandingData(prev => ({ ...prev, brandName: e.target.value }))}
          placeholder="Enter your brand name"
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <p className="text-xs text-text-secondary mt-1">
          This will appear in headers and branding elements
        </p>
      </div>

      {/* Logo Guidelines */}
      <div className="bg-surface-hover rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-2">Logo Guidelines</h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• Use PNG or SVG format for best quality</li>
          <li>• Ensure logos work on both light and dark backgrounds</li>
          <li>• Maximum file size: 5MB</li>
          <li>• Powered by <span className="font-semibold text-brand-primary">developerbikash.com</span></li>
        </ul>
      </div>
    </div>
  );
};

export default LogoManagement;