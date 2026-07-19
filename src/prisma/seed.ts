import prisma from "./core";

async function main() {
  // Create a new document
  const newDocuments = [
    {
      title: "Sample Document",
      body: "graph TD\n  A[Start] --> B{Is it working?}\n  B -- Yes --> C[Great!]\n  B -- No --> D[Check the code]\n  D --> B",
    },
    {
      title: "Another Document",
      body: "mindmap\n  root((Mindmap))\n    Origins\n      Long history\n      ::icon(fa fa-book)\n      Popularisation\n        British popular psychology author Tony Buzan\n    Research\n      On effectivness\n      On memorisation\n    Tools\n      Pen and paper\n      ::icon(fa fa-pencil)\n      Digital tools\n        ::icon(fa fa-desktop)\n        Mind map software",
    },
  ];

  for (const doc of newDocuments) {
    await prisma.document.create({ data: doc });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
