import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import LogoManagement from './components/LogoManagement';
import ColorPalette from './components/ColorPalette';
import TypographySettings from './components/TypographySettings';
import BrandPreview from './components/BrandPreview';
import BrandAssetLibrary from './components/BrandAssetLibrary';
import AdvancedOptions from './components/AdvancedOptions';
import BrandingActions from './components/BrandingActions';

const CustomBrandingStudio = () => {
  const [activeSection, setActiveSection] = useState('logo-management');
  const [brandingData, setBrandingData] = useState({
    logoUrl: '',
    faviconUrl: '',
    primaryColor: '#1E40AF',
    secondaryColor: '#6366F1',
    accentColor: '#F59E0B',
    fontFamily: 'Inter',
    customCSS: '',
    brandName: 'developerbikash.com',
  });

  const sidebarItems = [
    {
      id: 'logo-management',
      label: 'Logo Management',
      icon: 'Image',
      description: 'Upload and manage logos'
    },
    {
      id: 'color-palette',
      label: 'Color Palette',
      icon: 'Palette',
      description: 'Customize color scheme'
    },
    {
      id: 'typography',
      label: 'Typography',
      icon: 'Type',
      description: 'Font settings and styles'
    },
    {
      id: 'asset-library',
      label: 'Brand Assets',
      icon: 'FolderOpen',
      description: 'Manage brand materials'
    },
    {
      id: 'advanced',
      label: 'Advanced Options',
      icon: 'Code',
      description: 'Custom CSS and settings'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'logo-management':
        return <LogoManagement brandingData={brandingData} setBrandingData={setBrandingData} />;
      case 'color-palette':
        return <ColorPalette brandingData={brandingData} setBrandingData={setBrandingData} />;
      case 'typography':
        return <TypographySettings brandingData={brandingData} setBrandingData={setBrandingData} />;
      case 'asset-library':
        return <BrandAssetLibrary brandingData={brandingData} setBrandingData={setBrandingData} />;
      case 'advanced':
        return <AdvancedOptions brandingData={brandingData} setBrandingData={setBrandingData} />;
      default:
        return <LogoManagement brandingData={brandingData} setBrandingData={setBrandingData} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="max-w-full mx-auto">
          <div className="px-6 py-4">
            <Breadcrumb />
          </div>
          
          <div className="flex h-[calc(100vh-7rem)]">
            {/* Configuration Panel - Left Side */}
            <div className="w-1/3 bg-surface border-r border-border overflow-y-auto">
              {/* Sidebar Navigation */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-text-primary">Custom Branding Studio</h1>
                    <p className="text-sm text-text-secondary">developerbikash.com</p>
                  </div>
                </div>
                
                <nav className="space-y-2">
                  {sidebarItems?.map((item) => (
                    <button
                      key={item?.id}
                      onClick={() => setActiveSection(item?.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-150 ${
                        activeSection === item?.id
                          ? 'bg-primary-50 border border-primary-100 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 ${
                          activeSection === item?.id ? 'text-primary' : 'text-text-tertiary'
                        }`}>
                          {/* Icon placeholder */}
                          <div className="w-full h-full bg-current opacity-20 rounded"></div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{item?.label}</div>
                          <div className="text-xs text-text-tertiary">{item?.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Active Section Content */}
              <div className="p-6">
                {renderActiveSection()}
              </div>

              {/* Branding Actions */}
              <div className="p-6 border-t border-border bg-surface-hover">
                <BrandingActions brandingData={brandingData} />
              </div>
            </div>

            {/* Live Preview Panel - Right Side */}
            <div className="flex-1 bg-background overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-text-primary">Live Preview</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">Powered by</span>
                    <span className="text-sm font-semibold text-brand-primary">developerbikash.com</span>
                  </div>
                </div>
                <BrandPreview brandingData={brandingData} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomBrandingStudio;