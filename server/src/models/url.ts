import mongoose from 'mongoose';

interface Url {
  full: {
    type: string;
    required: boolean;
  };
  short: {
    type: string;
    required: boolean;
    unique: boolean;
  };
  date: {
    type: Date;
    required: boolean;
    default: Date;
  };
}

const urlSchema = new mongoose.Schema<Url>({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});
const UrlModel = mongoose.model('Url', urlSchema);

export default UrlModel;
