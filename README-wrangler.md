Below are the `wrangler.toml` configurations for the **controller**, **memory**, **execution**, **feedback**, and **visualization** Pixies. Each is tailored to its specific role and includes its unique route, environment variables, and configuration.

---

### **1. Controller Pixie (`pixies/controller/wrangler.toml`)**
This Worker orchestrates tasks and delegates them to other Pixies.

```toml
name = "controller"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"

# Route configuration
route = "controller.pixie.example.com/*"

[vars]
# Endpoints for other Pixies
PIXIE_ENDPOINT_MEMORY = "https://memory.pixie.example.com"
PIXIE_ENDPOINT_EXECUTION = "https://execution.pixie.example.com"
PIXIE_ENDPOINT_FEEDBACK = "https://feedback.pixie.example.com"
PIXIE_ENDPOINT_VISUALIZATION = "https://visualization.pixie.example.com"
```

---

### **2. Memory Pixie (`pixies/memory/wrangler.toml`)**
This Worker manages persistent memory using GitHub or Cloudflare KV.

```toml
name = "memory"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"

# Route configuration
route = "memory.pixie.example.com/*"

[vars]
# Add GitHub or Cloudflare KV specific settings
GITHUB_API_TOKEN = "${GITHUB_API_TOKEN}"
MEMORY_REPO_NAME = "your-repo-name"
MEMORY_FILE_PATH = "memory/memory.json"
```

---

### **3. Execution Pixie (`pixies/execution/wrangler.toml`)**
This Worker executes workflows or tasks as directed by the Controller.

```toml
name = "execution"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"

# Route configuration
route = "execution.pixie.example.com/*"

[vars]
# Environment variables for WebContainer or execution context
WEB_CONTAINER_API_KEY = "${WEB_CONTAINER_API_KEY}"
EXECUTION_TIMEOUT = "30s" # Adjust based on task needs
```

---

### **4. Feedback Pixie (`pixies/feedback/wrangler.toml`)**
This Worker analyzes execution logs and generates feedback for refinement.

```toml
name = "feedback"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"

# Route configuration
route = "feedback.pixie.example.com/*"

[vars]
# Add any APIs or configurations for log analysis
LOG_ANALYSIS_API_KEY = "${LOG_ANALYSIS_API_KEY}"
FEEDBACK_MODEL = "marduk-feedback-v1"
```

---

### **5. Visualization Pixie (`pixies/visualization/wrangler.toml`)**
This Worker generates dashboards to visualize workflows, feedback, and execution logs.

```toml
name = "visualization"
type = "javascript"
account_id = "${CF_ACCOUNT_ID}"
compatibility_date = "2024-12-11"

# Route configuration
route = "visualization.pixie.example.com/*"

[vars]
# Dashboard-specific variables
DASHBOARD_API_KEY = "${DASHBOARD_API_KEY}"
VISUALIZATION_THEME = "dark"
```

---

### **Environment Variables**
The following environment variables should be defined:
1. Locally in `.env` for development:
   ```plaintext
   CF_ACCOUNT_ID=your-cloudflare-account-id
   CF_API_TOKEN=your-cloudflare-api-token
   GITHUB_API_TOKEN=your-github-api-token
   WEB_CONTAINER_API_KEY=your-webcontainer-api-key
   LOG_ANALYSIS_API_KEY=your-log-analysis-api-key
   DASHBOARD_API_KEY=your-dashboard-api-key
   ```

2. In GitHub Actions secrets for automated deployment:
   - `CF_ACCOUNT_ID`
   - `CF_API_TOKEN`
   - `GITHUB_API_TOKEN`
   - `WEB_CONTAINER_API_KEY`
   - `LOG_ANALYSIS_API_KEY`
   - `DASHBOARD_API_KEY`

---

### **Key Notes**
- **Routing**: Each `wrangler.toml` assigns a unique subdomain for each Pixie.
- **Variables**: Customize `[vars]` based on your use case to provide necessary settings or secrets.
- **Compatibility Date**: Ensure the compatibility date matches your Worker’s JavaScript API requirements.

---

Let me know if you need additional examples or a more specific setup for any of these Pixies!
