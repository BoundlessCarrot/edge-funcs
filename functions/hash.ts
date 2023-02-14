import { Request, Response } from 'express'
import crypto from 'crypto'
import { Resolver, Mutation, Arg, Query, InputType, Field, ObjectType, ResolverInterface } from "type-graphql";

@ObjectType({description: "Shortened URL type"})
export class ShortUrl {
  @Field()
  url: string;

  @Field()
  hash: string;
}

@InputType()
export class UrlInput implements ShortUrl {
  @Field()
  url: string;

  @Field()
  hash: string;
}

@Resolver(of => ShortUrl)
export class ShortUrlResolver implements ResolverInterface<ShortUrl> {
  url = Buffer.from(JSON.stringify(req.body));
  hash = crypto.createHash('sha1').update(this.url).digest('hex');

  @Mutation(returns => ShortUrl)
  async addUrl(@Arg("input") urlinput: UrlInput): Promise<ShortUrl> {  
    const input = Object.assign(new ShortUrl(), {
      url: urlinput.url,
      hash: urlinput.hash
    });

    //return stuff here

    // res.status(200).send(`jstr.dev/${this.hash}`);
  }
}
