import { Request, Response } from 'express'
import crypto from 'crypto'
import graphql from 'graphql'

async function insertEntry(req: Request, res: Response) {  
    const url = Buffer.from(JSON.stringify(req.body));
    const hash = crypto.createHash('sha1').update(url).digest('hex');

    // graphql stuff here maybe?

    const response = await fetch("https://skgjjokqnhwykfrwrlcn.hasura.eu-central-1.nhost.run/v1/graphql", {
      method: 'POST',
      body: JSON.stringify({
        mutation insertEntries($hash: String!, $url: String!) {
          insert_url_shortener(objects: {hash: $hash, url: $url}) {
            returning {
              hash
            }
          }
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    res.status(200).send(`jstr.dev/${hash}`);
}

insertEntry();
