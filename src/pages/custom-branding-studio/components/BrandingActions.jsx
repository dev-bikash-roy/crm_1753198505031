import React, { useState } from 'react';
import Button from 'components/ui/Button';

const BrandingActions = ({ brandingData }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleApplyBranding = async () => {
    setIsApplying(true);
    
    // Simulate API call to apply branding
    setTimeout(() => {
      // Update the CSS variables dynamically
      document.documentElement.style.setProperty('--color-primary', brandingData?.primaryColor);
      document.documentElement.style.setProperty('--color-secondary', brandingData?.secondaryColor);
      document.documentElement.style.setProperty('--color-accent', brandingData?.accentColor);
      
      if (brandingData?.fontFamily) {
        document.documentElement.style.setProperty('--font-family', brandingData?.fontFamily);
      }
      
      setIsApplying(false);
      
      // Show success message
      alert('Branding applied successfully!');
    }, 2000);
  };

  const handlePreviewChanges = () => {
    // Open preview in new window or modal
    window.open('/preview-branding', '_blank');
  };

  const handleExportBrandKit = () => {
    setShowExportModal(true);
  };

  const generateBrandPackage = () => {
    const brandPackage = {
      brandName: brandingData?.brandName,
      colors: {
        primary: brandingData?.primaryColor,
        secondary: brandingData?.secondaryColor,
        accent: brandingData?.accentColor
      },
      typography: {
        fontFamily: brandingData?.fontFamily
      },
      assets: {
        logo: brandingData?.logoUrl,
        favicon: brandingData?.faviconUrl
      },
      customCSS: brandingData?.customCSS,
      generatedBy: 'developerbikash.com Custom Branding Studio',
      timestamp: new Date().toISOString()
    };

    // Create downloadable JSON file
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brandPackage, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${brandingData?.brandName || 'brand'}-package.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const exportOptions = [
    {
      id: 'complete-package',
      label: 'Complete Brand Package',
      description: 'All assets, colors, fonts, and guidelines',
      format: 'ZIP'
    },
    {
      id: 'css-variables',
      label: 'CSS Variables',
      description: 'Ready-to-use CSS custom properties',
      format: 'CSS'
    },
    {
      id: 'design-tokens',
      label: 'Design Tokens',
      description: 'JSON format for design systems',
      format: 'JSON'
    },
    {
      id: 'brand-guidelines',
      label: 'Brand Guidelines PDF',
      description: 'Professional brand usage guide',
      format: 'PDF'
    }
  ];

  return (
    <>
      <div className="space-y-4">
        {/* Primary Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleApplyBranding}
            disabled={isApplying}
            className="w-full"
            style={{ 
              backgroundColor: brandingData?.primaryColor,
              fontFamily: brandingData?.fontFamily || 'Inter'
            }}
          >
            {isApplying ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Applying Branding...</span>
              </div>
            ) : (
              'Apply Branding'
            )}
          </Button>

          <Button
            variant="outline"
            onClick={handlePreviewChanges}
            className="w-full"
            style={{ 
              borderColor: brandingData?.secondaryColor,
              color: brandingData?.secondaryColor,
              fontFamily: brandingData?.fontFamily || 'Inter'
            }}
          >
            Preview Changes
          </Button>

          <Button
            variant="outline"
            onClick={handleExportBrandKit}
            className="w-full"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            Export Brand Kit
          </Button>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="text-sm font-medium text-text-primary mb-2">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 text-xs bg-surface-hover rounded-lg hover:bg-border transition-colors">
              Save Draft
            </button>
            <button className="p-2 text-xs bg-surface-hover rounded-lg hover:bg-border transition-colors">
              Reset All
            </button>
            <button className="p-2 text-xs bg-surface-hover rounded-lg hover:bg-border transition-colors">
              Load Preset
            </button>
            <button className="p-2 text-xs bg-surface-hover rounded-lg hover:bg-border transition-colors">
              Share Preview
            </button>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">Brand Completeness</span>
              <span className="font-medium text-success">85%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: '85%',
                  backgroundColor: brandingData?.accentColor 
                }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-text-secondary">Colors Set</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-text-secondary">Font Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                brandingData?.logoUrl ? 'bg-success' : 'bg-warning'
              }`}></div>
              <span className="text-text-secondary">Logo Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-text-secondary">Assets Pending</span>
            </div>
          </div>
        </div>

        {/* Powered By */}
        <div className="pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-xs text-text-tertiary">Powered by</div>
            <div className="text-sm font-semibold text-brand-primary">
              developerbikash.com
            </div>
            <div className="text-xs text-text-tertiary mt-1">
              Professional Branding Studio
            </div>
          </div>
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1300">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Export Brand Kit</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {exportOptions?.map((option) => (
                <div
                  key={option?.id}
                  className="border border-border rounded-lg p-4 hover:border-primary-300 cursor-pointer transition-colors"
                  onClick={generateBrandPackage}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-text-primary">{option?.label}</span>
                    <span className="text-xs bg-surface-hover px-2 py-1 rounded text-text-secondary">
                      {option?.format}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary">{option?.description}</div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowExportModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  generateBrandPackage();
                  setShowExportModal(false);
                }}
                className="flex-1"
                style={{ backgroundColor: brandingData?.primaryColor }}
              >
                Export All
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t border-border text-center">
              <div className="text-xs text-text-secondary">
                Export powered by <span className="font-semibold text-brand-primary">developerbikash.com</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandingActions;