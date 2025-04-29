import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

/**
 * Interface defining the props for the ServiceStatusCard component
 */
interface StatusCardProps {
  /** Title of the service status card */
  title: string;
  /** Type of service: priority or general */
  type: 'priority' | 'general';
  /** Current number being served */
  currentNumber: string;
  /** Estimated wait time */
  waitTime: string;
}

/**
 * Visual style configurations based on card type
 */
const CARD_STYLES = {
  priority: {
    border: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    badge: 'border-amber-300 bg-amber-100',
    hover: 'hover:shadow-amber-100',
  },
  general: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    badge: 'border-blue-300 bg-blue-100',
    hover: 'hover:shadow-blue-100',
  },
};

/**
 * ServiceStatusCard component displays the current status of a service queue
 * including its current number and estimated wait time
 */
const ServiceStatusCard = ({ 
  title, 
  type, 
  currentNumber, 
  waitTime 
}: StatusCardProps) => {
  const styles = CARD_STYLES[type];
  
  return (
    <Card 
      className={`
        border-2 ${styles.border} ${styles.bg}
        transition-all duration-200
        hover:shadow-lg ${styles.hover}
      `}
    >
      <CardHeader className="py-2 px-4 border-b border-opacity-20">
        <CardTitle className={`text-sm font-medium ${styles.text}`}>
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="py-4 px-4">
        <div className="flex justify-between items-center">
          {/* Current number display */}
          <span className={`text-3xl font-bold ${styles.text}`}>
            {currentNumber}
          </span>
          
          {/* Wait time badge */}
          <Badge 
            variant="outline" 
            className={`
              text-xs font-normal flex items-center
              ${styles.text} ${styles.badge}
              py-1 px-2
            `}
          >
            <Clock className="h-3 w-3 mr-1" />
            <span>Tiempo estimado: {waitTime}</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceStatusCard;