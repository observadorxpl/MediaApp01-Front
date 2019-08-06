import { Examen } from './examen';
import { Consulta } from './Consulta';

export class ConsultaListExamenDTO{
    consulta: Consulta;
    examenes: Examen[];
}