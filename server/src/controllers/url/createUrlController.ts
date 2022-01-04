import * as express from 'express';
import Url from '../../models/url';
import uniqueId from '../../helpers/uniqueId';

// Allow to retry 5 times in case `short` value is not unique
let retry = 5;

export const validateUrl = (url: string): boolean => {
    const regex = new RegExp(/^(http|https):\/\/[^ "]+$/);
    return regex.test(url);
};

export default async function createUrlController(
  req: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const { url } = req.body;
    const { SHORTEN_URL = 'https://pbid.io' } = process.env;
    const isValidUrl = validateUrl(url);

    if (!isValidUrl) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Invalid URL',
          status: 400,
        },
        data: null,
      });
      return;
    }
    const short = uniqueId();
    const data = await Url.create({ full: url, short });
    retry = 5;

    res.json({
      success: true,
      error: null,
      data: { full: data.full, short: `${SHORTEN_URL}/${data.short}` },
    });
  } catch (error) {
    // duplicate key error
    if (error.code === 11000 && retry) {
      retry -= 1;
      return createUrlController(req, res);
    }
    console.log(error);

    res.json({
      success: false,
      error,
      data: null,
    });
  }
}
