import Task from "@/services/Task";

const state = {
  taskList: [],
};

const getters = {
  taskList: (state) => {
    return state.taskList;
  },
};

const mutations = {
  ADD_NEW_ROW: (state, payload) => {
    state.taskList.unshift(payload);
  },
  CANCEL_ADD_ROW: (state) => {
    state.taskList.shift();
  },
  SAVE_ROW: (state, payload) => {
    let i = 0;
    state.taskList.forEach((task, index) => {
      if (task.id === payload.id) {
        i = index;
      }
    });
    state.taskList[i] = payload;
  },
  DELETE_ROW: (state, payload) => {
    const index = state.taskList.indexOf(payload);
    state.taskList.splice(index, index + 1);
  },

  SYNC_TASKLIST: (state, payload) => {
    state.taskList = payload;
  },
};

const actions = {
  addNewRow: ({ commit }, payload) => {
    Task.addTask(payload)
      .then((data) => {
        commit("ADD_NEW_ROW", data.data);
      })
      .catch(() => {
        commit("ADD_NEW_ROW", payload);
      });
  },
  saveRow: ({ commit }, payload) => {
    Task.updateTask(payload)
      .then((data) => {
        commit("SAVE_ROW", data.data);
      })
      .catch(() => {
        commit("SAVE_ROW", payload);
      });
  },
  deleteRow: async ({ commit }, payload) => {
    Task.deleteTask(payload.id)
      .then(() => {
        commit("DELETE_ROW", payload);
      })
      .catch(() => {
        commit("DELETE_ROW", payload);
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
