import { Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UpcomingTurnsTable = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center font-semibold text-gray-800">
          <Menu className="h-5 w-5 mr-2 text-blue-600" />
          Próximos Turnos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-blue-50 shadow-md">
              <tr>
                <th className="text-left py-3 px-5 text-sm font-medium text-gray-600">Turno</th>
                <th className="text-left py-3 px-5 text-sm font-medium text-gray-600">Servicio</th>
                <th className="text-left py-3 px-5 text-sm font-medium text-gray-600 hidden sm:table-cell">Tiempo Est.</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[...Array(4)].map((_, i) => (
                <tr 
                  key={i} 
                  className="hover:bg-blue-100 cursor-pointer transition duration-200"
                >
                  <td className="py-3 px-5 text-sm font-medium text-gray-700">N-0{23 + i}</td>
                  <td className="py-3 px-5 text-sm text-gray-700">Servicio {i + 1}</td>
                  <td className="py-3 px-5 text-sm hidden sm:table-cell text-gray-700">{15 + i * 5} min</td>
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
