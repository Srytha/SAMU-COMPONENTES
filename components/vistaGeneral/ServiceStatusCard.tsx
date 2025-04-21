import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface StatusCardProps {
  title: string;
  type: 'priority' | 'general';
  currentNumber: string;
  waitTime: string;
}

const ServiceStatusCard = ({ title, type, currentNumber, waitTime }: StatusCardProps) => {
  const colors = {
    priority: {
      border: 'border-amber-500',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      badge: 'border-amber-300 bg-amber-100',
    },
    general: {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      text: 'text-blue-800',
      badge: 'border-blue-300 bg-blue-100',
    },
  };

  return (
    <Card className={`border-2 ${colors[type].border} ${colors[type].bg}`}>
      <CardHeader className="py-2 px-4">
        <CardTitle className={`text-sm font-medium ${colors[type].text}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="py-3 px-4">
        <div className="flex justify-between items-center">
          <span className={`text-3xl font-bold ${colors[type].text}`}>{currentNumber}</span>
          <Badge variant="outline" className={`text-xs font-normal ${colors[type].text} ${colors[type].badge}`}>
            <Clock className="h-3 w-3 mr-1" />
            Tiempo estimado: {waitTime}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusCard;
