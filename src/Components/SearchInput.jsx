const SearchInput = ({ value, handle }) => {
  return (
    <input
      type="text"
      placeholder="keyword..."
      value={value}
      onChange={handle}
    />
  );
};

export default SearchInput;
