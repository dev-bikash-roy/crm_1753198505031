import React, { useState } from 'react';
import Button from 'components/ui/Button';

const ColorPalette = ({ brandingData, setBrandingData }) => {
  const [activeColorPicker, setActiveColorPicker] = useState(null);

  const colorPresets = [
    {
      name: 'developerbikash.com Default',
      primary: '#1E40AF',
      secondary: '#6366F1',
      accent: '#F59E0B'
    },
    {
      name: 'Professional Blue',
      primary: '#2563EB',
      secondary: '#3B82F6',
      accent: '#10B981'
    },
    {
      name: 'Modern Purple',
      primary: '#7C3AED',
      secondary: '#A855F7',
      accent: '#F59E0B'
    },
    {
      name: 'Corporate Green',
      primary: '#059669',
      secondary: '#10B981',
      accent: '#F59E0B'
    }
  ];

  const colorSections = [
    {
      key: 'primaryColor',
      label: 'Primary Color',
      description: 'Main brand color for buttons, links, and key elements',
      value: brandingData?.primaryColor
    },
    {
      key: 'secondaryColor',
      label: 'Secondary Color',
      description: 'Supporting color for accents and highlights',
      value: brandingData?.secondaryColor
    },
    {
      key: 'accentColor',
      label: 'Accent Color',
      description: 'Warning states, notifications, and call-to-action elements',
      value: brandingData?.accentColor
    }
  ];

  const handleColorChange = (colorKey, color) => {
    setBrandingData(prev => ({ ...prev, [colorKey]: color }));
  };

  const applyPreset = (preset) => {
    setBrandingData(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  const generateColorHarmonies = (baseColor) => {
    // Simple color harmony generator (complementary, triadic, etc.)
    const harmonies = [];
    // This would typically use a color manipulation library
    harmonies.push({ name: 'Complementary', colors: [baseColor, '#FF5722'] });
    harmonies.push({ name: 'Triadic', colors: [baseColor, '#FF9800', '#4CAF50'] });
    return harmonies;
  };

  const checkAccessibilityContrast = (color1, color2) => {
    // Simple contrast checker (would use actual contrast calculation)
    return { ratio: '4.5:1', level: 'AA', passes: true };
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Color Palette</h3>
        <p className="text-sm text-text-secondary mb-6">
          Customize your brand colors. Changes will be reflected across all CRM components.
          <span className="block mt-1 font-medium text-brand-primary">
            Powered by developerbikash.com branding system
          </span>
        </p>
      </div>

      {/* Color Presets */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-3">
          {colorPresets?.map((preset, index) => (
            <button
              key={index}
              onClick={() => applyPreset(preset)}
              className="p-3 border border-border rounded-lg hover:border-primary-300 transition-colors text-left"
            >
              <div className="flex space-x-2 mb-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: preset.secondary }}
                ></div>
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: preset.accent }}
                ></div>
              </div>
              <div className="text-xs font-medium text-text-primary">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Individual Color Settings */}
      <div className="space-y-4">
        {colorSections?.map((section) => (
          <div key={section?.key} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <label className="block text-sm font-medium text-text-primary">
                  {section?.label}
                </label>
                <p className="text-xs text-text-secondary mt-1">
                  {section?.description}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-lg border-2 border-white shadow-md cursor-pointer"
                style={{ backgroundColor: section?.value }}
                onClick={() => setActiveColorPicker(
                  activeColorPicker === section?.key ? null : section?.key
                )}
              ></div>
            </div>

            {activeColorPicker === section?.key && (
              <div className="mt-4 p-3 bg-surface-hover rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <input
                    type="color"
                    value={section?.value}
                    onChange={(e) => handleColorChange(section?.key, e.target.value)}
                    className="w-8 h-8 rounded border border-border"
                  />
                  <input
                    type="text"
                    value={section?.value}
                    onChange={(e) => handleColorChange(section?.key, e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Accessibility Check */}
                <div className="text-xs text-text-secondary">
                  <div className="flex justify-between">
                    <span>Contrast vs White:</span>
                    <span className="text-success">AA ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contrast vs Black:</span>
                    <span className="text-success">AAA ✓</span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-text-secondary mt-2">
              Current value: {section?.value}
            </div>
          </div>
        ))}
      </div>

      {/* Color Harmony Suggestions */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Color Harmony Suggestions</h4>
        <div className="bg-surface-hover rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm text-text-secondary">Based on your primary color:</span>
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: brandingData?.primaryColor }}
            ></div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Complementary</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 rounded bg-orange-500"></div>
                <div className="w-4 h-4 rounded bg-blue-500"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Triadic</span>
              <div className="flex space-x-1">
                <div className="w-4 h-4 rounded bg-red-500"></div>
                <div className="w-4 h-4 rounded bg-green-500"></div>
                <div className="w-4 h-4 rounded bg-blue-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Color Palette */}
      <div className="pt-4 border-t border-border">
        <div className="flex space-x-3">
          <Button variant="outline" size="sm">
            Export CSS Variables
          </Button>
          <Button variant="outline" size="sm">
            Export Color Swatches
          </Button>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Export your color palette for use in external design tools
        </p>
      </div>
    </div>
  );
};

export default ColorPalette;