import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OperatorRow, type Operator } from "./OperatorsRow"; // Importa la interfaz

/*

Bueno, en esta se recibe un arreglo de objetos tipo Operator. 
Cada objeto representa a un operador con su nombre, módulo, turno y etc

EsTA Cosa practicamente es donde se contiene la tabla y ya
solo se encarga de mostrar los encabezados y recorrer los datos
para que cada operador tenga su fila

LA LOgica de como se muestra cada operador esta en el componente 
ese operatorRow


*/
interface OperatorsTableProps {
  operators: Operator[];
}

export const OperatorsTable = ({ operators }: OperatorsTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Operador</TableHead>
        <TableHead>Módulo</TableHead>
        <TableHead>Especialidad</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead>Turno</TableHead>
        <TableHead>Pacientes Atendidos</TableHead>
        <TableHead className="text-right">Acciones</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {operators.map((operator) => (
        <OperatorRow key={operator.id} operator={operator} />
      ))}
    </TableBody>
  </Table>
);