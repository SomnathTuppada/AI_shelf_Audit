import { Issue } from "@/types/issue";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard({
  issue,
}: IssueCardProps) {

  const getSeverityStyles = () => {

    switch (issue.severity) {

      case "HIGH":
        return {
          border: "border-red-300",
          bg: "bg-red-100",
          badge: "bg-red-500",
          accent: "bg-red-500",
          text: "text-red-700",
          subtext: "text-red-900",
        };

      case "MEDIUM":
        return {
          border: "border-red-200",
          bg: "bg-red-50",
          badge: "bg-red-400",
          accent: "bg-red-400",
          text: "text-red-600",
          subtext: "text-red-800",
        };

      default:
        return {
          border: "border-rose-100",
          bg: "bg-rose-50",
          badge: "bg-rose-400",
          accent: "bg-rose-400",
          text: "text-rose-600",
          subtext: "text-rose-700",
        };
    }
  };

  const styles =
    getSeverityStyles();

  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        border
        ${styles.border}
        ${styles.bg}
        shadow-md
        hover:shadow-lg
        transition
      `}
    >

      {/* LEFT ACCENT BAR */}
      <div
        className={`
          absolute
          left-0
          top-0
          h-full
          w-2
          ${styles.accent}
        `}
      />

      <div className="p-6 pl-8">

        <div className="flex justify-between items-start mb-3">

          <h3
            className={`
              text-lg
              font-semibold
              ${styles.text}
            `}
          >
            {issue.message}
          </h3>

          <span
            className={`
              text-white
              text-xs
              font-bold
              px-3
              py-1
              rounded-full
              ${styles.badge}
            `}
          >
            {issue.severity}
          </span>
        </div>

        <p className={`text-sm ${styles.subtext}`}>

          Impact Score:
          {" "}
          <span className="font-semibold">
            {issue.impact_score}
          </span>
        </p>
      </div>
    </div>
  );
}