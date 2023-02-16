export default handlePull;

async function handlePull(req, res) {
  res.json({
    // We will discuss these two fields in later steps.
    lastMutationID: 0,
    cookie: null,
    patch: [
      {op: 'clear'},
      {
        op: 'put',
        key: 'plant/qpdgkvpb9ao',
        value: {
          createdBy: 'cindy',
          species: 'gangetica',
        },
      },
      {
        op: 'put',
        key: 'plant/5ahljadc408',
        value: {
          createdBy: 'cindy',
          species: 'cristata',
        },
      },
    ],
  });
  res.end();
}