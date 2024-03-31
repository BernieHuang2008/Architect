import { useState, useEffect } from "react"

function InfBoard() {
    var [viewPoint, setViewPoint] = useState([0, 0]);   // [x, y]
    var [viewScale, setViewScale] = useState(1);
    var [canvasSize, setCanvasSize] = useState([0, 0, 0, 0]);    // [x, y, width, height]

    // when scrollbar scrolls
    function onSbScroll() {
        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');

        var scrollX = sbX.scrollLeft - window.innerWidth;
        var scrollY = sbY.scrollTop - window.innerHeight;

        setViewPoint([scrollX, scrollY]);
    }

    // when mouse wheel scrolls
    function updateSb(e) {
        var sbX = document.querySelector('.vscrollbar-x');
        var sbY = document.querySelector('.vscrollbar-y');

        sbX.scrollBy(e.deltaX, 0);
        sbY.scrollBy(0, e.deltaY);

        setViewPoint([viewPoint[0] + e.deltaX, viewPoint[1] + e.deltaY]);

        // prevent default
        return false;
    }

    // when innerHTML changes
    useEffect(() => (new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            // add node
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    var nx1 = node.offsetLeft;
                    var ny1 = node.getBoundingClientRect().y;
                    var nx2 = nx1 + node.getBoundingClientRect().x;
                    var ny2 = ny1 + node.getBoundingClientRect().y;
                    console.log(nx1, ny1, nx2, ny2)
                    // update canvas size
                    setCanvasSize([
                        Math.min(canvasSize[0], nx1),
                        Math.min(canvasSize[1], ny1),
                        Math.max(canvasSize[2], nx2),
                        Math.max(canvasSize[3], ny2)
                    ]);
                })
            }
            // remove node
            // for performance reasons, we will update it only when saving into the disk
        })
    })).observe(document.querySelector('#anchor'), { childList: true }), []);

    return (
        <>
            <div id="InfBoardViewBox" onWheel={updateSb}>
                <div id="anchor" style={{
                    width: 0,
                    height: 0,
                    // content position
                    position: 'relative',
                    left: -viewPoint[0],
                    top: -viewPoint[1],
                    scale: viewScale,
                }}></div>
            </div>
            <div className="footbar">
                <div className="vscrollbar-x" onScroll={onSbScroll}><div style={{ width: (canvasSize[2] + window.innerWidth * 2) / viewScale }}></div></div>
            </div>
            <div className="rightbar">
                <div className="vscrollbar-y" onScroll={onSbScroll}><div style={{ height: (canvasSize[3] + window.innerHeight * 2) / viewScale }}></div></div>
            </div>
        </>
    )
}

function PageGraph() {
    return (
        <>
            <div className="page page-graph" id="page-graph">
                <InfBoard />
            </div>
        </>
    )
}

export default PageGraph;