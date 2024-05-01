export async function POST(request: Request) {
  const res = await request.json();
  console.log({ data: res });
  return Response.json({ data: res });
}
