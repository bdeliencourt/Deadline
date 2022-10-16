import { createContext } from "react";
import {UserTokenContextProps} from "../interfaces/interfaces";

const UserContext = createContext<UserTokenContextProps>({});

export default UserContext;