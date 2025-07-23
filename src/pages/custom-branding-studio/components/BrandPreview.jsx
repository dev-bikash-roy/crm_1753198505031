import React, { useState } from 'react';
import Button from 'components/ui/Button';

const BrandPreview = ({ brandingData }) => {
  const [previewMode, setPreviewMode] = useState('dashboard');

  const previewModes = [
    { id: 'dashboard', label: 'Dashboard', description: 'Main CRM dashboard' },
    { id: 'login', label: 'Login Screen', description: 'Authentication page' },
    { id: 'contacts', label: 'Contact List', description: 'Contact management' },
    { id: 'email', label: 'Email Template', description: 'Email branding' }
  ];

  const MockDashboard = () => (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div 
        className="px-6 py-4 border-b border-border flex items-center justify-between"
        style={{ backgroundColor: brandingData?.primaryColor }}
      >
        <div className="flex items-center space-x-3">
          {brandingData?.logoUrl ? (
            <img src={brandingData?.logoUrl} alt="Logo" className="h-8" />
          ) : (
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
          )}
          <div 
            className="text-white font-semibold"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          >
            {brandingData?.brandName || 'Your Brand'}
          </div>
        </div>
        <div className="text-white text-sm">developerbikash.com</div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div 
          className="text-xl font-bold text-text-primary mb-4"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          Sales Dashboard
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Deals', value: '$124,500', color: brandingData?.primaryColor },
            { label: 'Active Leads', value: '58', color: brandingData?.secondaryColor },
            { label: 'Conversion Rate', value: '24%', color: brandingData?.accentColor }
          ]?.map((stat, index) => (
            <div key={index} className="bg-surface p-4 rounded-lg border border-border">
              <div className="text-sm text-text-secondary mb-1">{stat?.label}</div>
              <div 
                className="text-2xl font-bold"
                style={{ 
                  color: stat?.color,
                  fontFamily: brandingData?.fontFamily || 'Inter'
                }}
              >
                {stat?.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <Button 
            style={{ 
              backgroundColor: brandingData?.primaryColor,
              fontFamily: brandingData?.fontFamily || 'Inter'
            }}
          >
            Add New Deal
          </Button>
          <Button 
            variant="outline" 
            style={{ 
              borderColor: brandingData?.secondaryColor,
              color: brandingData?.secondaryColor,
              fontFamily: brandingData?.fontFamily || 'Inter'
            }}
          >
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );

  const MockLogin = () => (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden max-w-md mx-auto">
      <div className="p-8 text-center">
        {brandingData?.logoUrl ? (
          <img src={brandingData?.logoUrl} alt="Logo" className="h-12 mx-auto mb-4" />
        ) : (
          <div className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
               style={{ backgroundColor: brandingData?.primaryColor }}>
            <span className="text-white font-bold text-xl">L</span>
          </div>
        )}
        
        <div 
          className="text-2xl font-bold text-text-primary mb-2"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          Welcome Back
        </div>
        
        <div className="text-text-secondary mb-6">
          Sign in to your {brandingData?.brandName || 'CRM'} account
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-border rounded-lg"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-border rounded-lg"
            style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
          />
          <Button
            className="w-full"
            style={{ 
              backgroundColor: brandingData?.primaryColor,
              fontFamily: brandingData?.fontFamily || 'Inter'
            }}
          >
            Sign In
          </Button>
        </div>

        <div className="mt-6 text-xs text-text-secondary">
          Powered by <span className="font-medium text-brand-primary">developerbikash.com</span>
        </div>
      </div>
    </div>
  );

  const MockContactList = () => (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <div 
          className="text-lg font-semibold text-text-primary"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          Contacts
        </div>
      </div>
      
      <div className="p-6">
        {[
          { name: 'John Smith', company: 'Acme Corp', email: 'john@acme.com' },
          { name: 'Sarah Johnson', company: 'Tech Solutions', email: 'sarah@tech.com' },
          { name: 'Mike Davis', company: 'Global Inc', email: 'mike@global.com' }
        ]?.map((contact, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: brandingData?.primaryColor }}
              >
                {contact?.name?.charAt(0)}
              </div>
              <div>
                <div 
                  className="font-medium text-text-primary"
                  style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
                >
                  {contact?.name}
                </div>
                <div className="text-sm text-text-secondary">{contact?.company}</div>
              </div>
            </div>
            <div className="text-sm text-text-secondary">{contact?.email}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const MockEmailTemplate = () => (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden max-w-lg mx-auto">
      <div 
        className="px-6 py-4 text-center text-white"
        style={{ backgroundColor: brandingData?.primaryColor }}
      >
        {brandingData?.logoUrl ? (
          <img src={brandingData?.logoUrl} alt="Logo" className="h-8 mx-auto mb-2" />
        ) : (
          <div className="w-8 h-8 mx-auto mb-2 bg-white bg-opacity-20 rounded flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
        )}
        <div 
          className="font-semibold"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          {brandingData?.brandName || 'Your Brand'}
        </div>
      </div>
      
      <div className="p-6">
        <div 
          className="text-lg font-semibold text-text-primary mb-4"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          Thank you for your interest!
        </div>
        
        <div 
          className="text-text-secondary mb-6 leading-relaxed"
          style={{ fontFamily: brandingData?.fontFamily || 'Inter' }}
        >
          We've received your inquiry and our team will get back to you within 24 hours. 
          In the meantime, feel free to explore our platform features.
        </div>

        <Button
          style={{ 
            backgroundColor: brandingData?.accentColor,
            fontFamily: brandingData?.fontFamily || 'Inter'
          }}
        >
          Explore Features
        </Button>

        <div className="mt-6 pt-4 border-t border-border text-xs text-text-secondary text-center">
          © 2025 {brandingData?.brandName || 'Your Brand'} | Powered by developerbikash.com
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (previewMode) {
      case 'dashboard':
        return <MockDashboard />;
      case 'login':
        return <MockLogin />;
      case 'contacts':
        return <MockContactList />;
      case 'email':
        return <MockEmailTemplate />;
      default:
        return <MockDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Mode Selector */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {previewModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => setPreviewMode(mode?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                previewMode === mode?.id
                  ? 'bg-primary text-white' :'bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {mode?.label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors">
            📱
          </button>
          <button className="p-2 rounded-lg bg-surface-hover hover:bg-border transition-colors">
            💻
          </button>
        </div>
      </div>

      {/* Preview Description */}
      <div className="text-sm text-text-secondary">
        {previewModes?.find(mode => mode?.id === previewMode)?.description}
      </div>

      {/* Preview Area */}
      <div className="bg-background min-h-96 rounded-lg p-6 border-2 border-dashed border-border">
        {renderPreview()}
      </div>

      {/* Brand Guidelines Summary */}
      <div className="bg-surface-hover rounded-lg p-4">
        <h4 className="font-medium text-text-primary mb-3">Current Branding</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Brand Name:</span>
            <span className="ml-2 font-medium text-text-primary">
              {brandingData?.brandName || 'Not set'}
            </span>
          </div>
          <div>
            <span className="text-text-secondary">Font Family:</span>
            <span className="ml-2 font-medium text-text-primary">
              {brandingData?.fontFamily || 'Inter'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-text-secondary">Primary:</span>
            <div 
              className="ml-2 w-4 h-4 rounded border"
              style={{ backgroundColor: brandingData?.primaryColor }}
            ></div>
            <span className="ml-1 text-xs text-text-secondary">
              {brandingData?.primaryColor}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-text-secondary">Secondary:</span>
            <div 
              className="ml-2 w-4 h-4 rounded border"
              style={{ backgroundColor: brandingData?.secondaryColor }}
            ></div>
            <span className="ml-1 text-xs text-text-secondary">
              {brandingData?.secondaryColor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPreview;