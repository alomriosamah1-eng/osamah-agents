const { contextBridge } = require("electron")

contextBridge.exposeInMainWorld("osamahDesktop", {
  platform: process.platform,
  version: "0.1.0",
})
