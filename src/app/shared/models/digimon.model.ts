import { IDetail } from './detail.model';
import { IField } from './field.model';

export interface IDigimon {
  id: number;
  name: string;
  image?: string;
  levels?: IDetail[];
  attributes?: IDetail[];
  types?: IDetail[];
  fields?: IField[];
}
