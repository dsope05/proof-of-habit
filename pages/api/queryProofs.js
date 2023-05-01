import { queryProofs } from "../../airtable/airtable";

export default async function handler(req, res) {
  queryProofs({ res });
}