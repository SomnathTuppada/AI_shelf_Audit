import { ScoreCardProps } from "@/types/scorecard";


export default function ScoreCard({
  title,
  score,
}: ScoreCardProps) {

  const getScoreColor = () => {

    if (score >= 80) {
      return "bg-green-500";
    }

    if (score >= 50) {
      return "bg-yellow-500";
    }

    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-lg font-semibold text-gray-600">
          {title}
        </h2>

        <span className="text-3xl font-bold text-black">
          {score}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3">

        <div
          className={`h-3 rounded-full ${getScoreColor()}`}
          style={{
            width: `${score}%`
          }}
        />
      </div>
    </div>
  );
}