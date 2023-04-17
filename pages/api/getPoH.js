import { queryPoH } from "../../airtable/airtable";

export default async function queryFreeTrialRecordHandle(req, res) {
  console.log('queryPoh')
  queryPoH({
    res,
  });
}