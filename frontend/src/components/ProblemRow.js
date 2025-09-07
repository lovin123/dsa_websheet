import {
  TableRow,
  TableCell,
  Checkbox,
  Chip,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function ProblemRow({ problem, progress, handleProgress }) {
  return (
    <TableRow
      sx={{
        background: progress.has(problem._id) ? "#e8f5e9" : "#fff",
        transition: "background 0.2s",
        borderBottom: "1px solid #e0e0e0",
        "&:hover": {
          background: progress.has(problem._id) ? "#c8e6c9" : "#f5f5f5",
        },
      }}
    >
      <TableCell>
        <Checkbox
          checked={progress.has(problem._id)}
          onChange={(e) => handleProgress(problem._id, e.target.checked)}
          color="primary"
        />
      </TableCell>
      <TableCell>
        {progress.has(problem._id) ? (
          <Chip
            label="Completed"
            color="success"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        ) : (
          <Chip
            label="Pending"
            color="warning"
            size="small"
            sx={{ fontWeight: 700 }}
          />
        )}
      </TableCell>
      <TableCell sx={{ fontWeight: 500 }}>{problem.name}</TableCell>
      <TableCell>
        <Chip
          label={problem.level}
          color={
            problem.level === "Easy"
              ? "success"
              : problem.level === "Medium"
              ? "warning"
              : "error"
          }
          size="small"
          sx={{ ml: 1, fontWeight: 700 }}
        />
      </TableCell>
      <TableCell>
        {problem.leetcodeLink && (
          <IconButton
            component={MuiLink}
            href={problem.leetcodeLink}
            target="_blank"
            rel="noopener"
          >
            <CodeIcon color="primary" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        {problem.articleLink && (
          <IconButton
            component={MuiLink}
            href={problem.articleLink}
            target="_blank"
            rel="noopener"
          >
            <ArticleIcon color="action" />
          </IconButton>
        )}
      </TableCell>
      <TableCell>
        {problem.youtubeLink && (
          <IconButton
            component={MuiLink}
            href={problem.youtubeLink}
            target="_blank"
            rel="noopener"
          >
            <YouTubeIcon color="error" />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
}
