import { Question } from "../../type";
import biology from "../../data/biology.json";
import chemistry from "../../data/chemistry.json";
import physics from "../../data/physics.json";

const getQuestions = ({
  subject,
  chapter,
  topic,
  part,
}: {
  subject: "biology" | "physics" | "chemistry";
  chapter: string;
  topic: string;
  part: string;
}) => {
  const data =
    subject === "biology"
      ? (biology as Question[])
      : subject === "chemistry"
      ? (chemistry as Question[])
      : (physics as Question[]);
  const onlyMcq = data.filter((qn) => qn.quiz_type === "mcq");

  const questions: Question[] = [];

  for (const qn of onlyMcq) {
    const slices = qn.topic_name.split(">>");

    if (
      slices[0].trim().toLowerCase() === decodeURIComponent(chapter) &&
      slices[1].trim().toLowerCase() === decodeURIComponent(topic) &&
      slices[2].trim().toLowerCase() === decodeURIComponent(part)
    ) {
      const bracketRegx = "/(([^)]+))/gm";
      const textsUnderBracket = qn.question.match(/\(.*?\)/gm);
      //console.log(textsUnderBracket);

      if (
        textsUnderBracket &&
        textsUnderBracket.length >= 1
      ) {
        qn.image = `${
          subject === "biology"
            ? "https://firebasestorage.googleapis.com/v0/b/memoneet-5498.appspot.com/o/biology_temporary%2F"
            : subject === "chemistry"
            ? "https://firebasestorage.googleapis.com/v0/b/memoneet-5498.appspot.com/o/chemistry_images%2F"
            : "https://firebasestorage.googleapis.com/v0/b/memoneet-5498.appspot.com/o/physics_images%2F"
        }${textsUnderBracket[textsUnderBracket?.length - 1]
          .replace("(", "")
          .replace(")", "")}.jpg?alt=media`;
      }

      questions.push(qn);
    }
  }
  return questions;
};

export default getQuestions;
