import { stat } from "fs";

export const INITIAL_STATE = {
  id: "",
  name: "...",
  surname: "...",
  picUrl: "",
  email: "",
  companyId: "",
  bio: "",
  dob: "",
  role:""
};
// target, data
export const accountFormReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "SET":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        surname: action.payload.surname,
        picUrl: action.payload.picUrl,
        email: action.payload.email,
        companyId: action.payload.companyId,
        dob: action.payload.dob,
        bio: action.payload.bio,
        createDate: action.payload.createDate,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
