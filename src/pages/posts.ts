export async function GET() {
  return new Response(JSON.stringify({ id: 1, title: "My First Post" }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
