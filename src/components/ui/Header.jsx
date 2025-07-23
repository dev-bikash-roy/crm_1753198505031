import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/sales-dashboard', icon: 'BarChart3', tooltip: 'Pipeline overview and metrics' },
    { label: 'Deals', path: '/deal-management', icon: 'Target', tooltip: 'Manage deal lifecycle and opportunities' },
    { label: 'Contacts', path: '/contact-management', icon: 'Users', tooltip: 'Customer relationship management' },
    { label: 'Analytics', path: '/pipeline-analytics', icon: 'TrendingUp', tooltip: 'Performance insights and analysis' },
    { label: 'Activity', path: '/activity-timeline', icon: 'Clock', tooltip: 'Interaction timeline and history' },
    { label: 'Automation', path: '/automation-workflows', icon: 'Zap', tooltip: 'Business process automation' },
    { label: 'Compliance', path: '/gdpr-compliance-center', icon: 'Shield', tooltip: 'GDPR compliance management' }
  ];

  const userMenuItems = [
    { label: 'Settings', path: '/settings-administration', icon: 'Settings' },
    { label: 'Profile', path: '/profile', icon: 'User' },
    { label: 'Logout', path: '/login', icon: 'LogOut' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/sales-dashboard" className="flex items-center space-x-3" onClick={handleNavigation}>
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13L12 4L21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21V13H15V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-semibold text-text-primary font-heading">CRM Pro</span>
                  <span className="text-xs text-text-secondary">
                    by <a href="https://developerbikash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700 font-medium">developerbikash.com</a>
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ease-smooth flex items-center space-x-2 ${
                    isActiveRoute(item.path)
                      ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                  title={item.tooltip}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-smooth">
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-hover transition-colors duration-150 ease-smooth"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-text-primary">John Smith</div>
                    <div className="text-xs text-text-secondary">Sales Manager</div>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-text-secondary" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border z-1100">
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={handleNavigation}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors duration-150 ease-smooth"
                        >
                          <Icon name={item.icon} size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-smooth"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-1200 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={handleMobileMenuToggle}></div>
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-surface shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 13L12 4L21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 21V13H15V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-semibold text-text-primary font-heading">CRM Pro</span>
                    <span className="text-xs text-text-secondary">
                      by <a href="https://developerbikash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-700 font-medium">developerbikash.com</a>
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleMobileMenuToggle}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-150 ease-smooth"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ease-smooth ${
                      isActiveRoute(item.path)
                        ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                
                <div className="border-t border-border my-4"></div>
                
                {userMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavigation}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-150 ease-smooth"
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handler for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-1000"
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Header;