import React from 'react';
import Button from 'components/ui/Button';

const TypographySettings = ({ brandingData, setBrandingData }) => {
  const fontOptions = [
    { value: 'Inter', label: 'Inter (Default)', category: 'Sans-serif' },
    { value: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
    { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
    { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
    { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans-serif' },
    { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
    { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Monospace' }
  ];

  const typographyScales = [
    { label: 'Headings', key: 'headingScale', sizes: ['36px', '30px', '24px', '20px'] },
    { label: 'Body Text', key: 'bodyScale', sizes: ['16px', '14px', '12px'] },
    { label: 'UI Elements', key: 'uiScale', sizes: ['14px', '12px', '10px'] }
  ];

  const handleFontChange = (fontFamily) => {
    setBrandingData(prev => ({ ...prev, fontFamily }));
  };

  const previewText = {
    heading: 'developerbikash.com CRM Platform',
    subheading: 'Comprehensive Business Management',
    body: 'This is how your body text will appear throughout the CRM interface. It should be highly readable and professional.',
    ui: 'Button Text • Navigation Items • Form Labels'
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Typography Settings</h3>
        <p className="text-sm text-text-secondary mb-6">
          Configure fonts and text styles for consistent branding across your CRM.
          <span className="block mt-1 font-medium text-brand-primary">
            Professional typography by developerbikash.com
          </span>
        </p>
      </div>

      {/* Font Family Selection */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Font Family</h4>
        <div className="space-y-3">
          {fontOptions?.map((font) => (
            <div
              key={font?.value}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                brandingData?.fontFamily === font?.value
                  ? 'border-primary bg-primary-50' :'border-border hover:border-primary-300'
              }`}
              onClick={() => handleFontChange(font?.value)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-medium text-text-primary">{font?.label}</span>
                  <span className="text-xs text-text-secondary ml-2">({font?.category})</span>
                </div>
                {brandingData?.fontFamily === font?.value && (
                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div
                className="text-sm text-text-secondary"
                style={{ fontFamily: font?.value }}
              >
                The quick brown fox jumps over the lazy dog
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography Scale */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Typography Scale</h4>
        <div className="space-y-4">
          {typographyScales?.map((scale) => (
            <div key={scale?.key} className="border border-border rounded-lg p-4">
              <h5 className="font-medium text-text-primary mb-3">{scale?.label}</h5>
              <div className="space-y-2">
                {scale?.sizes?.map((size, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span
                      className="text-text-primary"
                      style={{ 
                        fontSize: size,
                        fontFamily: brandingData?.fontFamily || 'Inter'
                      }}
                    >
                      Sample Text {size}
                    </span>
                    <span className="text-xs text-text-secondary">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Font Weights</h4>
        <div className="border border-border rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { weight: '400', label: 'Regular' },
              { weight: '500', label: 'Medium' },
              { weight: '600', label: 'Semibold' },
              { weight: '700', label: 'Bold' }
            ]?.map((weight) => (
              <div key={weight?.weight} className="text-center">
                <div
                  className="text-lg mb-1"
                  style={{
                    fontFamily: brandingData?.fontFamily || 'Inter',
                    fontWeight: weight?.weight
                  }}
                >
                  Aa
                </div>
                <div className="text-xs text-text-secondary">{weight?.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Typography Preview */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Live Preview</h4>
        <div className="border border-border rounded-lg p-6 bg-white space-y-4">
          <div
            className="text-3xl font-bold text-text-primary"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            {previewText?.heading}
          </div>
          
          <div
            className="text-lg font-medium text-text-secondary"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            {previewText?.subheading}
          </div>
          
          <div
            className="text-base text-text-primary leading-relaxed"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            {previewText?.body}
          </div>
          
          <div
            className="text-sm font-medium text-text-secondary"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            {previewText?.ui}
          </div>
        </div>
      </div>

      {/* Advanced Typography Options */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Advanced Options</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Letter Spacing</span>
              <p className="text-xs text-text-secondary">Adjust character spacing</p>
            </div>
            <select className="px-3 py-1 text-sm border border-border rounded focus:ring-2 focus:ring-primary">
              <option>Normal</option>
              <option>Tight (-0.025em)</option>
              <option>Wide (0.025em)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Line Height</span>
              <p className="text-xs text-text-secondary">Adjust line spacing</p>
            </div>
            <select className="px-3 py-1 text-sm border border-border rounded focus:ring-2 focus:ring-primary">
              <option>Relaxed (1.625)</option>
              <option>Normal (1.5)</option>
              <option>Tight (1.25)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export Typography */}
      <div className="pt-4 border-t border-border">
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            Export Font Settings
          </Button>
          <Button variant="outline" size="sm">
            Generate Typography Guide
          </Button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Export typography settings for consistent implementation
        </p>
      </div>
    </div>
  );
};

export default TypographySettings;