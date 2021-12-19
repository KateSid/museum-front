interface Employee {
  employeeNumber: string;
  fullName: string;
  id: number;
  position: string;
}

interface Info {
  additionalInformation: string;
  height: string;
  length: string;
  width: string;
}

interface Exhibit {
  creationDate: string;
  id: number;
  info: Info;
  name: string;
  type: string;
}

export interface Item {
  comment: string;
  employee: Employee;
  endDate: string;
  exhibit: Exhibit;
  id: number;
  startDate: string;
}

export interface ItemForm {
  comment: string;
  employeeForm: number;
  endDate: string;
  exhibitForm: number;
  id: number;
  startDate: string;
}
