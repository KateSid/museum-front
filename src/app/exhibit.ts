interface Authors {
  country: string;
  dateOfBirth: string;
  dateOfDeath: string;
  firstName: string;
  fullName: string;
  id: number;
  lastName: string;
  pseudonym: string;
}

interface Info {
  additionalInformation: string;
  height: string;
  length: string;
  width: string;
}

interface Employee {
  employeeNumber: string;
  fullName: string;
  id: number;
  position: string;
}

interface Restoration {
  comment: string;
  employee: Employee;
  endDate: string;
  id: number;
  startDate: string;
}

export interface Item {
  creationDate: string;
  id: number;
  authors: Authors[];
  info: Info;
  name: string;
  restorations: Restoration[];
  type: string;
}

interface AuthorsForm {
  id: number;
}

export interface ItemForm {
  creationDate: string,
  authorsForm: AuthorsForm[];
  additionalInformation: string,
  height: string,
  length: string,
  width: string,
  name: string,
  type: string,
}
