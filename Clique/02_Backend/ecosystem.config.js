module.exports = {
  apps: [
    {
      name: "cliqueapi",
      script: "./index.js",         // entry file
      instances: "max",             // use all CPU cores
      exec_mode: "cluster",         // cluster mode for scaling
      autorestart: true,
      watch: false,                 // set true for dev only
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "development",
        PORT: 48568,
        MONGO_URI:"mongodb+srv://clique_dev:we_clique@clique-db.azegpze.mongodb.net/clique",
        DB:"clique",
        DB_USER:"clique-dev",
        DB_PASS:"we_clique",
        CLOUD_NAME:"ddhkkdyqx",
        API_KEY:"879162625394476",
        API_SECRET:"ZerLXM9PMYgFSUGQTDZA_r5GDn8"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 48568,
        MONGO_URI:"mongodb+srv://clique_dev:we_clique@clique-db.azegpze.mongodb.net/clique",
        DB:"clique",
        DB_USER:"clique-dev",
        DB_PASS:"we_clique",
        CLOUD_NAME:"ddhkkdyqx",
        API_KEY:"879162625394476",
        API_SECRET:"ZerLXM9PMYgFSUGQTDZA_r5GDn8"
      }
    },
    {
      name: "clique-frontend",
      script: "serve",
      args: ["-s", "dist"],
      cwd: "/home/ubuntu/Clique/01_Frontend/clique",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
