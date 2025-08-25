// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany({
          orderBy: { createdAt: 'desc' }
        })
        res.status(200).json(products)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })
      }
      break

    case 'POST':
      try {
        const { name, description, price, category, stock, images } = req.body
        
        const product = await prisma.product.create({
          data: {
            name,
            description,
            price,
            category,
            stock,
            images
          }
        })
        res.status(201).json(product)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create product' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
