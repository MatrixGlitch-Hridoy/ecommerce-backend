// Create Access token and saving in cookie
const sendAccessToken = (user, statusCode, res) => {
  const accessToken = user.getAccessToken();
  //   options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("accessToken", accessToken, options).json({
    success: true,
    user,
    accessToken,
  });
};

module.exports = sendAccessToken;
