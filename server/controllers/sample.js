
centers.forEach((center) => {
  if (center.id !== parseInt(req.params.id, 10)) {
    return;
  }

