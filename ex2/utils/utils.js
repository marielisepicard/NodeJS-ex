exports.insertPosition = (position) => {
  return {
    name: position.name,
    url: position.jobUrl,
    location: position.location,
    contract: position.contract,
  };
};
