import { Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingTurnsTable = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Menu className="h-5 w-5 mr-2 text-blue-600" />
          Próximos Turnos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-2 px-4 text-sm font-medium">Turno</th>
                <th className="text-left py-2 px-4 text-sm font-medium">Servicio</th>
                <th className="text-left py-2 px-4 text-sm font-medium hidden sm:table-cell">Tiempo Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Datos podrían venir por props */}
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 text-sm font-medium">N-0{23 + i}</td>
                  <td className="py-3 px-4 text-sm">Servicio {i + 1}</td>
                  <td className="py-3 px-4 text-sm hidden sm:table-cell">{15 + i * 5} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTurnsTable;
