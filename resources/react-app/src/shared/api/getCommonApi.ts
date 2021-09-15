import { map } from "rxjs/operators";
import { get$ } from "../services/restApi/restApi";
import { CommonProps } from "../types/Common";
import {User} from "../../features/Users/types/User";

export const baseUrl = "/api/v1";
