import { IconButton } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SchemaIcon from '@mui/icons-material/Schema';

function Sidebar({ page, setPage }) {
    return (
        <div className="sidebar">
            <IconButton
                color={page === "graph" ? "primary" : "none"}
                aria-label="Grpah Editor"
                onClick={() => setPage("graph")}
            >
                <SchemaIcon fontSize="large" />
            </IconButton>
            <IconButton
                color={page === "docs" ? "primary" : "none"}
                aria-label="Docs Editor"
                onClick={() => setPage("docs")}
            >
                <ArticleIcon fontSize="large" />
            </IconButton>
            <IconButton
                color={page === "analytics" ? "primary" : "none"}
                aria-label="Analytics"
                onClick={() => setPage("analytics")}
            >
                <AnalyticsIcon fontSize="large" />
            </IconButton>
        </div>
    );
}

export default Sidebar;