module.exports = {
  env: { SERVER_URL: "http://localhost:8000/admin" },
  async rewrites() {
    return [
      {
        source: "/about",
        destination: "/",
      },
    ];
  },
};
