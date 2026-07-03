import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, ArrowRight, Settings, Globe, Shield, Bell, Palette, ChevronRight } from 'lucide-react';

const settingsGroups = [
  {
    groupLabel: 'Website',
    groupDesc: 'Control how your website appears to visitors',
    items: [
      {
        to: '/settings/social-links',
        icon: Share2,
        title: 'Social Media Links',
        desc: 'Manage social platform URLs, choose custom icons, and control display order across the website.',
        tag: 'ACTIVE',
      },
    ],
  },
];

const SettingsManagement = () => {
  return (
    <div>
      {/* ── PAGE HEADER ── */}
      <div className="mb-10 pb-8 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 border border-gray-200 flex items-center justify-center flex-shrink-0"
            style={{ background: '#f9f8f6' }}
          >
            <Settings className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1
              className="text-4xl sm:text-5xl font-light text-black mb-1 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
            >
              Settings
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-2">
              Manage your website configuration & preferences
            </p>
          </div>
        </div>
      </div>

      {/* ── SETTINGS GROUPS ── */}
      <div className="space-y-10">
        {settingsGroups.map((group) => (
          <div key={group.groupLabel}>
            {/* Group Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className="flex-1">
                <p
                  className="text-xs font-medium tracking-widest uppercase text-gray-700"
                  style={{ letterSpacing: '0.14em' }}
                >
                  {group.groupLabel}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 font-light">{group.groupDesc}</p>
              </div>
              <div className="h-[1px] flex-1 bg-gray-200" />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group bg-white border border-gray-200 hover:border-black transition-all duration-200 block"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="p-6">
                      {/* Icon + Title Row */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:border-black transition-all duration-200">
                          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-medium text-black tracking-wide leading-tight">
                              {item.title}
                            </h3>
                            {item.tag && (
                              <span className="inline-block px-1.5 py-0.5 border border-[#b8860b]/40 text-[8px] font-medium tracking-widest uppercase text-[#b8860b] leading-none flex-shrink-0">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 tracking-widest uppercase font-light">
                            {item.to.split('/').filter(Boolean).pop()?.replace(/-/g, ' ')}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-gray-500 leading-relaxed font-light mb-5">
                        {item.desc}
                      </p>

                      {/* CTA Row */}
                      <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-black group-hover:gap-3 transition-all duration-200">
                        <span>Manage</span>
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                );
              })}

              {/* ── COMING SOON PLACEHOLDER CARDS ── */}
              {[
                {
                  icon: Globe,
                  title: 'SEO & Meta',
                  desc: 'Configure page titles, meta descriptions, and search engine visibility settings.',
                },
                {
                  icon: Bell,
                  title: 'Notifications',
                  desc: 'Set up email alerts for new bookings, contacts, and admin activity.',
                },
                {
                  icon: Palette,
                  title: 'Appearance',
                  desc: 'Customize site colors, fonts, and layout preferences.',
                },
              ].map((placeholder) => {
                const Icon = placeholder.icon;
                return (
                  <div
                    key={placeholder.title}
                    className="bg-white border border-dashed border-gray-200 block opacity-50 cursor-not-allowed"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="text-sm font-medium text-gray-400 tracking-wide leading-tight">
                              {placeholder.title}
                            </h3>
                            <span className="inline-block px-1.5 py-0.5 border border-gray-200 text-[8px] font-medium tracking-widest uppercase text-gray-300 leading-none flex-shrink-0">
                              SOON
                            </span>
                          </div>
                          <p className="text-[10px] text-gray-300 tracking-widest uppercase font-light">
                            coming soon
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed font-light mb-5">
                        {placeholder.desc}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase text-gray-300">
                        <span>Unavailable</span>
                        <ChevronRight size={11} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER NOTE ── */}
      <div className="mt-14 pt-8 border-t border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 border border-[#b8860b]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-[#b8860b]" />
          </div>
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-1">
              Admin Access Only
            </p>
            <p className="text-[11px] text-gray-400 font-light leading-relaxed">
              All settings changes take effect immediately on the live website.
              Changes to social links are reflected in the footer and contact sections in real time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManagement;
