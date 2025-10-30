'use client';

interface InsightsStatsProps {
  insights: string;
  entryCount: number;
}

export default function InsightsStats({ insights, entryCount }: InsightsStatsProps) {
  // Calculate some basic stats
  const wordCount = insights.split(/\s+/).length;
  const sectionCount = insights.split(/\n#{1,3}\s/).length - 1;
  const estimatedReadTime = Math.ceil(wordCount / 200); // Average reading speed

  const stats = [
    {
      icon: '📊',
      label: 'Entries Analyzed',
      value: entryCount.toString(),
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: '📝',
      label: 'Insight Sections',
      value: sectionCount.toString(),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📖',
      label: 'Words Generated',
      value: wordCount.toLocaleString(),
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: '⏱️',
      label: 'Read Time',
      value: `${estimatedReadTime} min`,
      color: 'from-rose-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-4 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
            <span className="text-xs text-gray-500 font-medium">{stat.label}</span>
          </div>
          <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}
