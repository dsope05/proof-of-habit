import { queryUserProofs } from "../../airtable/airtable";

export default async function handler(req, res) {
  const { handle } = req.body;
  let newHandle = handle;
  if (handle[0] !== '@') {
    newHandle = '@' + newHandle;
  }
  queryUserProofs({ res, handle: newHandle });
}