import React, { useState } from 'react';
import Button from 'components/ui/Button';

const AdvancedOptions = ({ brandingData, setBrandingData }) => {
  const [customCSS, setCustomCSS] = useState(brandingData?.customCSS || '');
  const [faviconSettings, setFaviconSettings] = useState({
    appleTouchIcon: '',
    browserIcon: '',
    tileColor: brandingData?.primaryColor
  });

  const handleCSSChange = (css) => {
    setCustomCSS(css);
    setBrandingData(prev => ({ ...prev, customCSS: css }));
  };

  const cssExamples = [
    {
      name: 'Custom Button Styles',
      code: `.custom-button {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}`
    },
    {
      name: 'Header Customization',
      code: `.crm-header {
  background: linear-gradient(135deg, ${brandingData?.primaryColor} 0%, ${brandingData?.secondaryColor} 100%);
  backdrop-filter: blur(10px);
}

.crm-header .brand-text {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}`
    },
    {
      name: 'Card Animations',
      code: `.crm-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.crm-card:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.crm-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${brandingData?.accentColor};
}`
    }
  ];

  const emailTemplateSettings = [
    {
      key: 'headerBackground',
      label: 'Email Header Background',
      value: brandingData?.primaryColor,
      description: 'Background color for email headers'
    },
    {
      key: 'linkColor',
      label: 'Email Link Color',
      value: brandingData?.secondaryColor,
      description: 'Color for links in email templates'
    },
    {
      key: 'buttonColor',
      label: 'Email Button Color',
      value: brandingData?.accentColor,
      description: 'Background color for email buttons'
    }
  ];

  const insertExample = (example) => {
    const newCSS = customCSS + '\n\n/* ' + example.name + ' */\n' + example.code;
    handleCSSChange(newCSS);
  };

  const validateCSS = () => {
    try {
      // Simple CSS validation - in a real app, you'd use a proper CSS parser
      if (customCSS.includes('<script') || customCSS.includes('javascript:')) {
        return { valid: false, message: 'Invalid CSS: Scripts not allowed' };
      }
      return { valid: true, message: 'CSS is valid' };
    } catch (error) {
      return { valid: false, message: 'Invalid CSS syntax' };
    }
  };

  const cssValidation = validateCSS();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Advanced Options</h3>
        <p className="text-sm text-text-secondary mb-6">
          Advanced customization options for professional branding control.
          <span className="block mt-1 font-medium text-brand-primary">
            Professional customization by developerbikash.com
          </span>
        </p>
      </div>

      {/* Custom CSS Editor */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Custom CSS Injection</h4>
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-surface-hover px-4 py-2 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-primary">CSS Editor</span>
              <div className={`px-2 py-1 rounded text-xs ${
                cssValidation?.valid 
                  ? 'bg-success-100 text-success-600' :'bg-error-100 text-error-600'
              }`}>
                {cssValidation?.message}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Format
              </Button>
              <Button variant="outline" size="sm">
                Validate
              </Button>
            </div>
          </div>
          
          <textarea
            value={customCSS}
            onChange={(e) => handleCSSChange(e.target.value)}
            placeholder="/* Enter your custom CSS here */
.custom-class {
  /* Your styles */
}"
            className="w-full h-48 p-4 font-mono text-sm bg-white border-none resize-none focus:outline-none"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          />
        </div>

        {/* CSS Examples */}
        <div className="mt-4">
          <h5 className="text-sm font-medium text-text-primary mb-2">Quick Examples</h5>
          <div className="grid grid-cols-1 gap-2">
            {cssExamples?.map((example, index) => (
              <button
                key={index}
                onClick={() => insertExample(example)}
                className="text-left p-3 border border-border rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="text-sm font-medium text-text-primary">{example?.name}</div>
                <div className="text-xs text-text-secondary mt-1">
                  {example?.code.split('\n')[0]}...
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Favicon Management */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Favicon Settings</h4>
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 border border-border rounded-lg flex items-center justify-center bg-surface">
                {brandingData?.faviconUrl ? (
                  <img src={brandingData?.faviconUrl} alt="Favicon" className="w-8 h-8" />
                ) : (
                  <span className="text-2xl">🏷️</span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-text-primary">Browser Favicon</div>
                <div className="text-sm text-text-secondary">32x32px recommended</div>
              </div>
              <Button variant="outline" size="sm">
                {brandingData?.faviconUrl ? 'Replace' : 'Upload'}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Apple Touch Icon</span>
                <Button variant="outline" size="sm">Upload 180x180</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Android Chrome Icon</span>
                <Button variant="outline" size="sm">Upload 192x192</Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Windows Tile Color</span>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={faviconSettings?.tileColor}
                    onChange={(e) => setFaviconSettings(prev => ({ ...prev, tileColor: e.target.value }))}
                    className="w-8 h-8 rounded border border-border"
                  />
                  <span className="text-sm text-text-secondary">{faviconSettings?.tileColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Template Branding */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Email Template Branding</h4>
        <div className="space-y-3">
          {emailTemplateSettings?.map((setting) => (
            <div key={setting?.key} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <span className="text-sm font-medium text-text-primary">{setting?.label}</span>
                <p className="text-xs text-text-secondary">{setting?.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={setting?.value}
                  onChange={(e) => {
                    // Update the corresponding branding data
                    if (setting?.key === 'headerBackground') {
                      setBrandingData(prev => ({ ...prev, primaryColor: e.target.value }));
                    }
                  }}
                  className="w-8 h-8 rounded border border-border"
                />
                <span className="text-xs text-text-secondary w-16">{setting?.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* White Label Settings */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">White Label Configuration</h4>
        <div className="border border-border rounded-lg p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-text-primary">Hide "Powered by" Text</span>
                <p className="text-xs text-text-secondary">Remove developerbikash.com attribution</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-text-primary">Custom Loading Screen</span>
                <p className="text-xs text-text-secondary">Replace default loading animation</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-text-primary">Custom Error Pages</span>
                <p className="text-xs text-text-secondary">Brand 404 and error pages</p>
              </div>
              <Button variant="outline" size="sm">Customize</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Export & Integration</h4>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline">
            Export Brand Package
          </Button>
          <Button variant="outline">
            Generate CSS File
          </Button>
          <Button variant="outline">
            Download Assets ZIP
          </Button>
          <Button variant="outline">
            API Integration
          </Button>
        </div>
      </div>

      {/* Advanced Settings Warning */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-warning text-xl">⚠️</span>
          <div>
            <div className="font-medium text-warning-600">Advanced Settings</div>
            <div className="text-sm text-warning-600 mt-1">
              Custom CSS and advanced options can affect system performance and appearance. 
              Test thoroughly before applying to production. Support provided by{' '}
              <span className="font-semibold">developerbikash.com</span>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;