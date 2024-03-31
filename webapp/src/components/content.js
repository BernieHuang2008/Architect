import PageGraph from "../pages/graph/main";

function Content({ page }) {
    return (
        <div className="content">
            {page === 'graph' && <PageGraph />}
            {page === 'draw' && <div>Draw</div>}
            {page === 'docs' && <div>Docs</div>}
            {page === 'analytics' && <div>Analytics</div>}
        </div>
    );
}

export default Content;