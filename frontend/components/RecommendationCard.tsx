type RecommendationCardProps = {
  recommendation: string;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <div className="bg-green-100 border border-green-300 rounded-xl p-4">
      <p className="text-green-700 font-medium">
        {recommendation}
      </p>
    </div>
  );
}