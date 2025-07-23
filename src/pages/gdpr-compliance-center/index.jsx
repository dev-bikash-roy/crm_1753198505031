import React, { useState, useEffect } from 'react';
import Header from 'components/ui/Header';
import Breadcrumb from 'components/ui/Breadcrumb';
import Icon from 'components/AppIcon';

import DataSubjectRequests from './components/DataSubjectRequests';
import ConsentManagement from './components/ConsentManagement';
import DataAuditTrail from './components/DataAuditTrail';
import PrivacySettings from './components/PrivacySettings';

const GdprComplianceCenter = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [complianceStatus, setComplianceStatus] = useState(null);

  const tabs = [
    { 
      id: 'requests', 
      label: 'Data Subject Requests', 
      icon: 'FileText', 
      description: 'Manage privacy requests and automated workflows' 
    },
    { 
      id: 'consent', 
      label: 'Consent Management', 
      icon: 'Shield', 
      description: 'Track opt-in/opt-out preferences and consent history' 
    },
    { 
      id: 'audit', 
      label: 'Data Audit Trail', 
      icon: 'Eye', 
      description: 'Searchable log of data access and modifications' 
    },
    { 
      id: 'settings', 
      label: 'Privacy Settings', 
      icon: 'Settings', 
      description: 'Configure data retention and privacy policies' 
    }
  ];

  // Mock compliance status data
  useEffect(() => {
    setComplianceStatus({
      overallScore: 94,
      pendingRequests: 3,
      overdueRequests: 1,
      consentRate: 87.2,
      dataRetentionCompliance: 96,
      lastAudit: '2025-07-15',
      nextAuditDue: '2025-10-15',
      riskLevel: 'low'
    });
  }, []);

  const getRiskLevelConfig = (riskLevel) => {
    switch (riskLevel) {
      case 'low':
        return { color: 'text-success', bgColor: 'bg-success-50', label: 'Low Risk' };
      case 'medium':
        return { color: 'text-warning-600', bgColor: 'bg-warning-50', label: 'Medium Risk' };
      case 'high':
        return { color: 'text-error', bgColor: 'bg-error-50', label: 'High Risk' };
      default:
        return { color: 'text-text-secondary', bgColor: 'bg-gray-50', label: 'Unknown' };
    }
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    alert('Compliance report is being generated. You will receive it via email shortly.');
  };

  const handleUpdatePrivacyPolicy = () => {
    // Navigate to privacy policy update
    alert('Redirecting to privacy policy management...');
  };

  const riskConfig = complianceStatus ? getRiskLevelConfig(complianceStatus.riskLevel) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">GDPR Compliance Center</h1>
              <p className="text-text-secondary">
                Comprehensive data privacy management and regulatory compliance • Powered by 
                <a href="https://developerbikash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700 ml-1 font-medium">
                  developerbikash.com
                </a>
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={handleGenerateReport}
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Generate Compliance Report</span>
              </button>
              
              <button
                onClick={handleUpdatePrivacyPolicy}
                className="btn-primary flex items-center space-x-2"
              >
                <Icon name="Shield" size={16} />
                <span>Update Privacy Policy</span>
              </button>
            </div>
          </div>

          {/* Compliance Status Overview */}
          {complianceStatus && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-normal">Overall Score</p>
                    <p className="text-2xl font-semibold text-text-primary">{complianceStatus.overallScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-success" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-normal">Pending Requests</p>
                    <p className="text-2xl font-semibold text-text-primary">{complianceStatus.pendingRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-warning-600" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-normal">Consent Rate</p>
                    <p className="text-2xl font-semibold text-text-primary">{complianceStatus.consentRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-normal">Retention Compliance</p>
                    <p className="text-2xl font-semibold text-text-primary">{complianceStatus.dataRetentionCompliance}%</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Database" size={24} className="text-secondary" />
                  </div>
                </div>
              </div>
              
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-normal">Risk Level</p>
                    <p className={`text-sm font-medium ${riskConfig?.color}`}>{riskConfig?.label}</p>
                  </div>
                  <div className={`w-12 h-12 ${riskConfig?.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon name="AlertTriangle" size={24} className={riskConfig?.color} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Alerts */}
          {complianceStatus?.overdueRequests > 0 && (
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 mb-8">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                <div>
                  <h3 className="font-medium text-error mb-1">Urgent: Overdue Requests</h3>
                  <p className="text-error-600 text-sm">
                    {complianceStatus.overdueRequests} data subject request(s) are overdue. 
                    GDPR requires responses within 30 days. Please take immediate action.
                  </p>
                  <button 
                    onClick={() => setActiveTab('requests')}
                    className="text-error hover:text-error-600 text-sm font-medium mt-2 underline"
                  >
                    View Overdue Requests →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-dark'
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                  {tab.id === 'requests' && complianceStatus?.pendingRequests > 0 && (
                    <span className="bg-warning text-white text-xs px-2 py-0.5 rounded-full">
                      {complianceStatus.pendingRequests}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'requests' && <DataSubjectRequests />}
            {activeTab === 'consent' && <ConsentManagement />}
            {activeTab === 'audit' && <DataAuditTrail />}
            {activeTab === 'settings' && <PrivacySettings />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GdprComplianceCenter;