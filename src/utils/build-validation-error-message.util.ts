import { ZodIssue } from 'zod';

export function builValidationErrorMessage(issues: ZodIssue[]): string[] {
	const errors = issues.map(
		(item) => `${item.path.join('.')}: ${item.message}`,
	);

	return errors;
}
