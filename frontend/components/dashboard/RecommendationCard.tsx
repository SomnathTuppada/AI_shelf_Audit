import { Recommendation } from "@/types/recommendation";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {

  const getPriorityStyles = () => {

    switch (
      recommendation.priority
    ) {

      case "HIGH":
        return {
          border: "border-green-300",
          bg: "bg-green-100",
          badge: "bg-green-600",
          accent: "bg-green-600",
          text: "text-green-800",
          subtext: "text-green-900",
        };

      case "MEDIUM":
        return {
          border: "border-green-200",
          bg: "bg-green-50",
          badge: "bg-green-500",
          accent: "bg-green-500",
          text: "text-green-700",
          subtext: "text-green-800",
        };

      default:
        return {
          border: "border-emerald-100",
          bg: "bg-emerald-50",
          badge: "bg-emerald-400",
          accent: "bg-emerald-400",
          text: "text-emerald-700",
          subtext: "text-emerald-800",
        };
    }
  };

  const styles =
    getPriorityStyles();

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
            {recommendation.message}
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
            {recommendation.priority}
          </span>
        </div>

        <p className={`text-sm ${styles.subtext}`}>

          Impact Score:
          {" "}
          <span className="font-semibold">
            {recommendation.impact_score}
          </span>
        </p>
      </div>
    </div>
  );
}