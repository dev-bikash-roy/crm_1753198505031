import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ConsentManagement = () => {
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // Mock consent data
  const consentRecords = [
    {
      id: 'consent-001',
      email: 'john.smith@acme.com',
      name: 'John Smith',
      emailMarketing: true,
      smsMarketing: false,
      phoneMarketing: true,
      dataProcessing: true,
      lastUpdated: '2025-07-20T10:30:00Z',
      consentSource: 'web_form',
      ipAddress: '192.168.1.1',
      userAgent: 'Chrome/119.0.0.0'
    },
    {
      id: 'consent-002',
      email: 'sarah.wilson@techstart.com',
      name: 'Sarah Wilson',
      emailMarketing: true,
      smsMarketing: true,
      phoneMarketing: false,
      dataProcessing: true,
      lastUpdated: '2025-07-19T14:15:00Z',
      consentSource: 'api',
      ipAddress: '10.0.0.1',
      userAgent: 'API Client v2.1'
    },
    {
      id: 'consent-003',
      email: 'mike.johnson@global.com',
      name: 'Mike Johnson',
      emailMarketing: false,
      smsMarketing: false,
      phoneMarketing: false,
      dataProcessing: true,
      lastUpdated: '2025-07-18T09:45:00Z',
      consentSource: 'manual',
      ipAddress: '172.16.0.1',
      userAgent: 'Staff Update'
    }
  ];

  const consentChannels = [
    { id: 'emailMarketing', label: 'Email Marketing', description: 'Promotional emails and newsletters' },
    { id: 'smsMarketing', label: 'SMS Marketing', description: 'Text message promotions and updates' },
    { id: 'phoneMarketing', label: 'Phone Marketing', description: 'Sales calls and phone promotions' },
    { id: 'dataProcessing', label: 'Data Processing', description: 'Basic data processing for service delivery' }
  ];

  const getConsentSourceConfig = (source) => {
    switch (source) {
      case 'web_form':
        return { icon: 'Globe', label: 'Web Form', color: 'text-primary' };
      case 'api':
        return { icon: 'Code', label: 'API', color: 'text-secondary' };
      case 'manual':
        return { icon: 'User', label: 'Manual Entry', color: 'text-warning-600' };
      case 'import':
        return { icon: 'Upload', label: 'Data Import', color: 'text-accent' };
      default:
        return { icon: 'FileText', label: 'Unknown', color: 'text-text-secondary' };
    }
  };

  const filteredRecords = consentRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedChannel === 'all') return matchesSearch;
    
    return matchesSearch && record[selectedChannel];
  });

  const calculateConsentStats = () => {
    const total = consentRecords.length;
    const stats = {};
    
    consentChannels.forEach(channel => {
      const consented = consentRecords.filter(record => record[channel.id]).length;
      stats[channel.id] = {
        consented,
        percentage: total > 0 ? ((consented / total) * 100).toFixed(1) : 0
      };
    });
    
    return stats;
  };

  const consentStats = calculateConsentStats();

  const handleViewConsentHistory = (contact) => {
    setSelectedContact(contact);
    setShowConsentModal(true);
  };

  const handleUpdateConsent = (contactId, channel, value) => {
    console.log(`Updating ${channel} consent for ${contactId} to ${value}`);
    // Here you would typically call an API
    alert(`Consent updated for ${channel}`);
  };

  const handleBulkConsentUpdate = () => {
    alert('Bulk consent update feature - would show modal with options');
  };

  return (
    <div className="space-y-6">
      {/* Consent Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {consentChannels.map(channel => (
          <div key={channel.id} className="card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-text-primary">{channel.label}</h3>
              <div className="text-2xl font-semibold text-primary">
                {consentStats[channel.id]?.percentage}%
              </div>
            </div>
            <p className="text-text-secondary text-sm mb-2">{channel.description}</p>
            <div className="flex items-center justify-between text-sm text-text-tertiary">
              <span>{consentStats[channel.id]?.consented || 0} consented</span>
              <span>{consentRecords.length - (consentStats[channel.id]?.consented || 0)} declined</span>
            </div>
            <div className="w-full bg-border rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${consentStats[channel.id]?.percentage || 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 input-field"
            />
          </div>

          {/* Channel Filter */}
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="input-field"
          >
            <option value="all">All Contacts</option>
            {consentChannels.map(channel => (
              <option key={channel.id} value={channel.id}>
                {channel.label} Consented
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={handleBulkConsentUpdate}
            className="btn-secondary flex items-center space-x-2"
          >
            <Icon name="Users" size={16} />
            <span>Bulk Update</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Icon name="Download" size={16} />
            <span>Export Consent Records</span>
          </button>
        </div>
      </div>

      {/* Consent Records Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Email Marketing
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  SMS Marketing
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Phone Marketing
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Data Processing
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {filteredRecords.map(record => {
                const sourceConfig = getConsentSourceConfig(record.consentSource);
                
                return (
                  <tr key={record.id} className="hover:bg-surface-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                          <Icon name="User" size={16} className="text-primary" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-text-primary">{record.name}</div>
                          <div className="text-sm text-text-secondary">{record.email}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Icon name={sourceConfig.icon} size={12} className={sourceConfig.color} />
                            <span className={`text-xs ${sourceConfig.color}`}>{sourceConfig.label}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {consentChannels.map(channel => (
                      <td key={channel.id} className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleUpdateConsent(record.id, channel.id, !record[channel.id])}
                          className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            record[channel.id]
                              ? 'bg-success-100 text-success-700 hover:bg-success-200' :'bg-gray-100 text-text-secondary hover:bg-gray-200'
                          }`}
                        >
                          <Icon 
                            name={record[channel.id] ? "Check" : "X"} 
                            size={12} 
                            className="mr-1" 
                          />
                          {record[channel.id] ? 'Yes' : 'No'}
                        </button>
                      </td>
                    ))}
                    
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-text-secondary">
                      {new Date(record.lastUpdated).toLocaleDateString()}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleViewConsentHistory(record)}
                        className="text-primary hover:text-primary-700 text-sm font-medium"
                      >
                        View History
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No consent records found</h3>
            <p className="text-text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Consent History Modal */}
      {showConsentModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-1300 flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">Consent History</h2>
                <p className="text-text-secondary mt-1">{selectedContact.name} • {selectedContact.email}</p>
              </div>
              <button
                onClick={() => setShowConsentModal(false)}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <h3 className="font-medium text-text-primary">Current Preferences</h3>
                {consentChannels.map(channel => (
                  <div key={channel.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <div className="font-medium text-text-primary">{channel.label}</div>
                      <div className="text-sm text-text-secondary">{channel.description}</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      selectedContact[channel.id] 
                        ? 'bg-success-100 text-success-700' :'bg-gray-100 text-text-secondary'
                    }`}>
                      {selectedContact[channel.id] ? 'Consented' : 'Declined'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-medium text-text-primary mb-3">Technical Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Last Updated:</span>
                    <span className="text-text-primary">{new Date(selectedContact.lastUpdated).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">IP Address:</span>
                    <span className="text-text-primary font-data">{selectedContact.ipAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">User Agent:</span>
                    <span className="text-text-primary font-data text-xs">{selectedContact.userAgent}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-border">
              <button
                onClick={() => setShowConsentModal(false)}
                className="px-6 py-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                Close
              </button>
              <button className="btn-primary">
                Download Consent Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsentManagement;