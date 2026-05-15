"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ScoreCard from "@/components/ScoreCard";
import IssueCard from "@/components/IssueCard";
import RecommendationCard from "@/components/RecommendationCard";

export default function Home() {

  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {

    const fetchAnalysis = async () => {

      try {

        const response = await axios.get(
          "http://127.0.0.1:8000/mock-analysis"
        );

        setAnalysis(response.data);

      } catch (error) {

        console.error(
          "Error fetching analysis:",
          error
        );
      }
    };

    fetchAnalysis();

  }, []);

  if (!analysis) {
    return (
      <div className="p-10 text-xl">
        Loading analysis...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-black p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Shelf Audit Dashboard
      </h1>

      {/* SCORE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <ScoreCard
          title="Overall Score"
          score={analysis.overall_score}
        />

        <ScoreCard
          title="Clarity"
          score={analysis.clarity_score}
        />

        <ScoreCard
          title="Trust"
          score={analysis.trust_score}
        />

        <ScoreCard
          title="Completeness"
          score={analysis.completeness_score}
        />
      </div>

      {/* ISSUES */}
      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Detected Issues
        </h2>

        <div className="space-y-4">

          {analysis.issues.map(
            (issue: string, index: number) => (

              <IssueCard
                key={index}
                issue={issue}
              />
            )
          )}
        </div>
      </div>

      {/* RECOMMENDATIONS */}
      <div>

        <h2 className="text-2xl font-bold mb-4">
          Recommendations
        </h2>

        <div className="space-y-4">

          {analysis.recommendations.map(
            (
              recommendation: string,
              index: number
            ) => (

              <RecommendationCard
                key={index}
                recommendation={recommendation}
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}