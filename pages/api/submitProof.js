import { submitProofAirtable } from "../../airtable/airtable";

export default async function handler(req, res) {
  const { dataUrl, email, twitter, rep } = req.body;
  console.log('req body', req.body)
  submitProofAirtable({
    res, dataUrl, email, twitter, rep,
  });
}