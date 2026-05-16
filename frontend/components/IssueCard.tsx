type Issue = {
  message: string;
  severity: string;
  impact_score: number;
};

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({
  issue,
}: IssueCardProps) {

  return (
    <div className="bg-red-100 border border-red-300 rounded-xl p-4">

      <div className="flex justify-between items-center mb-2">

        <h3 className="font-semibold text-red-700">
          {issue.message}
        </h3>

        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {issue.severity}
        </span>
      </div>

      <p className="text-sm text-gray-700">
        Impact Score: {issue.impact_score}
      </p>
    </div>
  );
}