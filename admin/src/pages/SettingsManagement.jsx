import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, ArrowRight } from 'lucide-react';

const SettingsManagement = () => {
  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-4xl sm:text-5xl font-light text-black mb-1"
          style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
        >
          Settings
        </h1>
        <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage your website settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Social Links Card */}
        <Link
          to="/settings/social-links"
          className="group bg-white border border-gray-200 p-6 hover:border-black transition-colors duration-200 block"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-200">
              <Share2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-black tracking-wide">Social Media Links</h3>
              <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage social links</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">
            Add, edit, or delete social media links. Choose custom icons for each link and control their display order.
          </p>
          <div className="flex items-center gap-1 text-[10px] font-medium tracking-widest uppercase text-black group-hover:gap-2 transition-all duration-200">
            <span>Manage Links</span>
            <ArrowRight size={12} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SettingsManagement;
