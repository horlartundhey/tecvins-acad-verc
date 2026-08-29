import React, { useState, useEffect } from 'react';
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

// Extended country codes for phone number with more countries.
// Nigeria stays pinned first (the academy's home market and the field's default);
// everything after it is alphabetical by country name so the dropdown is scannable.
const countryCodes = [
  { code: '+234', flagCode: 'NG', country: 'Nigeria' },
  { code: '+213', flagCode: 'DZ', country: 'Algeria' },
  { code: '+54', flagCode: 'AR', country: 'Argentina' },
  { code: '+61', flagCode: 'AU', country: 'Australia' },
  { code: '+43', flagCode: 'AT', country: 'Austria' },
  { code: '+973', flagCode: 'BH', country: 'Bahrain' },
  { code: '+32', flagCode: 'BE', country: 'Belgium' },
  { code: '+55', flagCode: 'BR', country: 'Brazil' },
  { code: '+1', flagCode: 'CA', country: 'Canada' },
  { code: '+56', flagCode: 'CL', country: 'Chile' },
  { code: '+86', flagCode: 'CN', country: 'China' },
  { code: '+57', flagCode: 'CO', country: 'Colombia' },
  { code: '+45', flagCode: 'DK', country: 'Denmark' },
  { code: '+20', flagCode: 'EG', country: 'Egypt' },
  { code: '+358', flagCode: 'FI', country: 'Finland' },
  { code: '+33', flagCode: 'FR', country: 'France' },
  { code: '+49', flagCode: 'DE', country: 'Germany' },
  { code: '+233', flagCode: 'GH', country: 'Ghana' },
  { code: '+91', flagCode: 'IN', country: 'India' },
  { code: '+62', flagCode: 'ID', country: 'Indonesia' },
  { code: '+98', flagCode: 'IR', country: 'Iran' },
  { code: '+964', flagCode: 'IQ', country: 'Iraq' },
  { code: '+353', flagCode: 'IE', country: 'Ireland' },
  { code: '+972', flagCode: 'IL', country: 'Israel' },
  { code: '+39', flagCode: 'IT', country: 'Italy' },
  { code: '+81', flagCode: 'JP', country: 'Japan' },
  { code: '+962', flagCode: 'JO', country: 'Jordan' },
  { code: '+254', flagCode: 'KE', country: 'Kenya' },
  { code: '+965', flagCode: 'KW', country: 'Kuwait' },
  { code: '+961', flagCode: 'LB', country: 'Lebanon' },
  { code: '+218', flagCode: 'LY', country: 'Libya' },
  { code: '+60', flagCode: 'MY', country: 'Malaysia' },
  { code: '+52', flagCode: 'MX', country: 'Mexico' },
  { code: '+212', flagCode: 'MA', country: 'Morocco' },
  { code: '+31', flagCode: 'NL', country: 'Netherlands' },
  { code: '+64', flagCode: 'NZ', country: 'New Zealand' },
  { code: '+47', flagCode: 'NO', country: 'Norway' },
  { code: '+968', flagCode: 'OM', country: 'Oman' },
  { code: '+51', flagCode: 'PE', country: 'Peru' },
  { code: '+63', flagCode: 'PH', country: 'Philippines' },
  { code: '+351', flagCode: 'PT', country: 'Portugal' },
  { code: '+974', flagCode: 'QA', country: 'Qatar' },
  { code: '+966', flagCode: 'SA', country: 'Saudi Arabia' },
  { code: '+65', flagCode: 'SG', country: 'Singapore' },
  { code: '+27', flagCode: 'ZA', country: 'South Africa' },
  { code: '+82', flagCode: 'KR', country: 'South Korea' },
  { code: '+34', flagCode: 'ES', country: 'Spain' },
  { code: '+46', flagCode: 'SE', country: 'Sweden' },
  { code: '+41', flagCode: 'CH', country: 'Switzerland' },
  { code: '+963', flagCode: 'SY', country: 'Syria' },
  { code: '+66', flagCode: 'TH', country: 'Thailand' },
  { code: '+216', flagCode: 'TN', country: 'Tunisia' },
  { code: '+90', flagCode: 'TR', country: 'Turkey' },
  { code: '+971', flagCode: 'AE', country: 'UAE' },
  { code: '+44', flagCode: 'GB', country: 'United Kingdom' },
  { code: '+1', flagCode: 'US', country: 'United States' },
  { code: '+84', flagCode: 'VN', country: 'Vietnam' }
];

// Longest-code-first so a lookup never truncates a shorter code (e.g. "+1") into
// digits that belong to the phone number itself.
const codesByLengthDesc = [...countryCodes].sort((a, b) => b.code.length - a.code.length);

const getCountryByCode = (code) => countryCodes.find(c => c.code === code) || countryCodes[0];

const extractCountryCode = (value) => {
  if (typeof value !== 'string' || !value) return countryCodes[0].code;
  const found = codesByLengthDesc.find(c => value.startsWith(c.code));
  return found ? found.code : countryCodes[0].code;
};

const PhoneInput = ({
  value = '',
  onChange,
  placeholder = "Phone number",
  error = '',
  required = false,
  className = ''
}) => {
  // Selected country is tracked as real state, seeded once from the initial value.
  // It deliberately does NOT re-derive from `value` on every render: once a phone
  // number is typed, the digits that follow a short code (e.g. "+1") make the
  // country string ambiguous with the number itself, and "+1" is shared by both
  // the US and Canada besides - re-parsing it every render is what silently
  // snapped the selection back to Nigeria (the fallback) as soon as you typed.
  const [selectedCountry, setSelectedCountry] = useState(() => getCountryByCode(extractCountryCode(value)));
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Resync only when the field is externally cleared (e.g. a form reset), so a
  // fresh form still starts back on the default country.
  useEffect(() => {
    if (value === '') {
      setSelectedCountry(countryCodes[0]);
    }
  }, [value]);

  // Extract the phone number without country code for display, using the
  // currently selected country's actual code length rather than guessing.
  const phoneNumberOnly = typeof value === 'string' && value.startsWith(selectedCountry.code)
    ? value.slice(selectedCountry.code.length)
    : (typeof value === 'string' ? value.replace(/^\+\d{1,3}/, '') : '');

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    const fullPhoneNumber = `${selectedCountry.code}${numericValue}`;
    onChange(fullPhoneNumber, numericValue, selectedCountry);
  };

  const handleCountrySelect = (country) => {
    setShowCountryDropdown(false);
    setSelectedCountry(country);
    // Update the full phone number with new country code
    const phoneNumber = phoneNumberOnly;
    const fullPhoneNumber = `${country.code}${phoneNumber}`;
    onChange(fullPhoneNumber, phoneNumber, country);
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`flex items-stretch rounded-md border ${error ? 'border-red-500' : 'border-gray-300'} focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 bg-white overflow-visible`}>
        <div className="relative z-30">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowCountryDropdown(!showCountryDropdown);
            }}
            className="h-full flex items-center px-2.5 sm:px-3 bg-white hover:bg-gray-50 focus:outline-none border-r border-gray-200 transition-colors cursor-pointer"
          >
            <FlagIcon countryCode={selectedCountry.flagCode} className="w-4 h-4" />
            <span className="text-sm text-gray-700 mx-1.5 sm:mx-2">{selectedCountry.code}</span>
            <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
          </button>
          {showCountryDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowCountryDropdown(false)}
              />
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-xl z-50 max-h-60 overflow-y-auto min-w-[280px]">
                {countryCodes.map((country) => (
                  <button
                    key={`${country.code}-${country.country}`}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCountrySelect(country);
                    }}
                    className="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left transition-colors"
                  >
                    <FlagIcon countryCode={country.flagCode} className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium mr-2">{country.code}</span>
                    <span className="text-sm text-gray-600">{country.country}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <input
          type="tel"
          value={phoneNumberOnly}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          required={required}
          className="flex-1 px-3 py-2.5 text-base bg-white focus:outline-none min-w-0"
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default PhoneInput;
