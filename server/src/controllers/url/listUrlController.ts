import * as express from 'express';
import Url from '../../models/url';

export default async function listUrlController(
  _: express.Request,
  res: express.Response
): Promise<void> {
  try {
    const url = process.env.SHORTEN_URL || 'https://pbid.io';
    const urls = await Url.find().sort({ date: 'desc' });
    
    const data = urls.map(({ full, short }) => ({
      full,
      short: `${url}/${short}`,
    }));
  
    res.json({
      success: true,
      error: null,
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      error,
      data: null,
    });
  }
}
