import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PrivacySettings = () => {
  const [activeSection, setActiveSection] = useState('retention');
  const [settings, setSettings] = useState({
    retention: {
      contactDataRetention: '7_years',
      dealDataRetention: '5_years',
      emailRetention: '3_years',
      auditLogRetention: '10_years',
      autoDelete: true,
      deletionNotifications: true
    },
    anonymization: {
      enableAutoAnonymization: true,
      anonymizationDelay: '30_days',
      fieldsToAnonymize: ['email', 'phone', 'address'],
      preserveStatistics: true
    },
    crossBorder: {
      enableTransfers: false,
      adequacyDecisionRequired: true,
      safeguardsRequired: true,
      transferLog: true
    },
    cookies: {
      cookieConsent: true,
      strictlyNecessary: true,
      analytics: false,
      marketing: false,
      functionalCookies: true
    }
  });

  const sections = [
    {
      id: 'retention',
      label: 'Data Retention',
      icon: 'Archive',
      description: 'Configure data retention policies and automatic deletion'
    },
    {
      id: 'anonymization',
      label: 'Anonymization',
      icon: 'EyeOff',
      description: 'Set up automatic data anonymization rules'
    },
    {
      id: 'crossBorder',
      label: 'Cross-Border Transfers',
      icon: 'Globe',
      description: 'Manage international data transfer restrictions'
    },
    {
      id: 'cookies',
      label: 'Cookie Settings',
      icon: 'Cookie',
      description: 'Configure cookie consent and tracking preferences'
    }
  ];

  const retentionOptions = [
    { value: '1_year', label: '1 Year' },
    { value: '2_years', label: '2 Years' },
    { value: '3_years', label: '3 Years' },
    { value: '5_years', label: '5 Years' },
    { value: '7_years', label: '7 Years' },
    { value: '10_years', label: '10 Years' },
    { value: 'indefinite', label: 'Indefinite' }
  ];

  const anonymizationDelayOptions = [
    { value: '7_days', label: '7 Days' },
    { value: '30_days', label: '30 Days' },
    { value: '90_days', label: '90 Days' },
    { value: '1_year', label: '1 Year' }
  ];

  const handleSettingUpdate = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    alert('Privacy settings have been updated successfully!');
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset to default settings logic
      alert('Settings have been reset to defaults');
    }
  };

  const renderRetentionSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Data Retention Periods</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Contact Data Retention
              </label>
              <select
                value={settings.retention.contactDataRetention}
                onChange={(e) => handleSettingUpdate('retention', 'contactDataRetention', e.target.value)}
                className="input-field"
              >
                {retentionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Deal Data Retention
              </label>
              <select
                value={settings.retention.dealDataRetention}
                onChange={(e) => handleSettingUpdate('retention', 'dealDataRetention', e.target.value)}
                className="input-field"
              >
                {retentionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email Data Retention
              </label>
              <select
                value={settings.retention.emailRetention}
                onChange={(e) => handleSettingUpdate('retention', 'emailRetention', e.target.value)}
                className="input-field"
              >
                {retentionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Audit Log Retention
              </label>
              <select
                value={settings.retention.auditLogRetention}
                onChange={(e) => handleSettingUpdate('retention', 'auditLogRetention', e.target.value)}
                className="input-field"
              >
                {retentionOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Automatic Deletion</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.retention.autoDelete}
              onChange={(e) => handleSettingUpdate('retention', 'autoDelete', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Enable automatic deletion</span>
              <p className="text-xs text-text-secondary">Automatically delete data when retention period expires</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.retention.deletionNotifications}
              onChange={(e) => handleSettingUpdate('retention', 'deletionNotifications', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Send deletion notifications</span>
              <p className="text-xs text-text-secondary">Notify administrators before automatic deletion occurs</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAnonymizationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Anonymization Rules</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.anonymization.enableAutoAnonymization}
              onChange={(e) => handleSettingUpdate('anonymization', 'enableAutoAnonymization', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Enable automatic anonymization</span>
              <p className="text-xs text-text-secondary">Automatically anonymize data after specified period</p>
            </div>
          </label>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Anonymization Delay
            </label>
            <select
              value={settings.anonymization.anonymizationDelay}
              onChange={(e) => handleSettingUpdate('anonymization', 'anonymizationDelay', e.target.value)}
              className="input-field"
              disabled={!settings.anonymization.enableAutoAnonymization}
            >
              {anonymizationDelayOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Fields to Anonymize
            </label>
            <div className="space-y-2">
              {['email', 'phone', 'address', 'name', 'company'].map(field => (
                <label key={field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.anonymization.fieldsToAnonymize.includes(field)}
                    onChange={(e) => {
                      const fields = settings.anonymization.fieldsToAnonymize;
                      const newFields = e.target.checked
                        ? [...fields, field]
                        : fields.filter(f => f !== field);
                      handleSettingUpdate('anonymization', 'fieldsToAnonymize', newFields);
                    }}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-text-primary capitalize">{field}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.anonymization.preserveStatistics}
              onChange={(e) => handleSettingUpdate('anonymization', 'preserveStatistics', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Preserve statistical data</span>
              <p className="text-xs text-text-secondary">Keep aggregated statistics while anonymizing personal data</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderCrossBorderSettings = () => (
    <div className="space-y-6">
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning-800">International Data Transfers</h4>
            <p className="text-warning-700 text-sm mt-1">
              GDPR restricts data transfers outside the EU/EEA. Ensure proper safeguards are in place.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.crossBorder.enableTransfers}
            onChange={(e) => handleSettingUpdate('crossBorder', 'enableTransfers', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
          />
          <div>
            <span className="text-sm font-medium text-text-primary">Enable cross-border data transfers</span>
            <p className="text-xs text-text-secondary">Allow data transfers to countries outside EU/EEA</p>
          </div>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.crossBorder.adequacyDecisionRequired}
            onChange={(e) => handleSettingUpdate('crossBorder', 'adequacyDecisionRequired', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            disabled={!settings.crossBorder.enableTransfers}
          />
          <div>
            <span className="text-sm font-medium text-text-primary">Require adequacy decision</span>
            <p className="text-xs text-text-secondary">Only transfer to countries with EU adequacy decision</p>
          </div>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.crossBorder.safeguardsRequired}
            onChange={(e) => handleSettingUpdate('crossBorder', 'safeguardsRequired', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            disabled={!settings.crossBorder.enableTransfers}
          />
          <div>
            <span className="text-sm font-medium text-text-primary">Require appropriate safeguards</span>
            <p className="text-xs text-text-secondary">Ensure SCCs or other safeguards are in place</p>
          </div>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={settings.crossBorder.transferLog}
            onChange={(e) => handleSettingUpdate('crossBorder', 'transferLog', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            disabled={!settings.crossBorder.enableTransfers}
          />
          <div>
            <span className="text-sm font-medium text-text-primary">Log all transfers</span>
            <p className="text-xs text-text-secondary">Maintain detailed log of all cross-border transfers</p>
          </div>
        </label>
      </div>
    </div>
  );

  const renderCookieSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Cookie Consent Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.cookies.cookieConsent}
              onChange={(e) => handleSettingUpdate('cookies', 'cookieConsent', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
            />
            <div>
              <span className="text-sm font-medium text-text-primary">Enable cookie consent banner</span>
              <p className="text-xs text-text-secondary">Display cookie consent banner to website visitors</p>
            </div>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-text-primary mb-4">Cookie Categories</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Strictly Necessary</span>
              <p className="text-xs text-text-secondary">Required for basic site functionality</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-text-secondary mr-2">Always Active</span>
              <div className="w-6 h-3 bg-success rounded-full">
                <div className="w-2.5 h-2.5 bg-white rounded-full transform translate-x-3.5 translate-y-0.5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Analytics</span>
              <p className="text-xs text-text-secondary">Help us understand how visitors use our website</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('cookies', 'analytics', !settings.cookies.analytics)}
              className={`w-6 h-3 rounded-full transition-colors ${
                settings.cookies.analytics ? 'bg-success' : 'bg-border'
              }`}
            >
              <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform ${
                settings.cookies.analytics 
                  ? 'transform translate-x-3.5 translate-y-0.5' 
                  : 'transform translate-x-0.5 translate-y-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Marketing</span>
              <p className="text-xs text-text-secondary">Used to track visitors and show personalized ads</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('cookies', 'marketing', !settings.cookies.marketing)}
              className={`w-6 h-3 rounded-full transition-colors ${
                settings.cookies.marketing ? 'bg-success' : 'bg-border'
              }`}
            >
              <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform ${
                settings.cookies.marketing 
                  ? 'transform translate-x-3.5 translate-y-0.5' 
                  : 'transform translate-x-0.5 translate-y-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <span className="text-sm font-medium text-text-primary">Functional</span>
              <p className="text-xs text-text-secondary">Enable enhanced functionality and personalization</p>
            </div>
            <button
              onClick={() => handleSettingUpdate('cookies', 'functionalCookies', !settings.cookies.functionalCookies)}
              className={`w-6 h-3 rounded-full transition-colors ${
                settings.cookies.functionalCookies ? 'bg-success' : 'bg-border'
              }`}
            >
              <div className={`w-2.5 h-2.5 bg-white rounded-full transition-transform ${
                settings.cookies.functionalCookies 
                  ? 'transform translate-x-3.5 translate-y-0.5' 
                  : 'transform translate-x-0.5 translate-y-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              activeSection === section.id
                ? 'border-primary bg-primary-50' :'border-border bg-surface hover:border-border-dark hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={section.icon} size={20} className={
                activeSection === section.id ? 'text-primary' : 'text-text-secondary'
              } />
              <h3 className={`font-medium ${
                activeSection === section.id ? 'text-primary' : 'text-text-primary'
              }`}>
                {section.label}
              </h3>
            </div>
            <p className="text-sm text-text-secondary">{section.description}</p>
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="card p-6">
        {activeSection === 'retention' && renderRetentionSettings()}
        {activeSection === 'anonymization' && renderAnonymizationSettings()}
        {activeSection === 'crossBorder' && renderCrossBorderSettings()}
        {activeSection === 'cookies' && renderCookieSettings()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleResetToDefaults}
          className="px-6 py-2 text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-surface-hover transition-colors"
        >
          Reset to Defaults
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveSettings}
            className="btn-secondary"
          >
            Save Draft
          </button>
          <button
            onClick={handleSaveSettings}
            className="btn-primary"
          >
            Save & Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;