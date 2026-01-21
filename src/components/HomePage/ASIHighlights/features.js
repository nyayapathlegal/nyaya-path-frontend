import { Brain, Gauge, Map, TrendingUp } from "lucide-react";

export const features = [
  {
    title: "Emotional Pattern Recognition",
    desc: "Advanced AI that understands and learns your emotional states",
    icon: <Brain className="w-8 h-8 text-purple-600" />,
    bg: "from-purple-300 to-purple-900",
  },
  {
    title: "Behaviour Mapping",
    desc: "Visual representation of your behavioral patterns over time",
    icon: <Map className="w-8 h-8 text-blue-600" />,
    bg: "from-blue-300 to-blue-900",
  },
  {
    title: "EQ Score Tracking",
    desc: "Measure and improve your emotional intelligence quotient",
    icon: <Gauge className="w-8 h-8 text-green-600" />,
    bg: "from-green-300 to-green-900",
  },
  {
    title: "Future Path Prediction",
    desc: "AI-powered forecasting of life outcomes based on patterns",
    icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
    bg: "from-orange-300 to-orange-900",
  },
];
