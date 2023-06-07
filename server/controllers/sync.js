const { convertC2S, convertS2C } = require("../utils/utils");
const Task = require("../db/models").Task;
const Settings = require("../db/models").Setting;
exports.syncData = async (req, res, next) => {
  const { setting, task } = req.body
  const clientSetting = convertC2S(setting)
  const serverTaskList = await Task.findAll();
  const serverSetting = await  Settings.findAll();

  let settingData = []
  let taskList = []
  let settingSyncResult = []
  let taskListSyncResult = []
  if(!setting.serverSync) {
    settingData = [...clientSetting]
    await Settings.truncate({restartIdentity: true})
    settingSyncResult = await Settings.bulkCreate(settingData)
    taskList = Array.isArray(task)?[...task]:[]
    await Task.truncate({restartIdentity: true})
    taskListSyncResult = await Task.bulkCreate(taskList)
  } else {
    settingSyncResult = [...serverSetting]
    taskListSyncResult = [...taskList]
  }

  let temp = convertS2C(settingSyncResult);
  temp.serverSync = false
  if(taskListSyncResult.length === 0 )
    temp.selectedTask = null

  res.status(200).send({taskListSyncResult, settingSyncResult:  temp})
}

