interface Showroom {
  floor: number;
  id: number;
  name: string;
  size: number;
}

interface Info {
  length: string;
  width: string;
  height: string;
  additionalInformation: string;
}

interface Exhibit {
  id: number;
  name: string;
  type: string;
  creationDate: string;
  info: Info;
}

export interface Item {
  endDateTime: string;
  id: number;
  name: string;
  showroom: Showroom;
  startDateTime: string;
  type: string;
  exhibits: Exhibit[];
}

interface ExhibitForm {
  id: number;
}

export interface ItemForm {
  endDateTime: string;
  id: number;
  name: string;
  showroomForm: number;
  exhibitsForm: ExhibitForm[];
  startDateTime: string;
  type: string;
}
