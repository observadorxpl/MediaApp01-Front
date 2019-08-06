import { Medico } from './medico';
import { Especialidad } from './especialidad';
import { Paciente } from './paciente';
import { DetalleConsulta } from './detalleConsulta';

export class Consulta{
    idConsulta: number;
    paciente: Paciente;
    fecha: string;
    especialidad: Especialidad
    medico: Medico;
    detalleConsulta: DetalleConsulta[];
}