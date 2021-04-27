import { takeLatest, put, delay, call } from "redux-saga/effects";

import { ROUTES, MESSAGES, ACTION_CONST } from "../../constants";
import { getListProjects, getProject } from "../services/project";
import { getInfoContract } from "../../utils/contractHelpers";

function* handleGetProjects() {
  try {


    const resProjects = yield call(getListProjects);
    // console.log("----handleGetUserInfo----", resProjects);
    if (resProjects.status === 200) {

      let listContractAddress = [];

      resProjects.data.forEach((item) => {
        if (typeof item["contract"] === "string") {
          listContractAddress.push(item["contract"]);
        }
      });

      if (listContractAddress.length > 0) {
        let arr = [];
        const resContracts = yield call(getInfoContract, listContractAddress);

        resProjects.data.forEach((element) => {
          const target = element;
          const source = resContracts[element.contract];
          arr.push(Object.assign(target, source));
        });

        // console.log(resProjects)
        yield put({
          type: ACTION_CONST.GET_PROJECTS_SUCCESS,
          data: {
            projects: arr,
            openingProjects: arr.filter((e) => e.state == "O"),
            waitingProjects: arr.filter((e) => e.state == "P"),
            closedProjects: arr.filter((e) => e.state == "C"),
          },
        });
      }

    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

function* handleGetSelectedProjects(data) {

  const contractAddress = data.data

  const resProjects = yield call(getProject, contractAddress);
  // debugger
  if (resProjects.status == 200) {
    const resContracts = yield call(getInfoContract, [contractAddress]);
    const object = Object.assign(resProjects.data, resContracts[contractAddress]);
    // console.log("get project selected ==>", object);
    yield put({
      type: ACTION_CONST.GET_PROJECT_SELECTED,
      data: object,
    });
  }



}


export function* watchSubmitGetProjects() {
  yield takeLatest(
    ACTION_CONST.SUBMIT_GET_PROJECTS,
    handleGetProjects
  );
}

export function* watchSubmitSelectedProjects() {
  yield takeLatest(
    ACTION_CONST.SUBMIT_PROJECT_SELECTED,
    handleGetSelectedProjects
  );
}