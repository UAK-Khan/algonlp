import {UserSessionType} from "../../src/interfaces/modulesTypes";

declare module "express-session" {
    export interface SessionData {
        user: UserSessionType;
    }
}
