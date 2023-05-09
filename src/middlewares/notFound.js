async function notFound(request, response) {
  response.status(404);

  return response.send({status: "404"});
}

module.exports = { notFound };
