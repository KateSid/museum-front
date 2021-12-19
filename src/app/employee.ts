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

interface Restoration {
  comment: string;
  endDate: string;
  exhibit: Exhibit;
  id: number;
  startDate: string;
}

export interface Item {
  employeeNumber: string;
  fullName: string;
  position: string;
  id: number;
  restorations: Restoration[];
}
