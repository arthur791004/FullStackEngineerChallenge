const defaultDisplayName = 'Component';

const getDisplayName = (WrapperName, WrappedComponent) => {
  const { displayName, name } = WrappedComponent;
  const origName = displayName || name || defaultDisplayName;

  return `${WrapperName}(${origName})`;
};

export default getDisplayName;
