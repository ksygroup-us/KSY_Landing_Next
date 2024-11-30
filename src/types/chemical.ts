export interface Chemical {
  id: number;
  name: string;
  cas_number: string;
  description: string;
  category: string;
  molecular_formula: string;
  molecular_weight: string;
  einecs_number: string;
  synonyms: string;
  purity: string;
  grade: string;
  specifications: string;
  applications: string;
  industries: string;
  packaging: string;
  image: string;
  safety_info: string;
  faqs: string;
  certifications: string;
}

export interface Category {
  id: number;
  name: string;
} 