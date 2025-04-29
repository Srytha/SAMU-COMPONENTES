import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { OperatorRow, type Operator } from "./OperatorsRow";

interface OperatorsTableProps {
  operators: Operator[];
}

export const OperatorsTable = ({ operators }: OperatorsTableProps) => {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
      <Table className="min-w-full text-sm text-left">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Operador</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Módulo</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Especialidad</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Estado</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Turno</TableHead>
            <TableHead className="px-6 py-3 font-semibold text-gray-700">Pacientes Atendidos</TableHead>
            <TableHead className="px-6 py-3 text-right font-semibold text-gray-700">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {operators.map((operator) => (
            <OperatorRow key={operator.id} operator={operator} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
