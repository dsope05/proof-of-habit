import { submitProofAirtable } from "../../airtable/airtable";

export default async function handler(req, res) {
  const { dataUrl, email } = req.body;
  submitProofAirtable({
    res, dataUrl, email,
  });
}