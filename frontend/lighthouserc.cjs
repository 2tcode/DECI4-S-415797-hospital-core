module.exports = {
  ci: {
        collect: {
        startServerCommand: "npm run preview -- --host",
        startServerReadyPattern: "ready",
        url: ["http://localhost:4173/"],
        numberOfRuns: 1
        },

    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:best-practices": ["error", { minScore: 0.8 }]
      }
    },

    upload: {
      target: "temporary-public-storage"
    },
    settings: {
  chromeFlags: ["--no-sandbox", "--disable-dev-shm-usage"]
   }
  }
};