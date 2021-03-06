// import io from "socket.io-client";
// export const socket = io();

export const user_statuses = [
  {
    _id: 1,
    name: "Administrator",
  },
  {
    _id: 2,
    name: "Menedżer",
  },
  // {
  //   _id: 3,
  //   name: "Pracownik",
  // },
  {
    _id: 4,
    name: "Klient",
  },
];

export const priorities = [
  {
    _id: 0,
    name: "Pali się",
    active: true,
  },
  {
    _id: 1,
    name: "Priorytetowo",
    active: true,
  },
  {
    _id: 2,
    name: "Normalny",
    active: true,
  },
  {
    _id: 3,
    name: "W wolnym czasie",
    active: true,
  },
  {
    _id: 4,
    name: "Można wykonać ale nie trzeba",
    active: true,
  },
];

export const statuses = [
  {
    _id: 0,
    name: "Do wykonania",
    active: true,
  },
  // {
  //   _id: 1,
  //   name: "W trakcie",
  //   active: true,
  // },
  // {
  //   _id: 2,
  //   name: "Do akceptacji",
  //   active: true,
  // },
  {
    _id: 3,
    name: "Wykonane",
    active: false,
  },
  // {
  //   _id: 4,
  //   name: "Zawieszone",
  //   active: false,
  // },
];

export const status_clasess = [
  {
    status_name: "Do wykonania",
    classes_name: "to-complete",
  },
  {
    status_name: "W trakcie",
    classes_name: "in-progress",
  },
  {
    status_name: "Do akceptacji",
    classes_name: "to-accept",
  },
  {
    status_name: "Wykonane",
    classes_name: "complete",
  },
  {
    status_name: "Zawieszone",
    classes_name: "suspended",
  },
];

export const years = [
  {
    _id: 0,
    value: "2020",
    name: "2020",
  },
  {
    _id: 1,
    value: "2021",
    name: "2021",
  },
];
export const months = [
  {
    _id: 0,
    value: "01",
    name: "Styczeń",
  },
  {
    _id: 1,
    value: "02",
    name: "Luty",
  },
  {
    _id: 2,
    value: "03",
    name: "Marzec",
  },
  {
    _id: 3,
    value: "04",
    name: "Kwiecień",
  },
  {
    _id: 4,
    value: "05",
    name: "Maj",
  },
  {
    _id: 5,
    value: "06",
    name: "Czerwiec",
  },
  {
    _id: 6,
    value: "07",
    name: "Lipiec",
  },
  {
    _id: 7,
    value: "08",
    name: "Sierpień",
  },
  {
    _id: 8,
    value: "09",
    name: "Wrzesień",
  },
  {
    _id: 9,
    value: "10",
    name: "Październik",
  },
  {
    _id: 10,
    value: "11",
    name: "Listopad",
  },
  {
    _id: 11,
    value: "12",
    name: "Grudzień",
  },
];
export const calendarTypes = [
  {
    _id: 1,
    name: "Notatka",
  },
  {
    _id: 2,
    name: "Zadanie",
  },
  {
    _id: 3,
    name: "Projekt",
  },
];
export const projectStatuses = [
  {
    _id: 1,
    name: "w realizacji"
  },
  {
    _id: 2,
    name: "archiwalny"
  }
];
export const projectTypes = [
  {
    _id: 1,
    name: "Sprawa cywilna",
  },
  {
    _id: 2,
    name: "Sprawa karna",
  },
  {
    _id: 3,
    name: "Sprawa administracyjna",
  },
  {
    _id: 4,
    name: "Sprawa prawa pracy",
  },
  {
    _id: 5,
    name: "Sprawa dyscyplinarna",
  },
  {
    _id: 6,
    name: "Sprawa inna",
  },
  {
    _id: 7,
    name: "Oddłużanie",
  },
];
