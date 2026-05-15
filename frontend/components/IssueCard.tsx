type IssueCardProps = {
  issue: string;
};

export default function IssueCard({
  issue,
}: IssueCardProps) {
  return (
    <div className="bg-red-100 border border-red-300 rounded-xl p-4">
      <p className="text-red-700 font-medium">
        {issue}
      </p>
    </div>
  );
}