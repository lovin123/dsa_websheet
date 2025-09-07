import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TopicBox from "./TopicBox";

export default function ChapterAccordion({
  chapter,
  progress,
  handleProgress,
}) {
  return (
    <Accordion
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: 3,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
        animation: "fadeInUp 0.7s",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ background: "#e3f2fd", borderRadius: 3, minHeight: 64 }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary.main"
          sx={{ letterSpacing: 1 }}
        >
          {chapter.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          background: "#f5faff",
          borderRadius: 3,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {chapter.topics.map((topic) => (
          <TopicBox
            key={topic._id}
            topic={topic}
            progress={progress}
            handleProgress={handleProgress}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
