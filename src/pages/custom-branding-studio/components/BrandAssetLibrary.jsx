import React, { useState, useRef } from 'react';
import Button from 'components/ui/Button';

const BrandAssetLibrary = ({ brandingData, setBrandingData }) => {
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: 'Primary Logo.png',
      type: 'logo',
      size: '2.4 MB',
      uploadDate: '2025-01-15',
      version: '1.0',
      url: brandingData?.logoUrl || ''
    },
    {
      id: 2,
      name: 'Brand Guidelines.pdf',
      type: 'document',
      size: '1.2 MB',
      uploadDate: '2025-01-10',
      version: '1.2'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const assetCategories = [
    { id: 'all', label: 'All Assets', count: assets?.length },
    { id: 'logo', label: 'Logos', count: assets?.filter(a => a?.type === 'logo')?.length },
    { id: 'image', label: 'Images', count: assets?.filter(a => a?.type === 'image')?.length },
    { id: 'document', label: 'Documents', count: assets?.filter(a => a?.type === 'document')?.length },
    { id: 'template', label: 'Templates', count: assets?.filter(a => a?.type === 'template')?.length }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

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
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    const newAsset = {
      id: Date.now(),
      name: file.name,
      type: getFileType(file.name),
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      uploadDate: new Date().toISOString().split('T')[0],
      version: '1.0',
      url: URL.createObjectURL(file)
    };

    setAssets(prev => [...prev, newAsset]);
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      if (fileName.toLowerCase().includes('logo')) return 'logo';
      return 'image';
    }
    if (['pdf', 'doc', 'docx'].includes(extension)) return 'document';
    if (['html', 'htm'].includes(extension)) return 'template';
    return 'other';
  };

  const getAssetIcon = (type) => {
    switch (type) {
      case 'logo': return '🏷️';
      case 'image': return '🖼️';
      case 'document': return '📄';
      case 'template': return '📋';
      default: return '📁';
    }
  };

  const filteredAssets = activeCategory === 'all' 
    ? assets 
    : assets?.filter(asset => asset?.type === activeCategory);

  const deleteAsset = (assetId) => {
    setAssets(prev => prev.filter(asset => asset?.id !== assetId));
    setSelectedAsset(null);
  };

  const downloadAsset = (asset) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = asset?.url || '#';
    link.download = asset?.name;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Brand Asset Library</h3>
        <p className="text-sm text-text-secondary mb-6">
          Centralized storage for all your brand assets with version control and usage tracking.
          <span className="block mt-1 font-medium text-brand-primary">
            Asset management powered by developerbikash.com
          </span>
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-4">
          <div className="text-4xl">📁</div>
          <div>
            <p className="text-text-primary font-medium">Drop files here to upload</p>
            <p className="text-text-secondary text-sm">or click to browse files</p>
          </div>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Browse Files
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.html,.htm"
          onChange={(e) => {
            if (e.target.files) {
              Array.from(e.target.files).forEach(handleFileUpload);
            }
          }}
          className="hidden"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Asset Categories</h4>
        <div className="flex flex-wrap gap-2">
          {assetCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category?.id
                  ? 'bg-primary text-white' :'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {category?.label} ({category?.count})
            </button>
          ))}
        </div>
      </div>

      {/* Asset Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-text-primary">
            {filteredAssets?.length} Assets
          </h4>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors">
              📊
            </button>
            <button className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors">
              ⚙️
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredAssets?.map((asset) => (
            <div
              key={asset?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedAsset?.id === asset?.id
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
              }`}
              onClick={() => setSelectedAsset(asset)}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getAssetIcon(asset?.type)}</div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{asset?.name}</div>
                  <div className="text-sm text-text-secondary">
                    {asset?.size} • v{asset?.version} • {asset?.uploadDate}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadAsset(asset);
                    }}
                    className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors"
                  >
                    💾
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteAsset(asset?.id);
                    }}
                    className="p-2 rounded-lg bg-surface-hover hover:bg-error-50 hover:text-error transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAssets?.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <div className="text-4xl mb-4">📁</div>
            <p>No assets found in this category</p>
            <p className="text-sm">Upload some files to get started</p>
          </div>
        )}
      </div>

      {/* Asset Details Panel */}
      {selectedAsset && (
        <div className="border border-border rounded-lg p-4 bg-surface">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Asset Details</h4>
            <button
              onClick={() => setSelectedAsset(null)}
              className="p-1 rounded-lg hover:bg-border transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm text-text-secondary">File Name:</span>
              <span className="ml-2 text-sm font-medium text-text-primary">
                {selectedAsset?.name}
              </span>
            </div>
            <div>
              <span className="text-sm text-text-secondary">File Size:</span>
              <span className="ml-2 text-sm text-text-primary">{selectedAsset?.size}</span>
            </div>
            <div>
              <span className="text-sm text-text-secondary">Version:</span>
              <span className="ml-2 text-sm text-text-primary">v{selectedAsset?.version}</span>
            </div>
            <div>
              <span className="text-sm text-text-secondary">Upload Date:</span>
              <span className="ml-2 text-sm text-text-primary">{selectedAsset?.uploadDate}</span>
            </div>
            
            {selectedAsset?.url && selectedAsset?.type === 'logo' && (
              <div>
                <span className="text-sm text-text-secondary">Preview:</span>
                <div className="mt-2">
                  <img
                    src={selectedAsset?.url}
                    alt={selectedAsset?.name}
                    className="max-w-32 max-h-20 border border-border rounded"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-2 mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => downloadAsset(selectedAsset)}>
              Download
            </Button>
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button variant="outline" size="sm">
              Replace
            </Button>
          </div>
        </div>
      )}

      {/* Usage Statistics */}
      <div className="bg-surface-hover rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Asset Library Statistics</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Total Assets:</span>
            <span className="ml-2 font-medium text-text-primary">{assets?.length}</span>
          </div>
          <div>
            <span className="text-text-secondary">Storage Used:</span>
            <span className="ml-2 font-medium text-text-primary">
              {assets?.reduce((acc, asset) => acc + parseFloat(asset?.size || 0), 0).toFixed(1)} MB
            </span>
          </div>
          <div>
            <span className="text-text-secondary">Last Updated:</span>
            <span className="ml-2 font-medium text-text-primary">Today</span>
          </div>
          <div>
            <span className="text-text-secondary">Version Control:</span>
            <span className="ml-2 font-medium text-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetLibrary;