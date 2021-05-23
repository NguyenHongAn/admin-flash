module.exports = {
  env: { SERVER_URL: "http://localhost:8001/" },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
    ];
  },
};
