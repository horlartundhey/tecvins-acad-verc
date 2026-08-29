// Single source of truth for the SDG bullets, shared by the /about section
// (SustainableG) and the /sdgs page - they previously carried two identical
// hand-maintained copies of this list.
const SDGS = [
  { number: 'SDG 4', name: 'Quality Education' },
  { number: 'SDG 5', name: 'Gender Equality' },
  { number: 'SDG 8', name: 'Decent Work & Economic Growth' },
];

const SdgList = ({ className = '' }) => (
  <ul className={`space-y-2 mb-4 ${className}`}>
    {SDGS.map(({ number, name }) => (
      <li key={number} className="flex items-start">
        <span className="inline-block w-2 h-2 bg-white rounded-full mt-2 mr-2 shrink-0"></span>
        <span>
          <strong>{number}:</strong> {name}
        </span>
      </li>
    ))}
  </ul>
);

export default SdgList;
