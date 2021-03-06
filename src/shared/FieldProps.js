import PropTypes from "prop-types";

export const FIELD_PROPS =
{
	id: PropTypes.string.isRequired,
	value: PropTypes.string,
	updateParent: PropTypes.func,
	validate: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.array
	]),
	error: PropTypes.string
};
