export interface Persona {
  id: string;
  username: string;
  active: boolean;
  lastLogin?: string | null;
  createdAt?: string;

  person: {
    id: string;
    dni: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    address?: string;
    nationality: string;
  };
}