const styles = {
  HOT: 'bg-red-100 text-red-700',
  WARM: 'bg-orange-100 text-orange-700',
  COLD: 'bg-blue-100 text-blue-700',
  default: 'bg-gray-100 text-gray-600',
};

export default function RoutingBadge({ routing, size = 'sm' }) {
  const style = styles[routing] || styles.default;
  const padding = size === 'md' ? 'px-3 py-1 text-sm' : 'px-2 py-1 text-xs';

  return (
    <span className={`${padding} rounded-full font-semibold ${style}`}>
      {routing || 'Qualifying'}
    </span>
  );
}
