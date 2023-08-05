import { createRegController, getRegController } from "./../controllers/regController";
import express from "express";


export default (router: express.Router) => {
    router.post("/register", createRegController);
    router.get("/register/:email", getRegController);
};