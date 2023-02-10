import { Request, Response } from 'express'
import crypto from 'crypto'
import graphql from 'graphql'

export default (req: Request, res: Response) => {
    const url = Buffer.from(JSON.stringify(req.body));
    const hash = crypto.createHash('sha1').update(url).digest('hex');

    // graphql stuff here maybe?

    res.status(200).send(`jstr.dev/${hash}`)
}


