import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(process.env.NODE_ENV === 'development') return res.json({message: 'revalidado'});
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) return res.status(401).json({ message: "invalid token" });
  if(!req.query.path) return res.status(401).json({message: 'Path is required'});

  
  const path = req.query.path as string;

  await res.revalidate(decodeURIComponent(path));

  return res.json({ revalidated: true });
}
