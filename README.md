# pixie-swarm
Pixie Swarm
Below is a recommended directory structure for your GitHub repository that accommodates the **Pixie Swarm**, including where the `memory.js`, `feedback.js`, and other components should be placed, alongside the workflows and environment setup:

---

### **Directory Structure**
```plaintext
/
├── .github/
│   └── workflows/
│       └── deploy-pixie-swarm.yml      # GitHub Actions workflow for automated deployment
├── pixies/
│   ├── controller/
│   │   ├── wrangler.toml              # Wrangler configuration for Controller Pixie
│   │   └── controller.js              # Logic for delegating tasks
│   ├── memory/
│   │   ├── wrangler.toml              # Wrangler configuration for Memory Pixie
│   │   └── memory.js                  # Logic for memory persistence
│   ├── execution/
│   │   ├── wrangler.toml              # Wrangler configuration for Execution Pixie
│   │   └── execution.js               # Logic for executing workflows
│   ├── feedback/
│   │   ├── wrangler.toml              # Wrangler configuration for Feedback Pixie
│   │   └── feedback.js                # Logic for providing feedback and refinement
│   └── visualization/
│       ├── wrangler.toml              # Wrangler configuration for Visualization Pixie
│       └── visualization.js           # Logic for rendering dashboards
├── shared/
│   ├── github-api.js                  # Utility module for GitHub API interactions
│   ├── webcontainer-api.js            # Utility module for WebContainer API
│   └── logger.js                      # Utility module for logging across Pixies
├── .env                               # Environment variables for local testing (ignored by Git)
├── package.json                       # Project dependencies
├── package-lock.json                  # Lockfile for npm
└── README.md                          # Documentation for setting up and using the Pixie Swarm
```

---

### **Details of Each Component**

#### **1. Workflow File**
Located in `.github/workflows/deploy-pixie-swarm.yml`, this file contains the GitHub Actions pipeline for automating deployment.

#### **2. Pixies**
Each Pixie resides in its own directory under `pixies/`. 

- **Each Pixie Directory**:
  - `wrangler.toml`: Specifies Cloudflare Worker settings.
  - `*.js`: Contains the logic for the Pixie (e.g., `memory.js` for the Memory Pixie).

#### **3. Shared Utilities**
Shared modules like `github-api.js` and `webcontainer-api.js` are placed in the `shared/` directory to be reused across multiple Pixies.

#### **4. Environment File**
An `.env` file is used for local testing and includes:
```plaintext
CF_API_TOKEN=your-cloudflare-api-token
CF_ACCOUNT_ID=your-cloudflare-account-id
GITHUB_TOKEN=your-github-api-token
```
**Note:** This file should be added to `.gitignore` to avoid exposing sensitive credentials.

---

### **Example Files**

#### **1. Wrangler Configuration (`wrangler.toml`)**
Each Pixie has its own `wrangler.toml` file:
```toml
name = "memory"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"
route = "memory.pixie.example.com/*"
```

#### **2. `controller.js`**
Example logic for delegating tasks in the Controller Pixie:
```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const task = url.pathname.split("/")[1];

  const endpoints = {
    memory: "https://memory.pixie.example.com",
    execute: "https://execution.pixie.example.com",
    feedback: "https://feedback.pixie.example.com",
    visualize: "https://visualization.pixie.example.com",
  };

  if (endpoints[task]) {
    return fetch(endpoints[task], { method: "POST", body: await request.text() });
  }

  return new Response("Unknown task", { status: 400 });
}
```

#### **3. `memory.js`**
Logic for memory persistence using GitHub API:
```javascript
import { GitHubAPI } from '../../shared/github-api';

addEventListener("fetch", (event) => {
  event.respondWith(handleMemory(event.request));
});

async function handleMemory(request) {
  const memoryData = await request.json();
  const response = await GitHubAPI.saveMemory(memoryData);

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" },
  });
}
```

#### **4. `shared/github-api.js`**
Reusable module for GitHub API interactions:
```javascript
export const GitHubAPI = {
  async saveMemory(memoryData) {
    const response = await fetch(`https://api.github.com/repos/your-repo-name/memory.json`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update memory",
        content: btoa(JSON.stringify(memoryData)),
      }),
    });

    return response.json();
  },
};
```

---

### **Environment Configuration**

#### **Environment Variables**
1. For **local testing**, use an `.env` file:
   ```plaintext
   CF_API_TOKEN=your-cloudflare-api-token
   CF_ACCOUNT_ID=your-cloudflare-account-id
   GITHUB_TOKEN=your-github-api-token
   ```

2. For **GitHub Actions**, add secrets:
   - `CF_API_TOKEN`
   - `CF_ACCOUNT_ID`
   - `GITHUB_TOKEN`

---

### **Deploy Workflow**
Example GitHub Actions workflow to automate deployment (`.github/workflows/deploy-pixie-swarm.yml`):
```yaml
name: Deploy Pixie Swarm

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Install Wrangler
        run: npm install -g wrangler

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16

      - name: Deploy Pixies
        run: |
          wrangler publish --config pixies/controller/wrangler.toml
          wrangler publish --config pixies/memory/wrangler.toml
          wrangler publish --config pixies/execution/wrangler.toml
          wrangler publish --config pixies/feedback/wrangler.toml
          wrangler publish --config pixies/visualization/wrangler.toml
        env:
          CF_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
          CF_ACCOUNT_ID: ${{ secrets.CF_ACCOUNT_ID }}
```

---

### **Workflow Benefits**
- Modular design ensures easy updates to individual Pixies.
- Shared utilities minimize code duplication.
- GitHub Actions automate deployments, reducing manual effort.

This structure provides a clean and maintainable way to manage your Pixie Swarm for Bolt Marduk. Let me know if you'd like additional help with specific configurations!
