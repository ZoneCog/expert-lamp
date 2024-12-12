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
