import { model, Schema } from 'mongoose';

const FocusTimeSchema = new Schema(
	{
		timeFrom: {
			type: Date,
		},
		timeTo: {
			type: Date,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

export const focusTimeModel = model('FocusTime', FocusTimeSchema);
