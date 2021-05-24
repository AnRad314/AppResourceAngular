import { Resource } from "./resource";

export interface EditResource {
  data: Resource,
  allowEdit: boolean,
  startTimeEdit: number,
  maxTimeEditSec: number
}
