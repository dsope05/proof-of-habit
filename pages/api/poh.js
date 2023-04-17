import { createPoH } from "../../airtable/airtable";

export default async function queryFreeTrialRecordHandle(req, res) {
  console.log('createPoh', createPoH)
  const { phone, handle, wish } = JSON.parse(req.body)
  console.log('phone', phone)
  console.log('wish', wish)
  console.log('handle', handle)
  createPoH({
    wish,
    handle,
    phone,
    res,
  });
}