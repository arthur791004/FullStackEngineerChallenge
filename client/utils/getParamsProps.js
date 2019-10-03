/**
 * Get key from props or props.match.params
 * @param {object} props
 * @param {string} key
 */
const getParamsProps = (props, key) => {
  const { [key]: value, match } = props;
  if (value != null) {
    return value;
  } else if (match && match.params) {
    return match.params[key];
  }

  return null;
};

export default getParamsProps;
