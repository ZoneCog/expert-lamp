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
