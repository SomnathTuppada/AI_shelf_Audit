import { AIMetricCardProps } from "@/types/aimetric";


export default function AIMetricCard({
  title,
  value,
}: AIMetricCardProps) {

  const isNumber =
    typeof value === "number";

  const percentage = isNumber
    ? Math.round(value * 100)
    : 0;

  const getBarColor = () => {

    if (percentage >= 80) {
      return "bg-green-500";
    }

    if (percentage >= 50) {
      return "bg-yellow-500";
    }

    return "bg-red-500";
  };

  const getAmbiguityColor = () => {

    if (value === "LOW") {
      return "bg-green-500";
    }

    if (value === "MEDIUM") {
      return "bg-yellow-500";
    }

    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">

      <h2 className="text-lg font-semibold text-gray-500 mb-6">
        {title}
      </h2>

      {isNumber ? (

        <>
          <div className="flex items-center justify-between mb-3">

            <span className="text-4xl font-bold text-black">
              {percentage}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3">

            <div
              className={`h-3 rounded-full ${getBarColor()}`}
              style={{
                width: `${percentage}%`
              }}
            />
          </div>
        </>

      ) : (

        <div className="flex items-center justify-center h-[80px]">

          <span
            className={`text-white text-sm font-bold px-4 py-2 rounded-full ${getAmbiguityColor()}`}
          >
            {value}
          </span>
        </div>
      )}
    </div>
  );
}