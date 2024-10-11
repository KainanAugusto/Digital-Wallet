

function signUp(req, res) {
  const body = req.body;

  const resService = authServices.signUp(body);

  res.json(resService);
}

export default { signUp };