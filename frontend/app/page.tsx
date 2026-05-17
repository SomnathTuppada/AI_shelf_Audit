"use client";

import { useState } from "react";
import axios from "axios";

import ScoreCard from "@/components/dashboard/ScoreCard";
import IssueCard from "@/components/dashboard/IssueCard";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import AIMetricCard from "@/components/dashboard/AIMetricCard";

export default function Home() {

  const [productForm, setProductForm] = useState({
    product_name: "",
    description: "",
    price: "",
    category: "",
    warranty: "",
    shipping_info: "",
    return_policy: "",
  });

  const [analysis, setAnalysis] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleAnalyzeProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    try {

      const payload = {
        ...productForm,
        price: Number(productForm.price),
        reviews: [],
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/analyze",
        payload
      );

      setAnalysis(response.data.analysis);

    } catch (error) {

      console.error(
        "Analysis failed:",
        error
      );
    }
  };

  return (
    <main className="min-h-screen  text-black p-8">

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-gray-400 mb-2">
          AI Shelf Audit
        </h1>

        <p className="text-gray-500 text-lg">
          AI-powered commerce intelligence dashboard
        </p>
      </div>

      {/* PRODUCT FORM */}
      <form
        onSubmit={handleAnalyzeProduct}
        className="bg-white p-6 rounded-xl shadow-md mb-10"
      >

        <h2 className="text-2xl font-bold mb-6">
          Product Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="warranty"
            placeholder="Warranty"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="shipping_info"
            placeholder="Shipping Info"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="text"
            name="return_policy"
            placeholder="Return Policy"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          className="border p-3 rounded-lg w-full mt-4"
          rows={4}
          onChange={(e) =>
            setProductForm({
              ...productForm,
              description: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-3 rounded-lg mt-6"
        >
          Analyze Product
        </button>
      </form>

      {/* RESULTS */}
      {analysis && (

        <>
          {/* SCORE CARDS */}
            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              Scores
            </h2>   
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

          {/* AI METRICS */}
          <div className="mb-10">

            <h2 className="text-3xl font-bold text-gray-200 mb-4">
              AI Intelligence Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <AIMetricCard
                title="AI Trust Score"
                value={analysis.ai_analysis.trust_score}
              />

              <AIMetricCard
                title="AI Confidence"
                value={analysis.ai_analysis.ai_confidence}
              />

              <AIMetricCard
                title="Ambiguity Level"
                value={analysis.ai_analysis.ambiguity_level}
              />
            </div>
          </div>

          {/* MISSING INFORMATION */}
          <div className="mb-10">

            <div className="bg-white rounded-xl shadow-md p-6">

              <ul className="list-disc pl-6 space-y-2">

                {analysis.ai_analysis.missing_information.map(
                  (
                    item: string,
                    index: number
                  ) => (

                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>


          {/* AI SUMMARY */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              AI Semantic Summary
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-md">

              <p className="text-gray-700 whitespace-pre-line">
                {analysis.ai_analysis.summary}
              </p>
            </div>
          </div>


          {/* ISSUES */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Detected Issues
            </h2>

            <div className="space-y-4">

              {analysis.issues.map(
                (issue: any, index: number) => (

                  <IssueCard
                    key={index}
                    issue={issue}
                  />
                )
              )}
            </div>
          </div>

          {/* RECOMMENDATIONS */}
          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Recommendations
            </h2>

            <div className="space-y-4">

              {analysis.recommendations.map(
                (
                  recommendation: any,
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
        </>
      )}
    </main>
  );
}