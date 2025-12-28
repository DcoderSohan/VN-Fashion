import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, ArrowRight } from 'lucide-react';

const SettingsManagement = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your website settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Social Links Management Card */}
        <Link
          to="/settings/social-links"
          className="group bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Social Media Links</h3>
              <p className="text-sm text-gray-600">Manage social links and icons</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Add, edit, or delete social media links. Choose custom icons for each link and control their display order.
          </p>
          <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
            <span>Manage Links</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingsManagement;

