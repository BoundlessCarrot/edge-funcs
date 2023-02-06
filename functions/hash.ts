import { Request, Response } from 'express'
import crypto from 'crypto'
import graphql from 'graphql'

export default (req: Request, res: Response) => {
    const url = req.body
    const hash = crypto.createHash('sha1').update(url).digest('hex');

    res.status(200).send(`jstr.dev/${hash}`)
}


