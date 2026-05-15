type ScoreCardProps = {
  title: string;
  score: number;
};

export default function ScoreCard({
  title,
  score,
}: ScoreCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 w-full">
      <h2 className="text-lg font-semibold text-black">
        {title}
      </h2>

      <p className="text-4xl font-bold text-black mt-4">
        {score}
      </p>
    </div>
  );
}  