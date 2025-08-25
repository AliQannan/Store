import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const products = await prisma.product.findMany()
      return res.json(products)
    
    case 'POST':
      const product = await prisma.product.create({
        data: req.body
      })
      return res.json(product)
    
    default:
      res.status(405).end()
  }
}
