import { Schema, model } from 'mongoose';

const FocusTimeSchema = new Schema(
  {
    timeFrom: {
      type: Date,
      required: true,
    },
    timeTo: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const focusTimeModel = model('FocusTime', FocusTimeSchema);
