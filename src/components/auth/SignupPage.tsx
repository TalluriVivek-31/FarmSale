import React, { useState } from 'react';
import { Sprout, Building2, Warehouse, ShieldAlert, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth, UserRole } from '../../context/AuthContext';

interface SignupPageProps {
  onSuccess: (role: UserRole) => void;
  onNavigateLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSuccess, onNavigateLogin }) => {
  const { register } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Farmer specific
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Nashik');
  const [preferredLanguage, setPreferredLanguage] = useState('English');

  // Buyer specific
  const [organizationName, setOrganizationName] = useState('');
  const [businessType, setBusinessType] = useState('Food Processor');
  const [buyerLocation, setBuyerLocation] = useState('');

  // FPO specific
  const [fpoName, setFpoName] = useState('');
  const [fpoRegNumber, setFpoRegNumber] = useState('');
  const [fpoLocation, setFpoLocation] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload: any = {
      email,
      password,
      role: selectedRole,
      name,
      phone
    };

    if (selectedRole === 'farmer') {
      payload.state = state;
      payload.district = district;
      payload.preferredLanguage = preferredLanguage;
    } else if (selectedRole === 'buyer') {
      payload.organizationName = organizationName || name;
      payload.businessType = businessType;
      payload.location = buyerLocation;
      payload.state = state;
      payload.district = district;
    } else if (selectedRole === 'fpo') {
      payload.fpoName = fpoName || name;
      payload.registrationNumber = fpoRegNumber;
      payload.location = fpoLocation;
      payload.state = state;
      payload.district = district;
    }

    const result = await register(payload);
    setLoading(false);

    if (result.success) {
      onSuccess(selectedRole);
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#f4f7f4] via-[#fbfbfa] to-white">
      <div className="w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1b4332] text-white shadow-agri-md mb-2">
            <Sprout className="w-7 h-7 text-emerald-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Create your FarmSale account
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Select your role to configure your dedicated agricultural workspace
          </p>
        </div>

        {/* Role Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { role: 'farmer' as const, label: 'Farmer', icon: <Sprout className="w-4 h-4 text-emerald-700" />, desc: 'Individual cultivator' },
            { role: 'buyer' as const, label: 'Buyer', icon: <Building2 className="w-4 h-4 text-blue-700" />, desc: 'Institutional procurement' },
            { role: 'fpo' as const, label: 'FPO Co-op', icon: <Warehouse className="w-4 h-4 text-[#8b5e3c]" />, desc: 'Farmer producer org' },
            { role: 'admin' as const, label: 'Authority', icon: <ShieldAlert className="w-4 h-4 text-purple-700" />, desc: 'State oversight' }
          ].map((item) => (
            <button
              key={item.role}
              type="button"
              onClick={() => {
                if (item.role === 'admin') {
                  setError('Administrative accounts cannot be registered publicly. Please contact system administrators.');
                  return;
                }
                setSelectedRole(item.role);
                setError(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                selectedRole === item.role
                  ? 'bg-[#eef8f2] border-emerald-400 ring-2 ring-emerald-600/10'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                {item.icon}
                {selectedRole === item.role && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                )}
              </div>
              <div className="font-bold text-gray-900 text-xs">{item.label}</div>
              <div className="text-[10px] text-gray-500 leading-tight mt-0.5">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Signup Form Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Common Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  {selectedRole === 'buyer' ? 'Contact Person Name' : selectedRole === 'fpo' ? 'Representative Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98220 XXXXX"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1b4332] focus:outline-none"
                />
              </div>
            </div>

            {/* FARMER SPECIFIC */}
            {selectedRole === 'farmer' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-gray-100">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option>Maharashtra</option>
                    <option>Telangana</option>
                    <option>Andhra Pradesh</option>
                    <option>Punjab</option>
                    <option>Karnataka</option>
                    <option>Madhya Pradesh</option>
                    <option>Uttar Pradesh</option>
                    <option>Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="e.g. Nashik"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Language</label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                    <option>Telugu</option>
                    <option>Kannada</option>
                    <option>Punjabi</option>
                  </select>
                </div>
              </div>
            )}

            {/* BUYER SPECIFIC */}
            {selectedRole === 'buyer' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-100">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="e.g. Sahyadri Foods Processing Pvt Ltd"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  >
                    <option>Food Processor</option>
                    <option>Retail Supermarket Chain</option>
                    <option>Export House</option>
                    <option>Wholesale Aggregator</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Procurement Hub Location</label>
                  <input
                    type="text"
                    required
                    value={buyerLocation}
                    onChange={(e) => setBuyerLocation(e.target.value)}
                    placeholder="e.g. Dindori Processing Hub, Nashik"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            {/* FPO SPECIFIC */}
            {selectedRole === 'fpo' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-gray-100">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">FPO Organization Name</label>
                  <input
                    type="text"
                    required
                    value={fpoName}
                    onChange={(e) => setFpoName(e.target.value)}
                    placeholder="e.g. Sahyadri Agri Farmers Cooperative"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Registration Information</label>
                  <input
                    type="text"
                    required
                    value={fpoRegNumber}
                    onChange={(e) => setFpoRegNumber(e.target.value)}
                    placeholder="e.g. COOP/NSK/44/2021"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-gray-700 mb-1">Central Collection Yard Location</label>
                  <input
                    type="text"
                    required
                    value={fpoLocation}
                    onChange={(e) => setFpoLocation(e.target.value)}
                    placeholder="e.g. Pimpalgaon APMC Central Aggregation Yard"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#1b4332] text-white font-bold rounded-xl hover:bg-[#143628] disabled:opacity-50 transition-colors shadow-agri-sm flex items-center justify-center gap-2 text-sm mt-4"
            >
              <span>{loading ? 'Creating Account...' : `Register as ${selectedRole.toUpperCase()}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100 text-center text-xs text-gray-600">
            <span>Already have an account? </span>
            <button
              onClick={onNavigateLogin}
              className="font-bold text-[#1b4332] hover:underline"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
