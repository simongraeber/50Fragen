import { Eureka } from "eureka-js-client";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4002;


const host = process.env.HOST_IP || "localhost"
const eurekaClient = new Eureka({
  instance: {
    app: "file-manager",
    instanceId: `file-manager:${PORT}`,
    hostName: host,
    ipAddr: host,  // adjust if needed to a real IP address
    statusPageUrl: `http://${host}:${PORT}`,
    port: {
      $: PORT,
      "@enabled": true,
    },
    vipAddress: "file-manager",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: process.env.EUREKA_HOST || "localhost",
    port: process.env.EUREKA_PORT ? parseInt(process.env.EUREKA_PORT, 10) : 8761,
    servicePath: "/eureka/apps/",
  },
})

export const startEurekaClient = () => {
  eurekaClient.start((error: Error) => {
    if (error) {
      console.error("Failed to register with Eureka:", error)
    } else {
      console.log("Successfully registered with Eureka.")
    }
  })
}
