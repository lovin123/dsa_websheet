require("dotenv").config();
const mongoose = require("mongoose");
const Chapter = require("./models/Chapter");
const Topic = require("./models/Topic");
const Problem = require("./models/Problem");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear existing data
  await Chapter.deleteMany({});
  await Topic.deleteMany({});
  await Problem.deleteMany({});

  // Full DSA Sheet Data: 15 chapters, 20-40 real problems each
  const chaptersData = [
    require("./seed_data/arrays"),
    require("./seed_data/strings"),
    require("./seed_data/linkedlist"),
    require("./seed_data/stack"),
    require("./seed_data/queue"),
    require("./seed_data/tree"),
    require("./seed_data/graph"),
    require("./seed_data/recursion"),
    require("./seed_data/dynamic_programming"),
    require("./seed_data/greedy"),
    require("./seed_data/backtracking"),
    require("./seed_data/bit_manipulation"),
    require("./seed_data/math"),
    // Add more chapters below as you create their files:
    // require("./seed_data/backtracking"),
    // require("./seed_data/bit_manipulation"),
    // require("./seed_data/math"),
    // require("./seed_data/searching"),
    // require("./seed_data/sorting"),
    // require("./seed_data/heap"),
    // require("./seed_data/trie"),
    // require("./seed_data/segment_tree"),
    // require("./seed_data/disjoint_set"),
  ];

  for (const chapterData of chaptersData) {
    const chapter = new Chapter({ name: chapterData.name });
    await chapter.save();
    for (const topicData of chapterData.topics) {
      const topic = new Topic({ name: topicData.name, chapter: chapter._id });
      await topic.save();
      await Chapter.findByIdAndUpdate(chapter._id, {
        $push: { topics: topic._id },
      });
      for (const problemData of topicData.problems) {
        const problem = new Problem({
          ...problemData,
          name: problemData.name || problemData.title,
          topic: topic._id,
        });
        await problem.save();
        await Topic.findByIdAndUpdate(topic._id, {
          $push: { problems: problem._id },
        });
      }
    }
  }

  console.log("Database seeded successfully!");
  mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  mongoose.disconnect();
});
