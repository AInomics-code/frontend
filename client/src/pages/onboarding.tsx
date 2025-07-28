import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Database, Building, Target } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: "Welcome to VORTA",
    description: "Let's get your business intelligence platform set up in just a few steps."
  },
  {
    id: 2,
    title: "What's your industry?",
    description: "This helps us customize your experience with relevant insights and metrics."
  },
  {
    id: 3,
    title: "What's your primary use case?",
    description: "Tell us how you plan to use VORTA to get the most relevant features."
  },
  {
    id: 4,
    title: "Connect your data sources",
    description: "Link your databases and systems to start getting insights immediately."
  }
];

const industries = [
  "Food & Beverage",
  "Retail",
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Finance",
  "Other"
];

const useCases = [
  "Sales Performance Tracking",
  "Financial Analytics",
  "Inventory Management",
  "Customer Intelligence",
  "Operations Dashboard",
  "Executive Reporting"
];

const dataSources = [
  { name: "PostgreSQL", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "MongoDB", icon: Database },
  { name: "Salesforce CRM", icon: Building },
  { name: "Shopify", icon: Building },
  { name: "Google Analytics", icon: Target }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      setLocation("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return selectedIndustry !== "";
      case 3:
        return selectedUseCase !== "";
      case 4:
        return selectedDataSources.length > 0;
      default:
        return false;
    }
  };

  const toggleDataSource = (source: string) => {
    setSelectedDataSources(prev => 
      prev.includes(source) 
        ? prev.filter(s => s !== source)
        : [...prev, source]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto">
              <span className="text-white text-2xl font-bold">V</span>
            </div>
            <p className="text-gray-600 text-lg">
              Your AI-powered business intelligence platform is ready to transform how you make decisions.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedIndustry === industry
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {useCases.map((useCase) => (
                <button
                  key={useCase}
                  onClick={() => setSelectedUseCase(useCase)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedUseCase === useCase
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {useCase}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {dataSources.map((source) => {
                const Icon = source.icon;
                return (
                  <button
                    key={source.name}
                    onClick={() => toggleDataSource(source.name)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedDataSources.includes(source.name)
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">{source.name}</div>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-500 text-center">
              Select one or more data sources. You can add more later.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-black h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-gray-600 mb-8">
                {steps[currentStep - 1].description}
              </p>

              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-xl transition ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center px-6 py-2 rounded-xl transition ${
                canProceed()
                  ? "bg-black text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {currentStep === steps.length ? "Complete Setup" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}