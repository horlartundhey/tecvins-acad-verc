import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Flag component using country-flag-icons
const FlagIcon = ({ countryCode, className = "w-4 h-4" }) => {
  const getFlag = (code) => {
    // Map country codes to proper ISO codes
    const countryMap = {
      'NG': 'ng', 'US': 'us', 'GB': 'gb', 'CA': 'ca', 'DE': 'de', 'FR': 'fr',
      'IT': 'it', 'ES': 'es', 'NL': 'nl', 'SE': 'se', 'NO': 'no', 'DK': 'dk',
      'FI': 'fi', 'CH': 'ch', 'AT': 'at', 'BE': 'be', 'PT': 'pt', 'IE': 'ie',
      'AU': 'au', 'NZ': 'nz', 'ZA': 'za', 'KE': 'ke', 'GH': 'gh', 'IN': 'in',
      'CN': 'cn', 'JP': 'jp', 'KR': 'kr', 'SG': 'sg', 'MY': 'my', 'TH': 'th',
      'VN': 'vn', 'PH': 'ph', 'ID': 'id', 'BR': 'br', 'MX': 'mx', 'AR': 'ar',
      'CL': 'cl', 'CO': 'co', 'PE': 'pe', 'EG': 'eg', 'MA': 'ma', 'DZ': 'dz',
      'TN': 'tn', 'LY': 'ly', 'SA': 'sa', 'AE': 'ae', 'KW': 'kw', 'QA': 'qa',
      'BH': 'bh', 'OM': 'om', 'IQ': 'iq', 'JO': 'jo', 'LB': 'lb', 'SY': 'sy',
      'IL': 'il', 'TR': 'tr', 'IR': 'ir'
    };
    
    const flagCode = countryMap[code] || code.toLowerCase();
    return `https://flagcdn.com/16x12/${flagCode}.png`;
  };

  return (
    <img 
      src={getFlag(countryCode)} 
      alt={`${countryCode} flag`}
      className={className}
      style={{ objectFit: 'cover' }}
    />
  );
};

// Extended country codes for phone number with more countries
const countryCodes = [
  { code: '+234', flagCode: 'NG', country: 'Nigeria' },
  { code: '+1', flagCode: 'US', country: 'United States' },
  { code: '+44', flagCode: 'GB', country: 'United Kingdom' },
  { code: '+1', flagCode: 'CA', country: 'Canada' },
  { code: '+49', flagCode: 'DE', country: 'Germany' },
  { code: '+33', flagCode: 'FR', country: 'France' },
  { code: '+39', flagCode: 'IT', country: 'Italy' },
  { code: '+34', flagCode: 'ES', country: 'Spain' },
  { code: '+31', flagCode: 'NL', country: 'Netherlands' },
  { code: '+46', flagCode: 'SE', country: 'Sweden' },
  { code: '+47', flagCode: 'NO', country: 'Norway' },
  { code: '+45', flagCode: 'DK', country: 'Denmark' },
  { code: '+358', flagCode: 'FI', country: 'Finland' },
  { code: '+41', flagCode: 'CH', country: 'Switzerland' },
  { code: '+43', flagCode: 'AT', country: 'Austria' },
  { code: '+32', flagCode: 'BE', country: 'Belgium' },
  { code: '+351', flagCode: 'PT', country: 'Portugal' },
  { code: '+353', flagCode: 'IE', country: 'Ireland' },
  { code: '+61', flagCode: 'AU', country: 'Australia' },
  { code: '+64', flagCode: 'NZ', country: 'New Zealand' },
  { code: '+27', flagCode: 'ZA', country: 'South Africa' },
  { code: '+254', flagCode: 'KE', country: 'Kenya' },
  { code: '+233', flagCode: 'GH', country: 'Ghana' },
  { code: '+91', flagCode: 'IN', country: 'India' },
  { code: '+86', flagCode: 'CN', country: 'China' },
  { code: '+81', flagCode: 'JP', country: 'Japan' },
  { code: '+82', flagCode: 'KR', country: 'South Korea' },
  { code: '+65', flagCode: 'SG', country: 'Singapore' },
  { code: '+60', flagCode: 'MY', country: 'Malaysia' },
  { code: '+66', flagCode: 'TH', country: 'Thailand' },
  { code: '+84', flagCode: 'VN', country: 'Vietnam' },
  { code: '+63', flagCode: 'PH', country: 'Philippines' },
  { code: '+62', flagCode: 'ID', country: 'Indonesia' },
  { code: '+55', flagCode: 'BR', country: 'Brazil' },
  { code: '+52', flagCode: 'MX', country: 'Mexico' },
  { code: '+54', flagCode: 'AR', country: 'Argentina' },
  { code: '+56', flagCode: 'CL', country: 'Chile' },
  { code: '+57', flagCode: 'CO', country: 'Colombia' },
  { code: '+51', flagCode: 'PE', country: 'Peru' },
  { code: '+20', flagCode: 'EG', country: 'Egypt' },
  { code: '+212', flagCode: 'MA', country: 'Morocco' },
  { code: '+213', flagCode: 'DZ', country: 'Algeria' },
  { code: '+216', flagCode: 'TN', country: 'Tunisia' },
  { code: '+218', flagCode: 'LY', country: 'Libya' },
  { code: '+966', flagCode: 'SA', country: 'Saudi Arabia' },
  { code: '+971', flagCode: 'AE', country: 'UAE' },
  { code: '+965', flagCode: 'KW', country: 'Kuwait' },
  { code: '+974', flagCode: 'QA', country: 'Qatar' },
  { code: '+973', flagCode: 'BH', country: 'Bahrain' },
  { code: '+968', flagCode: 'OM', country: 'Oman' },
  { code: '+964', flagCode: 'IQ', country: 'Iraq' },
  { code: '+962', flagCode: 'JO', country: 'Jordan' },
  { code: '+961', flagCode: 'LB', country: 'Lebanon' },
  { code: '+963', flagCode: 'SY', country: 'Syria' },
  { code: '+972', flagCode: 'IL', country: 'Israel' },
  { code: '+90', flagCode: 'TR', country: 'Turkey' },
  { code: '+98', flagCode: 'IR', country: 'Iran' }
];

const PhoneInput = ({ 
  value = '', 
  onChange, 
  placeholder = "Phone number", 
  error = '',
  required = false,
  className = '' 
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    console.log('Input value:', inputValue); // Debug log
    
    // Only allow numbers - strictly numeric input
    const numericValue = inputValue.replace(/\D/g, '');
    console.log('Numeric value:', numericValue); // Debug log
    
    const fullPhoneNumber = `${selectedCountryCode.code}${numericValue}`;
    console.log('Full phone number:', fullPhoneNumber); // Debug log
    
    onChange(fullPhoneNumber, numericValue, selectedCountryCode);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountryCode(country);
    setShowCountryDropdown(false);
    // Update the full phone number with new country code
    const phoneNumber = value.replace(/^\+\d+/, ''); // Remove existing country code
    const fullPhoneNumber = `${country.code}${phoneNumber}`;
    onChange(fullPhoneNumber, phoneNumber, country);
  };

  // Extract the phone number without country code for display
  const phoneNumberOnly = value ? value.replace(/^\+\d+/, '') : '';

  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
            className={`flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <FlagIcon countryCode={selectedCountryCode.flagCode} className="w-4 h-4 mr-1" />
            <span className="text-sm">{selectedCountryCode.code}</span>
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
          
          {showCountryDropdown && (
            <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-y-auto min-w-[280px]">
              {countryCodes.map((country) => (
                <button
                  key={`${country.code}-${country.country}`}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full flex items-center px-3 py-2 hover:bg-gray-100 text-left"
                >
                  <FlagIcon countryCode={country.flagCode} className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium mr-2">{country.code}</span>
                  <span className="text-sm text-gray-600">{country.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          type="tel"
          value={phoneNumberOnly}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          className={`flex-1 px-3 py-2 border border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
