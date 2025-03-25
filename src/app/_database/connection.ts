import mongoose, { Schema } from "mongoose";
import { Service } from "./models/Service";
import User from "./models/User";
import Psychologist from "./models/Psychologist";

async function connect() {
  if (mongoose.connection.readyState !== 1) {
    console.log("No existe una conexión, intentando crear una...");
    try {
      await mongoose.connect(process.env.DB_URL!);
      console.log("Conexión exitosa");
    } catch (error) {
      console.log(error);
    }
  }
}

function myFunction(service: any) {
  return service.name;
}

function fullName(user: any) {
  return user.email;
}

async function fetchServices() {
  await connect();
  const oneService = await Service.find();
  const oneService2 = oneService.map(myFunction);
  return oneService2 + "";
}

async function fetchUsers() {
  await connect();
  const oneUser = await User.find();
  const oneUser2 = oneUser.map(fullName);
  return oneUser2 + "";
}

async function fetchPsychologists() {
  await connect();
  const psychologists = await Psychologist.find().lean();
  psychologists.forEach((psychologist) => {
    psychologist._id = psychologist._id.toString();
    psychologist.user = psychologist.user.toString();
  });
  return psychologists;
}

function serialize(object: mongoose.FlattenMaps<any> | null) {
  return JSON.parse(JSON.stringify(object));
}

export { connect, fetchServices, fetchUsers, fetchPsychologists, serialize };
