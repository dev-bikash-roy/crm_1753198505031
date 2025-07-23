import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import Login from "pages/login";
import SalesDashboard from "pages/sales-dashboard";
import DealManagement from "pages/deal-management";
import ContactManagement from "pages/contact-management";
import PipelineAnalytics from "pages/pipeline-analytics";
import ActivityTimeline from "pages/activity-timeline";
import SettingsAdministration from "pages/settings-administration";
import AutomationWorkflows from "pages/automation-workflows";
import GdprComplianceCenter from "pages/gdpr-compliance-center";
import CustomBrandingStudio from "pages/custom-branding-studio";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
          <Route path="/deal-management" element={<DealManagement />} />
          <Route path="/contact-management" element={<ContactManagement />} />
          <Route path="/pipeline-analytics" element={<PipelineAnalytics />} />
          <Route path="/activity-timeline" element={<ActivityTimeline />} />
          <Route path="/settings-administration" element={<SettingsAdministration />} />
          <Route path="/automation-workflows" element={<AutomationWorkflows />} />
          <Route path="/gdpr-compliance-center" element={<GdprComplianceCenter />} />
          <Route path="/custom-branding-studio" element={<CustomBrandingStudio />} />
          <Route path="/" element={<Login />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;