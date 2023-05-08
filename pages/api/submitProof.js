import { submitProofAirtable } from "../../airtable/airtable";

export default async function handler(req, res) {
  const { dataUrl, email, twitter, rep } = req.body;
  let handle = twitter;
  if (twitter[0] !== '@') {
    handle = '@' + handle;
  }
  submitProofAirtable({
    res, dataUrl, email, twitter: handle, rep,
  });
}